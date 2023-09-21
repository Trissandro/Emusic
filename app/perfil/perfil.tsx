import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import MenuP from "../components/menuP";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from '@expo/vector-icons/Feather'
import * as SecureStore from 'expo-secure-store'
import {   useRouter } from "expo-router";
import { useEffect, useState } from "react";
import  Musica  from './musica';
import VideoV from "./video";
import All from "./all";
import Upload from "./upload";


interface Midia{
    capa: string
    titulo: string
    autor: string
    id: string
    grupo: string
    historia: string
    periodo: string
    editora: string
    compositor: string
    userId: string
    path: string
    tipo: string
}


export default function Perfil() {

    const [user,setUser] = useState()
    const [id,setId] = useState()
    const [follows,setFollows] = useState()
    const [followers,setFollowers] = useState()
    const [musica,setMusica] = useState(false)
    const [video,setVideo] = useState(false)
    const [all,setAll] = useState(true)
    const [admin,setAdmin] = useState()


    const router = useRouter()

    async function handleEdit() {
        router.push('/perfil/editar')
    }

    async function signOut() {
        await SecureStore.deleteItemAsync('chave')
        router.push('/login')
    }

    async function loadUser() {
        SecureStore.getItemAsync('chave')
        .then(async storedValue => {
                if (storedValue) {
                // Convertendo a string de volta para o formato original usando JSON.parse()
                const token = JSON.parse(storedValue);
                console.log('Valor recuperado:', token);
                setUser(token.name)
                setId(token.id)
                setAdmin(token.admin)
                setFollows(token.seguidores)
                setFollowers(token.seguindo)
                
                // Convertendo o valor para uma string usando JSON.stringify()
                const stringValue = JSON.stringify(token);

                // Salvando o valor no SecureStore
                SecureStore.setItemAsync('chave', stringValue)
                .then(() => {
                    console.log('Valor salvo com sucesso!');
                })
                .catch(error => {
                    console.log('Erro ao salvar o valor:', error);
                });
                } else {
                console.log('Nenhum valor encontrado no SecureStore.');
                }   
        })
        .catch(error => {
            console.log('Erro ao recuperar o valor:', error);
        });

    }

    function handleMusic() {
        setMusica(true)
        setAll(false)
        setVideo(false)
    }

    function handleVideo() {
        setMusica(false)
        setAll(false)
        setVideo(true)
    }

    function handleAll() {
        setMusica(false)
        setAll(true)
        setVideo(false)
    }

    function handleUpload() {
        setMusica(false)
        setAll(false)
        setVideo(false)
    }
      
    useEffect(()=>{
        loadUser()
    },[])


        return( 
        <View className="flex-1 gap-y-2">
            <View className="py-[15%] left-6">
                <TouchableOpacity onPress={signOut} className="ml-[80%] rounded-full h-10 w-10 bg-red-500 items-center justify-center">
                    <Icon name="log-out" size={16} color='#000'/>
                </TouchableOpacity>
                <View className="flex-row w-full space-x-4 items-center">
                    <View className="justify-center  items-center rounded-full bg-gray-400 h-32 w-32">
                        <Icon className="" name="user" size={70} color={'#eaeaea'}/>
                    </View>
                    <View className="flex-col">
                        <Text className="text-gray-50 text-xl font-alt font-bold">{user}</Text>
                     <Text className="text-gray-100 text-sm font-body">Seguidores {follows} / Seguindo {followers}</Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity onPress={handleEdit} className="w-16 h-8 mt-6 ml-8 rounded-full border-gray-50 border-2">
                        <Text className="text-center mt-[4px] items-center text-gray-50">Editar</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row left-[-26] mt-5 h-[0.1]">
                    
                        <TouchableOpacity className="w-16 h-8 mt-6 ml-8 rounded-full">
                            <Text onPress={handleAll} className="text-center mt-[4px] items-center text-gray-50">Tudo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ handleVideo} className="w-16 h-8 mt-6 ml-8 rounded-full">
                            <Text className="text-center mt-[4px] items-center text-gray-50">Videos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleMusic} className="w-16 h-8 mt-6 ml-8 rounded-full">
                            <Text className="text-center mt-[4px] items-center text-gray-50">Músicas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleUpload} className="w-16 h-8 mt-6 ml-8 rounded-full">
                            <Text className="text-center mt-[4px] items-center text-gray-50">Uploads</Text>
                        </TouchableOpacity>
                </View>
            </View>
            <ScrollView> 
            {
                musica ?   <Musica userId={id} admin={admin}/> : video ? <VideoV userId={id} admin={admin}/> : all ? <All userId={id} admin={admin}/> : <Upload/>
                
            }

            </ScrollView>

            <View className="justify-center w-full flex-row bg-gray-500 h-24">
                <MenuP/>
            </View>
        </View>
    )
    
}