import { Image, Text, TouchableOpacity, View } from 'react-native';
import {useRouter} from 'expo-router'

import logo from '../assets/logo.png'

export default function App() {

  const router = useRouter()

  function login() {
    router.push('/login')
  }

  function signin() {
    router.push('/signin')
  }

  return (
    <View className='px-4 flex-1 items-center py-10'>
      <View className='flex-1 gap-6 items-center justify-center'>
        <Image source={logo} alt='' className='rounded-full w-16 h-16'/>
        <View className='space-y-2'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>Bem Vindo ao EMusic</Text>
          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>Colecione momentos marcantes de reprodução no melhor aplicativo de mídias!</Text>
        </View>
        <TouchableOpacity onPress={login} activeOpacity={0.7} className='rounded-full bg-green-500 px-5 py-3'>
          <Text className='font-alt w-20 text-center text-sm uppercase text-black'>login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signin} activeOpacity={0.7} className='rounded-full bg-green-500 px-5 py-3'>
          <Text className='font-alt text-center w-20 text-sm uppercase text-black'>signin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

