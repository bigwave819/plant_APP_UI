

import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/store/authStore';

const profile = () => {
  const data = [
    {
      id: 1,
      title: 'User Info',
    },
    {
      id: 2,
      title: 'User Info',
    },
    {
      id: 3,
      title: 'User Info',
    },
    {
      id: 4,
      title: 'User Info',
    },
  ];

  const {logout} = useAuthStore()
  return (
    <View className='w-full bg-white h-full items-center pt-10 px-4'>
      <View className='w-40 h-40 shadow-xl'>
        <Image 
          source={{ uri: 'https://t3.ftcdn.net/jpg/15/34/03/58/360_F_1534035806_6gn57ou4V0dVZY6l30h6nEB5gWQRAP6v.jpg' }}
          className='w-full h-full'
        />
      </View>
      <View className='mt-5 mb-3 w-full'>
        <TouchableOpacity className='p-4 rounded-full bg-red-700' onPress={logout}>
          <Text className='text-white text-center text-lg'>Logout</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})