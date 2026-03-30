import { Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState(); // 👈 This tracks if navigation is ready

  const { user, token, checkAuth } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await checkAuth();
      setIsReady(true);
    };
    initialize();
  }, []);

  useEffect(() => {
    // 🛑 STOP if navigation isn't mounted or auth check isn't finished
    if (!navigationState?.key || !isReady) return;

    const isAuthScreen = segments[0] === "(auth)";
    const isSignedIn = !!(user && token);

    // ✅ Small delay to ensure the UI thread is clear
    const timeout = setTimeout(() => {
      if (!isSignedIn && !isAuthScreen) {
        router.replace("/(auth)");
      } else if (isSignedIn && isAuthScreen) {
        router.replace("/(tabs)");
      }
    }, 1);

    return () => clearTimeout(timeout);
  }, [user, token, segments, navigationState?.key, isReady]);

  // While checking auth, show nothing or a splash screen to prevent flickers
  if (!isReady) return null;

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
  );
}