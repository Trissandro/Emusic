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
import { setgroups } from "process";


export default function viewMidia() {

    const [titulo,setTitulo] = useState('')
    const [autor,setAutor] = useState('')
    const [grupo,setGrupo] = useState('')
    const [historia,setHistoria] = useState('')
    const [periodo,setPeriodo] = useState('')
    const [editora,setEditora] = useState('')
    const [compositor,setCompositor] = useState('')
    const [image, setImage] = useState(null);
    const { bottom,top } = useSafeAreaInsets()


    useEffect(()=>{
        SecureStore.getItemAsync('midia')
        .then(storedValue => {
                if (storedValue) {
                // Convertendo a string de volta para o formato original usando JSON.parse()
                const token = JSON.parse(storedValue);
                console.log('Valor recuperado:', token);
                setTitulo(token.titulo)
                setAutor(token.autor)
                setCompositor(token.compositor)
                setGrupo(token.grupo)
                setEditora(token.editora)
                setPeriodo(periodo)
                setHistoria(historia)
                setImage(token.capa)
                console.log()
                } else {
                console.log('Nenhum valor encontrado no SecureStore.');
                }
        })
    },[])

    return(
        
        <View className="flex-1 justify-center">  
            <ScrollView className="flex-1 px-8" contentContainerStyle={{paddingBottom: bottom, paddingTop:top}}>
                <View className="h-[100%]">
                        <View className="items-center">
                            <Image
                                source={image ? {uri: image } : null} 
                                className="w-[80%] h-60 mb-6"
                            />
                        </View>
                            <Text className="p-0 font-alt text-lg text-gray-50">Título: {titulo}</Text>
                            <Text className="p-0 font-alt text-lg text-gray-50">Autor: {autor}</Text>
                            <Text className="p-0 font-alt text-lg text-gray-50">Editora: {editora}</Text>
                            <Text className="p-0 font-alt text-lg text-gray-50">Compositor: {compositor}</Text>
                            <Text className="p-0 font-alt text-lg text-gray-50">Grupo: {grupo}</Text>
                            <Text className="p-0 font-alt text-lg text-gray-50">História: {historia}</Text>
                            <Text className="p-0 font-alt text-lg text-gray-50">Período: {periodo}</Text>
                </View>
            </ScrollView>
            
        </View>
    )
}
