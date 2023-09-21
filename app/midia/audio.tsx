import React, { useEffect, useState,  } from 'react';
import { Audio } from 'expo-av';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';

export default function AudioPlayer({ uri }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function loadAudio() {
        console.log(uri)
        const { sound } = await Audio.Sound.createAsync(
          { uri: uri },
        );
      setSound(sound);
    }

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [uri]);

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  return (
    <View>
      <TouchableOpacity className='rounded-full border-2 border-gray-50 p-3 felx justify-center items-center'  onPress={isPlaying ? pauseSound : playSound}>
        {isPlaying ? <MaterialCommunityIcons name="pause" size={30} color="#04d361" /> : <FontAwesome5 name="play" size={30} color="#04d361" />   }
      </TouchableOpacity>
    </View>
  );
}
