

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text>index</Text>
      <Link href={`/(auth)/sign-up`} className='underline'>
        <Text>SignUp</Text>
      </Link>
      <Link href={`/(auth)`} className='underline'>
        <Text>login</Text>
      </Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})