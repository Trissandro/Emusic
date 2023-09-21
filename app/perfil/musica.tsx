import { useEffect, useState } from "react"
import { api } from "../../assets/lib/api"
import { Link } from "expo-router"
import { View, TouchableOpacity, Text, Image } from "react-native"
import { Icon } from "react-native-elements"


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

export default function Musica({userId, admin}) {

    const [musicas,setMusicas] = useState<Midia[]>([])

    function loadMusicas() {
        api.get(`/midia/${userId}?admin=${admin}`)
        .then(async response => {

            const musicasResponse = response.data;
            const filteredMusicas = musicasResponse.filter(musica => musica.tipo === 'musica');
            setMusicas(filteredMusicas);

        }).catch(error => {
            console.log('erro')
        })

    }

    useEffect(()=>{
        loadMusicas()
    },[musicas])

    return(
        <View>
        {musicas.map(musica=>{
            return(
            <View key={musica.id} className="space-y-4">
                <View className="flex-row gap-2 items-center">
                    <View className="h-px w-5 bg-gray-50"/>
                    <Text className="font-body text-xs text-gray-100">{musica.autor}</Text>
                </View>
                <View className="space-y-4 px-8">
                    <Image className="h-60 w-full rounded-lg" source={{uri : musica.capa}}/>
                    <Text className="font-body text-base text-gray-100 leading-relaxed">{musica.titulo}</Text>

                    <Link href="/midia" asChild>
                        <TouchableOpacity className="flex-row items-center gap-2">
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