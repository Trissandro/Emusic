import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import MenuM from "./components/menuM";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';


export default function Playlist() {

    const { bottom,top } = useSafeAreaInsets()

    return(
    <View className="flex-1">
        <View className="items-center py-[12%]">
                <Text className="font-alt text-gray-50 text-2xl">Playlists</Text>
                <View className="flex-row ml-6 space-x-4 items-center mt-8 w-full">
                    <Text className="text-gray-50 font-body text-base">Crie playlists e divirta-se</Text>
                    <TouchableOpacity >
                        <AntDesign name="pluscircle" size={25} color={'#04d361'} />
                    </TouchableOpacity>
                </View>
        </View>
        <ScrollView className="py-[70%]" contentContainerStyle={{paddingBottom: bottom, paddingTop:top}}>
            <Text className="text-gray-50 text-base font-bold text-center">Não tem nenhuma Playlist criada ainda</Text>
        </ScrollView>
            
        <View className="justify-center w-full flex-row bg-gray-500 h-24"> 
            <MenuM/>
        </View>
       
    </View>
    )
}