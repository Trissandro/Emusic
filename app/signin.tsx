import { useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform } from "react-native";
import logo from '../assets/logo.png'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CheckBox } from 'react-native-elements';
import { useState } from "react";
import { api } from "../assets/lib/api";
import * as SecureStore from 'expo-secure-store';



export default function signin() {

    const { bottom,top } = useSafeAreaInsets()

    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')
    const [passe,setPasse] = useState('')
    const [confP,setConfP] = useState('')
    const [erro,setErro] = useState('')

    const [checkbox1, setCheckbox1] = useState(false);

    const handleCheckbox1 = () => {
        setCheckbox1(!checkbox1);
    };

    const router = useRouter()

    const validateEmail = (email) => {
        const regex = /^\d{8}@isptec\.co\.ao$/;
        return regex.test(email);
    };

    function handleSignin() {
        if (!validateEmail(email)) {
            setErro('E-mail inválido')
            return
        }
        if (passe!=confP) {
            setErro('Palavras passe não são iguais')
            return
        }

        const data = {
            name: nome,
            email: email,
            passe: passe,
            admin: checkbox1.toString(),
            seguidores: 0,
            seguindo: 0
        };

        api.post(`user`, data)
        .then(response => {
            // Manipule a resposta da API aqui
            console.log(response.data);
            // Convertendo o valor para uma string usando JSON.stringify()
            const stringValue = JSON.stringify(response.data);

            // Salvando o valor no SecureStore
            SecureStore.setItemAsync('chave', stringValue)
            .then(() => {
                console.log('Valor salvo com sucesso!');
                setNome('')
                setEmail('')
                setConfP('')
                setPasse('')
                setCheckbox1(false)
                setErro('')
                router.push('/home')
            })
            .catch(error => {
                console.log('Erro ao salvar o valor:', error);
            });
        })
        .catch(error => {
            if (error.response) {
                // O servidor respondeu com um código de status diferente de 2xx
                if(error.response.data)
                    setErro('E-mail inválido') 
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

    return(
        <KeyboardAvoidingView className="flex-1 w-full" behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={80}>
        <ScrollView className="flex-1 w-full" contentContainerStyle={{paddingBottom: bottom, paddingTop:top}}>
            <View className="py-[40%] h-full items-center justify-center gap-6">
                <Image source={logo} className="rounded-full w-20 h-20"/>
                <Text className="font-alt font-bold text-gray-50 text-3xl">Fazer registro</Text>
                <TextInput placeholder="Username" value={nome} onChangeText={setNome}  placeholderTextColor={'black'} className="text-lg w-[65%] bg-gray-200 pl-[10px] h-10 rounded-md mt-[30px]"/>
                <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} placeholderTextColor={'black'} className="text-lg w-[65%] bg-gray-200 pl-[10px] h-10 rounded-md mt-[30px]"/>
                <TextInput secureTextEntry={true} value={passe} onChangeText={setPasse}  placeholder="Palavra-passe" placeholderTextColor={'black'} className="text-lg w-[65%] bg-gray-200 pl-[10px] h-10 rounded-md mt-[30px]"/>
                <TextInput secureTextEntry={true} value={confP} onChangeText={setConfP} placeholder="Repita a Palavra-passe" placeholderTextColor={'black'} className="text-lg w-[65%] bg-gray-200 pl-[10px] h-10 rounded-md mt-[30px]"/>
                <CheckBox
                    title='Administrador'
                    checked={checkbox1}
                    onPress={handleCheckbox1}
                />
                <TouchableOpacity onPress={handleSignin} activeOpacity={0.7} className='rounded-full bg-green-500 px-5 py-3'>
                    <Text className='font-alt w-[50%] text-center text-sm uppercase text-black'>Fazer registro</Text>
                </TouchableOpacity>
                <Text className="text-gray-100">{erro}</Text>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}


