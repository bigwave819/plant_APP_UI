import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useAuthStore()


  const handleLogin = async () => {
    const result = await login({ email, password })
    if (!result.success) {
      Alert.alert('Error', result.error || 'Registration failed.')
    }
    else {
      Alert.alert('login Successfully')
    }
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">

      {/* Welcome Text */}
      <Text className="text-4xl font-bold text-center text-green-600 mb-2">
        Hello, Welcome Again!
      </Text>
      <Text className="text-center text-gray-500 mb-10">
        Login in order to access your data
      </Text>

      {/* EMAIL INPUT */}
      <View className="mb-4 relative">
        <Ionicons
          name="mail-outline"
          size={20}
          color="gray"
          style={{ position: 'absolute', top: 14, left: 10 }}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-gray-100 px-10 py-3 rounded-lg border border-gray-300 text-gray-800"
        />
      </View>

      {/* PASSWORD INPUT */}
      <View className="mb-6 relative">
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="gray"
          style={{ position: 'absolute', top: 14, left: 10 }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          className="bg-gray-100 px-10 py-3 rounded-lg border border-gray-300 text-gray-800"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: 'absolute', right: 10, top: 12 }}
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={28}
          />
        </TouchableOpacity>
      </View>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-green-600 py-3 rounded-lg items-center mb-4"
        disabled={isLoading === true}
      >
        {isLoading === true ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-lg font-semibold">Login</Text>
        )}
      </TouchableOpacity>

      {/* FOOTER */}
      <View className="flex-row justify-center gap-1">
        <Text className="text-gray-500">Don't have an account?</Text>

        <Link href="/sign-up" asChild>
          <TouchableOpacity>
            <Text className="text-green-600 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
