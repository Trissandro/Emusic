import { Link } from "expo-router";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from '@expo/vector-icons/Feather'
import { AntDesign } from '@expo/vector-icons';

export default function MenuT() {
    return(
        <View className="flex-row gap-x-12 mt-5">
                    <Link href="/home" asChild>
                        <TouchableOpacity>
                        <Icon name="home" size={30} color={'#04d361'}/>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/search" asChild>
                        <TouchableOpacity>
                        <Icon name="search" size={30} color={'#04d361'}/>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/playlist" asChild>
                        <TouchableOpacity>
                            <AntDesign name="pluscircle" size={30} color={'#04d361'} />
                        </TouchableOpacity>
                    </Link>
                    <Link href="/teams" asChild>
                        <TouchableOpacity>
                            <AntDesign name="team" size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </Link>
                    <Link href="/perfil/perfil" asChild>
                        <TouchableOpacity>
                            <Icon className="" name="user" size={30} color={'#04d361'}/>
                        </TouchableOpacity>
                    </Link>
        </View>
    )
}