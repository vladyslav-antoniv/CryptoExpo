import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import SplashLogo from '../images/splash/iconx64.svg'; 

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome');
    }, 1000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="dark-content" />
      <SplashLogo width={178} height={178} />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: { flex: 1, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
});