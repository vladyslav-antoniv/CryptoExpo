import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Dimensions } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ORANGE_COLOR } from '../constants/colors';

import PinDotActive from '../images/pin/Ellipse 99.svg';
import PinDotInactive from '../images/pin/Ellipse 101.svg';
import BackspaceIcon from '../images/pin/Union.svg';
import PinDecorIcon from '../images/pin/img.svg';
import ArrowBack from '../images/arrow-dropdown-black.svg';

const { width } = Dimensions.get('window');

export default function PinCodeScreen({ route, navigation }: any) {
  const { t } = useTranslation();
  
  const isLogoutMode = route.params?.isLogout || false;

  const [pin, setPin] = useState("");
  const [step, setStep] = useState<'create' | 'confirm' | 'enter'>('create');
  
  const [firstPin, setFirstPin] = useState(""); 
  const [storedPin, setStoredPin] = useState<string | null>(null);

  useEffect(() => {
    checkPinStatus();
  }, []);

  const checkPinStatus = async () => {
    const sPin = await SecureStore.getItemAsync('userPin');
    if (sPin) {
        setStoredPin(sPin);
        setStep('enter');

        if (!isLogoutMode) {
             askForBiometrics(false);
        }
    } else {
        setStep('create');
    }
  };
  
  const handlePress = (val: string) => {
    if (val === 'del') {
      setPin(p => p.slice(0, -1));
      return;
    }
    if (pin.length < 5) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 5) {
         handlePinComplete(newPin);
      }
    }
  };

  const onContinue = () => {
    if (pin.length < 5) {
      Alert.alert("Error", t('pin.errorLength'));
      return;
    }
    handlePinComplete(pin);
  };

  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      })
    );
  };

  const performLogout = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
    );
  };

  const handlePinComplete = async (inputPin: string) => {
    if (step === 'enter') {
        if (inputPin === storedPin) {
            if (isLogoutMode) {
                performLogout();
            } else {
                navigateToHome();
            }
        } else {
            Alert.alert("Error", "Incorrect PIN");
            setPin("");
        }
    } 
    else if (step === 'create') {
      setFirstPin(inputPin);
      setPin(""); 
      setStep('confirm'); 
    } 
    else {
      if (inputPin === firstPin) {
        await savePin(inputPin);
        askForBiometrics(true);
      } else {
        Alert.alert("Error", t('pin.errorMatch'));
        setPin("");
        setStep('create'); 
        setFirstPin("");
      }
    }
  };

  const savePin = async (code: string) => {
    try {
      await SecureStore.setItemAsync('userPin', code);
    } catch (e) {
      console.log(e);
    }
  };

  const askForBiometrics = async (isSetup: boolean) => {
    if (isLogoutMode) return;

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
        if (isSetup) navigateToHome();
        return;
    }

    if (!isSetup) {
        const isEnabled = await SecureStore.getItemAsync('useBiometrics');
        if (isEnabled === 'true') {
            const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Login' });
            if (result.success) navigateToHome();
        }
        return;
    }

    if (hasHardware) {
      Alert.alert(
        t('pin.biometricsTitle'),
        t('pin.biometricsMsg'),
        [
          { text: t('pin.no'), onPress: navigateToHome }, 
          { 
            text: t('pin.yes'), 
            onPress: async () => {
              await SecureStore.setItemAsync('useBiometrics', 'true');
              navigateToHome(); 
            } 
          }
        ]
      );
    } else {
      navigateToHome();
    }
  };

  const getTitle = () => {
      if (isLogoutMode) return "Confirm Logout";
      if (step === 'create') return t('pin.createTitle');
      if (step === 'confirm') return t('pin.repeatTitle');
      return "Enter PIN";
  };

  return (
    <SafeAreaView style={styles.containerWhite}>
      
      <View style={styles.navHeader}>
        {(isLogoutMode || step === 'create') && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
               <ArrowBack width={24} height={24} />
            </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
         
         <View style={styles.headerContainer}>
            <PinDecorIcon width={60} height={60} style={{marginBottom: 20}} />
            <Text style={styles.title}>{getTitle()}</Text>
            <Text style={styles.subtitle}>{t('pin.subtitle')}</Text>
         </View>

         <View style={styles.dotsContainer}>
           {[1, 2, 3, 4, 5].map((i) => (
             <View key={i} style={{ marginHorizontal: 8 }}>
                {pin.length >= i ? <PinDotActive width={24} height={24}/> : <PinDotInactive width={24} height={24}/>}
             </View>
           ))}
         </View>

         <View style={styles.numpadWrapper}>
           <View style={styles.numpad}>
             {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
               <TouchableOpacity 
                 key={num} 
                 style={styles.numBtn} 
                 onPress={() => handlePress(num.toString())}
               >
                 <Text style={styles.numText}>{num}</Text>
               </TouchableOpacity>
             ))}

             <View style={styles.numBtn} />

             <TouchableOpacity style={styles.numBtn} onPress={() => handlePress('0')}>
               <Text style={styles.numText}>0</Text>
             </TouchableOpacity>

             <TouchableOpacity style={styles.numBtn} onPress={() => handlePress('del')}>
                <BackspaceIcon width={24} height={24} />
             </TouchableOpacity>
           </View>
         </View>

         <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.btnPrimary} onPress={onContinue}>
               <Text style={styles.btnTextWhite}>{t('auth.continue')}</Text>
            </TouchableOpacity>
         </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerWhite: { flex: 1, backgroundColor: '#FFF' },
  navHeader: { paddingHorizontal: 20, paddingTop: 10, zIndex: 10 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },

  content: { flex: 1, justifyContent: 'space-between', paddingVertical: 20 },
  
  headerContainer: { alignItems: 'center', marginTop: 10 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 22, color: '#000', marginBottom: 38 },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 15, color: '#606773' },

  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },

  numpadWrapper: { alignItems: 'center' },
  numpad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: 300 },
  
  numBtn: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginVertical: 5 },
  numText: { fontFamily: 'Inter_700Bold', fontSize: 32, color: '#000' },

  bottomButtonContainer: { paddingHorizontal: 24, marginBottom: 10 },
  btnPrimary: {
    backgroundColor: ORANGE_COLOR, width: '100%', height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: ORANGE_COLOR, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
  },
  btnTextWhite: { fontFamily: 'Inter_600SemiBold', fontSize: 18, color: '#FFF' },
});