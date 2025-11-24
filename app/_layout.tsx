import { Stack, useRouter, useSegments, useFocusEffect } from "expo-router";
import "./global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "@/components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segment = useSegments();
  const { checkAuth, user, token } = useAuthStore();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  // Wait for navigation to be ready
  useFocusEffect(() => {
    setIsNavigationReady(true);
    return () => setIsNavigationReady(false);
  });

  useEffect(() => {
    if (!isNavigationReady) return;

    const inAuthScreen = segment[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace({ pathname: "/(tabs)" });
    }
  }, [user, token, segment, isNavigationReady]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  )
}