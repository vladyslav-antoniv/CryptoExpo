import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashIcon from '../images/splash/iconx64.svg'; 

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        
        setTimeout(() => {
          if (userToken) {
            navigation.replace('PinCode');
          } else {
            navigation.replace('Welcome');
          }
        }, 2000);
      } catch (e) {
        navigation.replace('Welcome');
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="dark-content" />
      <SplashIcon width={120} height={120} />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: { 
    flex: 1, 
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});