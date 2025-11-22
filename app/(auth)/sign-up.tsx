import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuthStore();

  const handleSignUp = async () => {
    const result = await register({name, email, password});

    if(!result.success) {
      Alert.alert('Error', result.error || 'Registration failed.')
    }
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      {/* Welcome Text */}
      <Text className="text-4xl font-bold text-center text-green-600 mb-2">
        Welcome!
      </Text>
      <Text className="text-center text-gray-500 mb-10">
        Create an account to get started
      </Text>

      {/* NAME INPUT */}
      <View className="mb-4">
        <View className="absolute left-3 top-3">
          <Ionicons name="person-outline" size={20} color="gray" />
        </View>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          autoCapitalize="none"
          className="bg-gray-100 px-10 py-3 rounded-lg border border-gray-300 text-gray-800"
        />
      </View>

      {/* Email Input */}
      <View className="mb-4">
        <View className="absolute left-3 top-3">
          <Ionicons name="mail-outline" size={20} color="gray" />
        </View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-gray-100 px-10 py-3 rounded-lg border border-gray-300 text-gray-800"
        />
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <View className="absolute left-3 top-3">
          <Ionicons name="lock-closed-outline" size={20} color="gray" />
        </View>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!showPassword}
          className="bg-gray-100 px-10 py-3 rounded-lg border border-gray-300 text-gray-800"
        />

        <TouchableOpacity
          className="absolute right-3 top-3"
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-green-600 py-3 rounded-lg items-center mb-4"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-lg">Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Footer Text */}
      <View className="flex-row justify-between">
        <Text className="text-gray-500">Already have an account?</Text>
        <Link href="/(auth)" asChild>
          <TouchableOpacity>
            <Text className="text-green-600 font-semibold">Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
