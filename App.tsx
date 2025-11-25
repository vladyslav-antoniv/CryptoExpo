import React, { useCallback } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_600SemiBold, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';

import AppNavigator from './src/navigation/AppNavigator';

// Запобігаємо автоматичному прихованню сплеш-скріна, поки шрифти не завантажаться
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Ховаємо сплеш, коли шрифти готові
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Нічого не показуємо, поки вантажиться
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
}
