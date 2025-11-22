import { Stack } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Screens under /app/(auth) will appear here automatically */}
    </Stack>
  );
};

export default AuthLayout;
