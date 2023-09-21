import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function createGrupo() {

    const router = useRouter()

    function handleCancel() {
        router.push('/teams')
    }

    function handleSave() {
        router.push('/teams')
    }

    return(
        <View className="flex-1">
            <View className="justify-between h-[10%] flex-row items-center m-4">
                    <TouchableOpacity onPress={handleCancel}>
                        <Text className="font-alt text-sm text-red-600">Cancelar</Text>
                    </TouchableOpacity>
                    
                    <Text className="font-alt text-xl text-gray-50">Criando Grupos</Text>

                    <TouchableOpacity onPress={handleSave}>
                        <Text className="text-green-500 justify-center font-alt">Guardar</Text>
                    </TouchableOpacity>
                    
                </View>
                <ScrollView>
                    <View className="items-center justify-center">
                        <Text className="text-2xl text-green-500">Criando Grupos</Text>
                    </View>
                </ScrollView>
                
        </View>
        
    )
}