import { Video, Audio } from "expo-av";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Icon } from "react-native-elements";
import * as SecureStore from 'expo-secure-store';
import AudioPlayer from "./audio";
import { MaterialIcons } from '@expo/vector-icons';
import { api } from "../../assets/lib/api";

interface Comments {
    id: string,
    coment: string,
    midiaId: string,
    userId: string
}

export default function midia() {

    const [midia,setMidia] = useState()
    const [tipo,setTipo] = useState()
    const [capa,setCapa] = useState()
    const [nome,setNome] = useState()
    const [autor,setAutor] = useState()
    const [user,setUser] = useState()
    const [comment,setComment] = useState('')
    const [id,setId] = useState()

    const [coments,setComents] = useState<Comments[]>([])

    function loadMidia() {
        SecureStore.getItemAsync('midia')
        .then(async storedValue => {
            if (storedValue) {
                // Convertendo a string de volta para o formato original usando JSON.parse()
                const token = JSON.parse(storedValue);
                console.log('Valor recuperado:', token);
                setMidia(token.path)
                setTipo(token.tipo)
                setCapa(token.capa)
                setNome(token.titulo)
                setAutor(token.autor)
                setId(token.id)

                await api.get(`/comments/${token.id}`).
                    then(async response => {
                        setComents(response.data);
                    }).catch(error => {
                        console.log('erro')
                })

                loadUser()
            }
        })
        .catch(error => {
            console.log('Erro ao recuperar o valor:', error);
        });   
    }

    function loadUser() {
        SecureStore.getItemAsync('chave')
        .then(storedValue => {
                if (storedValue) {
                // Convertendo a string de volta para o formato original usando JSON.parse()
                const token = JSON.parse(storedValue);
                console.log('Valor recuperado:', token);
                setUser(token.id)
            } else {
                console.log('Nenhum valor encontrado no SecureStore.');
                }
        })
        .catch(error => {
            console.log('Erro ao recuperar o valor:', error);
        });
    }

    const handleInputChange = (text) => {
        setComment(text);
    };

    function createComent() {
        const data = {
            coment : comment, 
            userId : user,
            midiaId : id 
        }

        api.post(`/coments`,data).then(response => {
            console.log('Comentário criado:', response.data);
            setComment('')
          })
          .catch(error => {
            // Manipule o erro aqui
            console.error('Erro na criação do comentário:', error);
          });  
    }

    useEffect(()=>{
        loadMidia()
    },[coments])

    return(
        <View className="flex-1 space-y-2 w-full">
            <View className="pl-6 flex-row justify-start mt-12">
                <Link href="/home" asChild>
                    <TouchableOpacity  className="flex-row rounded-full h-10 w-14 items-center justify-start">
                        <Icon name="arrow-left" size={30} color='#FFF'/>
                        <Text className="font-alt text-base text-gray-50">Voltar</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            <KeyboardAvoidingView className="flex-1 w-full" behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={80}>              
            <ScrollView className="flex-1 px-4 w-full">
                { (tipo=="video") ?
                <View className="">
                    <Video
                    source={midia ? {uri: midia } : null  } 
                    className="w-full h-60"
                    useNativeControls 
                    />
                </View> : 
                <View className="flex items-center">
                    <Image
                    source={capa ? {uri: capa } : null} 
                    className="w-[80%] h-60 mb-6"
                    />
                    <AudioPlayer uri={midia} />
                </View> 
                }

                <View className="mt-2 ml-6 space-y-1 mb-2">
                    <Link href="./viewMidia">
                    <Text className="text-gray-50 font-alt text-base">{nome}</Text>
                    </Link>
                    <Text className="text-gray-50 font-alt text-lg">{autor}</Text>
                </View>
                <View className="flex-row w-[97%]">
                    <TextInput value={comment} textAlignVertical="top" onChangeText={handleInputChange} className="pl-6 font-body text-lg text-gray-50 w-[90%]"                 placeholderTextColor="#9e9ea0" placeholder="Comente aqui"/>
                    <TouchableOpacity onPress={()=>createComent()} className="pr-2 flex-row rounded-full h-10 w-10 items-center justify-end">
                        <MaterialIcons name="add-comment" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
                {coments.map(coment=>{
                    return(
                        <View key={coment.id} className="ml-6 mt-2">
                            <Text className="text-gray-50 text-lg">{coment.coment}</Text>
                        </View>
                    )
                })}
                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    )
}