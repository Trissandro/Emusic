import { useEffect, useState } from "react"
import { api } from "../../assets/lib/api"
import { Link } from "expo-router"
import * as SecureStore from 'expo-secure-store'
import { View, TouchableOpacity, Text, Image } from "react-native"
import { Icon } from "react-native-elements"
import { MaterialIcons } from '@expo/vector-icons';


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

export default function All({userId,admin}) {

    const [midias,setMidias] = useState<Midia[]>([])

    function loadMidias() {
        api.get(`/midia/${userId}?admin=${admin}`)
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

    async function handleClickDelete(id) {
        api.delete(`/midias/${id}`)
        .then(async response => {
          console.log(id)
          console.log(response.data); // Dados de resposta da API após a exclusão
        })
    };

    return(
        <View>
        {midias.map(midia=>{
            return(
            <View key={midia.id} className="space-y-4 mb-4">
                <View className="flex-row gap-2 items-center">
                    <View className="h-px w-5 bg-gray-50"/>
                    <Text className="font-body text-sm text-gray-100">{midia.autor}</Text>
                </View>
                <View className="space-y-2 px-8">
                    <Image className="h-60 w-full rounded-lg" source={{uri : midia.capa}}/>
                    <View className="flex-row justify-between">
                        <Text className="font-body text-base text-gray-50 leading-relaxed">{midia.titulo}</Text>
                        <TouchableOpacity onPress={()=>handleClickDelete(midia.id)} className="border-2 border-gray-100 rounded-full h-10 w-10 items-center justify-center">
                            <MaterialIcons name="delete" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <Link href="/midia/midia" asChild>
                        <TouchableOpacity onPress={()=>handleClick(midia)} className="flex-row items-center gap-2">
                            <Text className="text-sm font-body text-gray-200">Reproduzir mídia</Text>
                            <Icon name="arrow-right" size={16} color={'#9e9ea0'}/>
                        </TouchableOpacity>
                    </Link>
                    
                </View>
            
            </View>)
        })}
        </View>
    )
}