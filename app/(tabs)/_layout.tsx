

import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import { Tabs } from 'expo-router'

const _layout = () => {
    const color = ""
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    height: 50,
                    borderTopWidth: 0,
                    paddingTop: 6,
                },
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`w-12 h-12 rounded-full justify-center items-center ${focused ? "bg-green-600" : "bg-gray-100"
                                }`}
                        >
                            <Ionicons
                                name="home-outline"
                                size={24}
                                color={focused ? "white" : "gray"}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`w-12 h-12 rounded-full justify-center items-center ${focused ? "bg-green-600" : "bg-gray-100"
                                }`}
                        >
                            <Ionicons
                                name="search-outline"
                                size={24}
                                color={focused ? "white" : "gray"}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`w-12 h-12 rounded-full justify-center items-center ${focused ? "bg-green-600" : "bg-gray-100"
                                }`}
                        >
                            <Ionicons
                                name="person-outline"
                                size={24}
                                color={focused ? "white" : "gray"}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    )
}

export default _layout