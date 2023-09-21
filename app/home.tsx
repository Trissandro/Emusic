import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import Menu from "./components/menu";
import * as SecureStore from 'expo-secure-store'
import { api } from "../assets/lib/api";
import { Link } from "expo-router";
import { Icon } from "react-native-elements";

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

export default function home() {

    const [midias,setMidias] = useState<Midia[]>([])

    function loadMidias() {
        api.get(`midias`)
        .then(async response => {
            setMidias(response.data);
        }).catch(error => {
            console.log('erro')
        })
    }

    useEffect(()=>{
        loadMidias()
    },[midias])

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

    return(
        <View className="flex-1 justify-center items-center">
            <View className="py-12">
                <Text className="text-alt font-alt text-3xl text-gray-50">Pagina Inicial</Text>    
            </View> 
            <ScrollView className="w-full space-y-5">
            {midias.map(midia=>{ 
                return(
                <View key={midia.id} className="space-y-4">
                    <View className="flex-row gap-1 items-center">
                        <View className="h-px w-5 bg-gray-50"/>
                        <Text className="font-body text-xs text-gray-100">{midia.autor}</Text>
                    </View>
                    <View className="space-y-2 px-8">
                        <Image className="h-60 w-full rounded-lg" source={{uri : midia.capa}}/>
                        <Text className="font-body text-base text-gray-100 leading-relaxed">{midia.titulo}</Text>

                        <Link href="/midia/midia" asChild>
                            <TouchableOpacity onPress={()=>handleClick(midia)} className="flex-row items-center gap-2">
                                <Text className="text-sm font-body text-gray-200">Reproduzir mídia</Text>
                                <Icon name="arrow-right" size={16} color={'#9e9ea0'}/>
                            </TouchableOpacity>
                        </Link>
                        
                    </View>
                
                </View>)
                })}
            </ScrollView>
            <View className="justify-center w-full flex-row bg-gray-500 h-24">
                <Menu/>
            </View>
        </View>
    )

}

