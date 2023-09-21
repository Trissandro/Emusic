import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import MenuT from "./components/menuT";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";


export default function Teams() {

    const { bottom,top } = useSafeAreaInsets()

    const router = useRouter()

    function handleCreateGrupo() {
        router.push('/createTeams')
    }

    return(
        <View className="flex-1">
            <View className="items-center py-[12%]">
                <Text className="font-alt text-gray-50 text-2xl">Grupos</Text>
                <View className="flex-row ml-6 space-x-4 items-center mt-8 w-full">
                    <Text className="text-gray-50 font-body text-base">Crie grupos e divirta-se</Text>
                    <TouchableOpacity onPress={handleCreateGrupo}>
                        <AntDesign name="pluscircle" size={25} color={'#04d361'} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView className="py-[70%]" contentContainerStyle={{paddingBottom: bottom, paddingTop:top}}>
            <Text className="text-gray-50 text-base font-bold text-center">Não está inscrito em um grupo ainda</Text>
            </ScrollView>
            
            <View className="justify-center w-full flex-row bg-gray-500 h-24">
                <MenuT/>
            </View>
        </View>
    )
}