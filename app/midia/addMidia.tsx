import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from "react";
import Icon from '@expo/vector-icons/Feather'
import { CheckBox } from "react-native-elements";
import { api } from "../../assets/lib/api";
import * as SecureStore from 'expo-secure-store'
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile } from "../../firebase/storage";
import { useRouter } from "expo-router";


export default function addMidia() {

    const router = useRouter()

    const [tipo, setTipo] = useState('')
    const [preview,setPreview] = useState<string | null>(null)
    const [titulo,setTitulo] = useState('')
    const [autor,setAutor] = useState('')
    const [grupo,setGrupo] = useState('')
    const [historia,setHistoria] = useState('')
    const [periodo,setPeriodo] = useState('')
    const [editora,setEditora] = useState('')
    const [compositor,setCompositor] = useState('')
    const [videoUri, setVideoUri] = useState<string | null>(null)
    const [audioUri, setAudioUri] = useState(null)
    const [id,setId] = useState('')
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState(null);
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const { bottom,top } = useSafeAreaInsets()

    useEffect(()=>{
        SecureStore.getItemAsync('chave')
        .then(storedValue => {
                if (storedValue) {
                // Convertendo a string de volta para o formato original usando JSON.parse()
                const token = JSON.parse(storedValue);
                console.log('Valor recuperado:', token);
                setId(token.id)
                console.log(id)
                } else {
                console.log('Nenhum valor encontrado no SecureStore.');
                }
        })
    },[])

    const pickImage = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          setPreview(result.assets[0].uri)
        }
      } catch (error) {
        console.log('Error picking image:', error);
      }
    };

    const pickVideo = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality:1,
      });
      if (result.assets[0]) {
          setVideoUri(result.assets[0].uri);
      }
    };    

  const pickAudio = async () => {
    try {
      const { uri, name } = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
      setAudioUri({ uri, name });
      console.log(audioUri)
    } catch (error) {
      console.error('Erro ao escolher o áudio:', error);
    }
  };

    async function handleCreateMusic() {

      let coverUrl = ''
      if (!image) {
          return;
        }
    
        setUploading(true);
    
        try {
          const response = await fetch(image);
          const blob = await response.blob();
    
          coverUrl = await uploadFile("capa"+id+titulo, blob);
    
          console.log(coverUrl)
          setImage(null);
        } catch (error) {
          console.log('Error uploading image:', error);
        }
    
        setUploading(false);

        let aUrl = ''
        if (!audioUri) {
          return;
        }
      
        setUploading(true);
        console.log(audioUri)
        try {
          const response = await fetch(audioUri.uri);
          const blob = await response.blob();
      
          aUrl = await uploadFile("midia"+id+titulo, blob);
      
          console.log(aUrl)
          setAudioUri(null);
        } catch (error) {
          console.log('Error uploading áudio:', error);
        }
      
        setUploading(false);

          const data = {
            titulo: titulo,
            autor: autor,
            compositor: compositor,
            editora: editora,
            grupo: grupo,
            historia: historia,
            periodo: periodo,
            capa: coverUrl,
            tipo: tipo,
            path: aUrl,
            userId: id,
            // Passando o ID de outra tabela
        };
        await api.post('/midias',data)
        .then(response => {
          // Manipule a resposta de sucesso aqui
          console.log('Mídia criada:', response.data);
          setTipo('')
            setPreview(null)
            setTitulo('')
            setAutor('')
            setGrupo('')
            setHistoria('')
            setPeriodo('')
            setEditora('')
            setCompositor('')
            setVideoUri(null)
            setCheckbox2(false)
            setCheckbox1(false)
        })
        .catch(error => {
          // Manipule o erro aqui
          console.error('Erro na criação da mídia:', error);
        });    
        router.push('/home');
    }
      

    async function handleCreateVideo() {

        let coverUrl = ''
        if (!image) {
          return;
        }
      
        setUploading(true);
      
        try {
          const response = await fetch(image);
          const blob = await response.blob();
      
          coverUrl = await uploadFile("capa"+id+titulo, blob);
      
          console.log(coverUrl)
          setImage(null);
        } catch (error) {
          console.log('Error uploading image:', error);
        }
      
        setUploading(false);

        let vUrl = ''

        if (!videoUri) {
          return;
        }
      
        setUploading(true);
      
        try {
          const response = await fetch(videoUri);
          const blob = await response.blob();
      
          vUrl = await uploadFile("midia"+id+titulo, blob);
      
          console.log(vUrl)
          setVideoUri(null);
        } catch (error) {
          console.log('Error uploading video:', error);
        }
      
        setUploading(false);

        const data = {
            titulo: titulo,
            autor: autor,
            compositor: compositor,
            editora: editora,
            grupo: grupo,
            historia: historia,
            periodo: periodo,
            capa: coverUrl,
            tipo: tipo,
            path: vUrl,
            userId: id,
        };

        console.log(data)

        await api.post('/midias',data)
        .then(response => {
          // Manipule a resposta de sucesso aqui
          console.log('Mídia criada:', response.data);
          setTipo('')
            setPreview(null)
            setTitulo('')
            setAutor('')
            setGrupo('')
            setHistoria('')
            setPeriodo('')
            setEditora('')
            setCompositor('')
            setVideoUri(null)
            setCheckbox2(false)
            setCheckbox1(false)
        })
        .catch(error => {
          // Manipule o erro aqui
          console.error('Erro na criação da mídia:', error);
        });
        router.push('home');

    } 

    

    const handleCheckbox1 = () => {
        setCheckbox2(checkbox1);
        setCheckbox1(!checkbox1);
        setTipo('musica')
    };

    const handleCheckbox2 = () => {
        setCheckbox1(checkbox2);
        setCheckbox2(!checkbox2);
        setTipo('video')
    };


    return(
        
        <View className="flex-1 justify-center">  
        <KeyboardAvoidingView className="flex-1 w-full" behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={80}>              
            <ScrollView className="flex-1 px-8" contentContainerStyle={{paddingBottom: bottom, paddingTop:top}}>
                <TouchableOpacity onPress={!checkbox1 ? handleCreateVideo : handleCreateMusic} className="py-2 self-end">
                    <AntDesign className="" name="pluscircle" size={35} color={'#04d361'} />
                </TouchableOpacity>
                <View className="space-y-6">
                    <View className="flex-row items-center gap-2">
                        <View className='flex-row '>
                            <CheckBox
                                title='Música'
                                checked={checkbox1}
                                onPress={handleCheckbox1}
                            />
                            <CheckBox
                                title='Vídeo'
                                checked={checkbox2}
                                onPress={handleCheckbox2}
                            />
                        </View>
                        
                    </View>
                    {!checkbox1 ? (
                        
                            <View className="flex-row items-center">
                                <TouchableOpacity onPress={pickVideo} className="p-2 rounded-full border-gray-50 border-2">
                                <Text className="font-body text-sm text-gray-100">Adicionar vídeo</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (<View className="flex-row items-center">
                            <TouchableOpacity onPress={pickAudio} className="p-2 rounded-full border-gray-50 border-2">
                                <Text className="font-body text-sm text-gray-100">Adicionar musica</Text>
                            </TouchableOpacity>
                            </View>)}
                            <TouchableOpacity onPress={pickImage} className="rounded-lg justify-center h-60 border border-dashed border-gray-500 bg-black/20 items-center">
                            {preview ? (<Image source={{ uri: image}} className="h-full w-full object-cover"/>) : (<View className="flex-row gap-2 items-center">
                            <Icon name="image" color='#fff'/>
                            <Text className="font-body text-sm text-gray-200">Adicionar capa de vídeo ou de áudio</Text>
                            </View>)}
                            </TouchableOpacity>
                            <TextInput value={titulo} textAlignVertical="top"    onChangeText={setTitulo} className="p-0 font-body text-lg text-gray-50" 
                        placeholderTextColor="#9e9ea0" placeholder="Título"/>
                            <TextInput value={autor} textAlignVertical="top" onChangeText={setAutor} className="p-0 font-body text-lg text-gray-50" 
                        placeholderTextColor="#9e9ea0" placeholder="Autor"/>
                            <TextInput value={grupo} textAlignVertical="top" onChangeText={setGrupo} className="p-0 font-body text-lg text-gray-50" 
                        placeholderTextColor="#9e9ea0" placeholder="Grupo musical (se existir)"/>
                            <TextInput value={historia} textAlignVertical="top" onChangeText={setHistoria} className="p-0 font-body text-lg text-gray-50" 
                        placeholderTextColor="#9e9ea0" placeholder="História da mídia (se souber)"/>
                            <TextInput value={periodo} textAlignVertical="top" onChangeText={setPeriodo} className="p-0 font-body text-lg text-gray-50" 
                        placeholderTextColor="#9e9ea0" placeholder="Período do grupo (se souber)"/>
                            <TextInput value={editora} textAlignVertical="top" onChangeText={setEditora} className="p-0 font-body text-lg text-gray-50" 
                        placeholderTextColor="#9e9ea0" placeholder="Editora (se tiver)"/>
                            <TextInput value={compositor} textAlignVertical="top" onChangeText={setCompositor} className="p-0 font-body text-lg text-gray-50" 
                        placeholderTextColor="#9e9ea0" placeholder="Compositor(a)"/>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}
