import { Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import  logo  from "../assets/logo.png";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { api } from "../assets/lib/api";
import * as SecureStore from 'expo-secure-store';



export default function login() {
    
    const [vEm,setVeM] = useState('');
    const [value,setValue] = useState('');
    const [passe,setPasse] = useState('')

    async function loadUser() { 

        api.get(`user/${vEm}`)
        .then(async response => {
            const email = response.data.email;
            if (passe!=response.data.passe) {
                setValue("E-mail ou palavra-passe inválido")
            } else {
                console.log(email);

                // Convertendo o valor para uma string usando JSON.stringify()
                const stringValue = JSON.stringify(response.data);

                // Salvando o valor no SecureStore
                SecureStore.setItemAsync('chave', stringValue)
                .then(() => {
                    console.log('Valor salvo com sucesso!');
                    setPasse('')
                    setVeM('')
                    setValue('')
                    router.push('/home')
                })
                .catch(error => {
                    console.log('Erro ao salvar o valor:', error);
                });
            }
        }
        ).catch(error => {
            if (error.response) {
              // O servidor respondeu com um código de status diferente de 2xx
              if (error.response.data) {
                setValue("E-mail ou palavra-passe inválido")
              } 
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // A solicitação foi feita, mas não houve resposta do servidor
              console.log(error.request);
            } else {
              // Ocorreu um erro durante a solicitação
              console.log('Erro', error.message);
            }
            console.log(error.config);
        }); 
    }

    const { bottom,top } = useSafeAreaInsets()

    const router = useRouter()
    
    function handleLogin() {
        loadUser()   
    }
    
    const handleInputChange = (text) => {
        setVeM(text);
    };

    return(
        <ScrollView className="flex-1 w-full" contentContainerStyle={{paddingBottom: bottom, paddingTop:top}}>
            <View className="py-[40%] h-full items-center justify-center gap-6">
                <Image source={logo} className="rounded-full w-20 h-20"/>
                <Text className="font-alt font-bold text-gray-50 text-3xl">Iniciar sessão</Text>
                <TextInput placeholder="E-mail" placeholderTextColor={'black'} className="text-lg w-[65%] bg-gray-200 pl-[10px] h-10 rounded-md mt-[30px]" 
                value={vEm}
                onChangeText={handleInputChange}/>
                <TextInput secureTextEntry={true} value={passe} placeholder="Palavra-passe" placeholderTextColor={'black'} onChangeText={setPasse} className="text-lg w-[65%] bg-gray-200 pl-[10px] h-10 rounded-md mt-[30px]"/>
                <TouchableOpacity onPress={handleLogin} activeOpacity={0.7} className='rounded-full bg-green-500 px-5 py-3'>
                <Text className='font-alt w-20 text-center text-sm uppercase text-black'>login</Text>
                </TouchableOpacity>
                <Link href="/signin" asChild>
                    <TouchableOpacity className="flex-row items-center gap-2">
                        <Text className="text-sm font-body text-blue-500">Não tem uma conta?</Text>
                    </TouchableOpacity>
                </Link>
                <Text className="text-gray-100">{value}</Text>
            </View>
        </ScrollView>
    )
}