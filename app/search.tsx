import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuS from "./components/menuS";
import { api } from "../assets/lib/api";
import { Link } from "expo-router";
import * as SecureStore from 'expo-secure-store'


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

interface User{
    name: string
    email: string
    seguidores: Number
    seguindo: Number
    id: string
}

export default function Search() {

    const { bottom,top } = useSafeAreaInsets()
    const [search,setSearch] = useState()
    const [midias,setMidia] = useState<Midia[]>([])
    const [user,setUser] = useState<User[]>([])
    const [val,setVal] = useState('')

    async function searchMidia() {
        api.get(`midias`)
        .then(async response => {
            const midiasResponse = response.data;
            let filteredMidias = midiasResponse.filter(midia => midia.titulo === search);
            //console.log(filteredMidias)
            setMidia(filteredMidias)
            if (filteredMidias.length==0) {
                filteredMidias = midiasResponse.filter(midia => midia.autor === search);
                setMidia(filteredMidias)
                //console.log(midias)
            } if (filteredMidias.length==0) {
                filteredMidias = midiasResponse.filter(midia => midia.grupo === search);
                setMidia(filteredMidias)
                console.log("Grupo")
            } if (filteredMidias.length==0) {
                filteredMidias = midiasResponse.filter(midia => midia.editora === search);
                setMidia(filteredMidias)
                console.log("Editora")
            } if (filteredMidias.length==0) {
                filteredMidias = midiasResponse.filter(midia => midia.compositor === search);
                setMidia(filteredMidias)
                console.log("Comp")
            }
            
        })
        .catch(error => {
            console.log('Erro ao salvar o valor:', error);
        });

        api.get(`/user/search/${search}`)
        .then(async response => {
            const usersResponse = response.data;
            let filteredUsers = usersResponse.filter(user => user.name === search);
            console.log(filteredUsers)
            setUser(filteredUsers)
        })
        .catch(error => {
            console.log('Erro ao salvar o valor:', error);
        });

        
    }

    function handleClick(midia) {
        // Convertendo o valor para uma string usando JSON.stringify()
        const stringValue = JSON.stringify(midia);

        SecureStore.setItemAsync('midia', stringValue)
        .then(() => {
            console.log('Valor salvo com sucesso!'+midia);
        })
        .catch(error => {
            console.log('Erro ao salvar o valor:', error);
        });
    }

    const handleInputChange = (text) => {
        setSearch(text);
    };

    return(
        <View className="flex-1 justify-center items-center">
            <View className="pt-8 w-full justify-center items-center space-y-5">
                        <Text className="text-gray-50 mt-5 text-xl font-alt text-bold">Pesquise Aqui</Text>
                        <View className="h-10 pl-2 flex-row w-[97%] items-center bg-gray-400 rounded-xl">
                            <TextInput placeholder="Procure aqui" value={search} onChangeText={handleInputChange} placeholderTextColor={'#bebebf'} className="flex-row text-lg text-gray-50 pl-[7px] pb-2 w-[90%]"/>
                            <TouchableOpacity onPress={searchMidia} className="pr-2 flex-row rounded-full h-10 w-10 items-center justify-end">
                                <Icon name="search" size={24} color={'#bebebf'}/>
                            </TouchableOpacity>
                        </View>
                </View>
            <ScrollView className="space-y-5 w-full" contentContainerStyle={{paddingBottom: bottom, paddingTop:top}}>
                

                {midias.map(midia=>{
                return(<View key={midia.id} className="space-y-4">
                <View className="flex-row gap-2 items-center">
                    <View className="h-px w-5 bg-gray-50"/>
                    <Text className="font-body text-xs text-gray-100">{midia.autor}</Text>
                </View>
                <View className="space-y-4 px-8">
                    <Image className="h-60 w-full rounded-lg" source={{uri : midia.capa}}/>
                    <Link href="/midia/midia" asChild>
                        <TouchableOpacity onPress={()=>handleClick(midia)}>
                            <Text className="font-body text-base text-gray-100 leading-relaxed">{midia.titulo}</Text>
                        </TouchableOpacity>
                    </Link>
                    

                    <Link href="/midia/midia" asChild>
                        <TouchableOpacity onPress={()=>handleClick(midia)}className="flex-row items-center gap-2">
                            <Text className="text-sm font-body text-gray-200">Reproduzir mídia</Text>
                            <Icon name="arrow-right" size={16} color={'#9e9ea0'}/>
                        </TouchableOpacity>
                    </Link>
                    
                    </View>
                
                </View>)
                })} 
                {user.map(users=>{
                return (<View className="ml-4 mr-4 border-2 border-gray-50 rounded-md p-2" key={users.id}>
                            <Text className="text-gray-50 text-base font-body">{users.name}</Text>
                            <Text className="text-gray-50 text-base font-body">{users.email}</Text>
                        </View>)}) 
                }
                <View className="flex justify-center items-center">
                    <Text className="text-gray-50 text-xl">{val}</Text>
                </View> 
            
                
            </ScrollView>
            <View className="justify-center w-full flex-row bg-gray-500 h-24">
                <MenuS/>
            </View>
        </View>
    )
}