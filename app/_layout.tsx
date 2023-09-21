import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'react-native';

import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
  } from '@expo-google-fonts/roboto'
  
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import luz from '../assets/luz.png'
import { SplashScreen, Stack } from 'expo-router';

export default function Layout() {


    const [hasLoadedFonts] = useFonts({
        BaiJamjuree_700Bold,
        Roboto_700Bold,
        Roboto_400Regular,
      })
    
      if (!hasLoadedFonts) {
        return <SplashScreen/>
    }
    return(
        <ImageBackground source={luz} className='flex-1 relative  bg-gray-900' imageStyle={{ position: 'absolute', left: '-100%' }}>
            <StatusBar style="light" translucent />
            <Stack screenOptions={{headerShown: false,animation:'fade', contentStyle:{backgroundColor:'transparent'}}}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="login"/>
                <Stack.Screen name="signin"/>
            </Stack>
        </ImageBackground>
    )
}