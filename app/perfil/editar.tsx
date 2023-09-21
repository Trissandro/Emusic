import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import Icon from '@expo/vector-icons/Feather'
import * as SecureStore from 'expo-secure-store'
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { api } from "../../assets/lib/api";

export default function Editar() {

    const { bottom,top } = useSafeAreaInsets()

    const [user,setUser] = useState('')
    const [usuario,setUsuario] = useState('')
    const [email,setEmail] = useState('')

    const router = useRouter()

    function handleCancel() {
        router.push('/perfil/perfil')
    }

    const data = {
        name: usuario,
        email: email,
    };

    function handleSave() {
        api.put(`user/${email}`,data)
        .then(response => {
            console.log(response.data);
            // Convertendo o valor para uma string usando JSON.stringify()
            const stringValue = JSON.stringify(response.data);

            // Salvando o valor no SecureStore
            SecureStore.setItemAsync('chave', stringValue)
            .then(() => {
                console.log('Valor salvo com sucesso!');
            })
            .catch(error => {
                console.log('Erro ao salvar o valor:', error);
            });
        })
        .catch(error => {
            // Manipule o erro aqui
            console.log(error);
        });
        router.push('/perfil/perfil')
    }

    async function loadUser() {
        SecureStore.getItemAsync('chave')
        .then(storedValue => {
                if (storedValue) {
                // Convertendo a string de volta para o formato original usando JSON.parse()
                const token = JSON.parse(storedValue);
                console.log('Valor recuperado:', token);
                setUser(token.name)
                setEmail(token.email)
            } else {
                console.log('Nenhum valor encontrado no SecureStore.');
                }
        })
        .catch(error => {
            console.log('Erro ao recuperar o valor:', error);
        });

    }

    useEffect(()=>{
        loadUser()
    },[])

    const handleInputChange = (text) => {
        setUsuario(text);
    };


    return(
        <ScrollView contentContainerStyle={{paddingBottom: bottom, paddingTop:top}}>
            <View className="flex-1">
                <View className="justify-between h-[10%] flex-row items-center m-4">
                    <TouchableOpacity onPress={handleCancel}>
                        <Text className="font-alt text-sm text-red-600">Cancelar</Text>
                    </TouchableOpacity>
                    
                    <Text className="font-alt text-base text-gray-50">Editar perfil</Text>

                    <TouchableOpacity onPress={handleSave}>
                        <Text className="text-green-500 justify-center font-alt">Guardar</Text>
                    </TouchableOpacity>
                    
                </View>
                <View className="items-center">
                    <View className="justify-center  items-center rounded-full bg-gray-400 h-40 w-40">
                        <Icon className="" name="user" size={120} color={'#eaeaea'}/>
                    </View>
                    <View>
                        <Text className="text-gray-50 font-body text-sm mt-6">Trocar foto</Text>
                    </View>
                    <View className="mt-10">
                        <TextInput placeholder={user} value={usuario} onChangeText={handleInputChange} placeholderTextColor={'#eaeaea'} className="border-0 border-b-2 border-green-500 w-96 text-center text-gray-50 text-4xl"/>
                    </View>
                    <View className="items-center px-4 mt-2">
                        <Text className="font-alt text-gray-100 text-center">Pode ser o seu primeiro nome ou o apelido.</Text>
                        <Text className="font-alt text-gray-100 text-center">É como será visto no EMusic</Text>
                    </View>
                
                </View>
        
            </View>
        </ScrollView>
    )
}