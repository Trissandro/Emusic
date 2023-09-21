import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function Upload() {
    return (
    <View className=" flex border-2 rounded-xl border-gray-50 pt-[30%] pb-[30%] justify-center items-center">
        <Link href="/midia/addMidia" asChild>
            <TouchableOpacity className="bg-green-500 rounded-xl p-8">
            <Text className="font-alt text-base">Fazer Uploads de mídias</Text>
            </TouchableOpacity>
        </Link>
        
    </View>
    )
}