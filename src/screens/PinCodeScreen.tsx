import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Dimensions } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { ORANGE_COLOR } from '../constants/colors';

// Images
import PinDotActive from '../images/pin/Ellipse 99.svg';
import PinDotInactive from '../images/pin/Ellipse 101.svg';
import BackspaceIcon from '../images/pin/Union.svg';
import PinDecorIcon from '../images/pin/img.svg';

const { width } = Dimensions.get('window');

export default function PinCodeScreen({ navigation }: any) {
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const [firstPin, setFirstPin] = useState(""); 
  
  const handlePress = (val: string) => {
    if (val === 'del') {
      setPin(p => p.slice(0, -1));
      return;
    }
    if (pin.length < 5) {
      const newPin = pin + val;
      setPin(newPin);
    }
  };

  const onContinue = () => {
    if (pin.length < 5) {
      Alert.alert("Error", "Please enter a 5-digit code.");
      return;
    }
    handlePinComplete(pin);
  };

  const handlePinComplete = async (completedPin: string) => {
    if (step === 'create') {
      setFirstPin(completedPin);
      setPin(""); 
      setStep('confirm'); 
    } else {
      if (completedPin === firstPin) {
        await savePin(completedPin);
        askForBiometrics();
      } else {
        Alert.alert("Error", "Pin codes do not match. Try again.");
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

  const askForBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (hasHardware) {
      Alert.alert(
        "Enable Face ID?",
        "Would you like to use Face ID for faster login?",
        [
          { text: "No", onPress: () => navigation.replace('HomeTabs') },
          { 
            text: "Yes", 
            onPress: async () => {
              await SecureStore.setItemAsync('useBiometrics', 'true');
              navigation.replace('HomeTabs');
            } 
          }
        ]
      );
    } else {
      navigation.replace('HomeTabs');
    }
  };

  return (
    <SafeAreaView style={styles.containerWhite}>
      <View style={styles.content}>
         
         {/* Header */}
         <View style={styles.headerContainer}>
            <PinDecorIcon width={60} height={60} style={{marginBottom: 20}} />
            <Text style={styles.title}>
              {step === 'create' ? 'Create a Pin code' : 'Repeat a Pin code'}
            </Text>
            <Text style={styles.subtitle}>Enter 5 digit code</Text>
         </View>

         {/* Dots */}
         <View style={styles.dotsContainer}>
           {[1, 2, 3, 4, 5].map((i) => (
             <View key={i} style={{ marginHorizontal: 8 }}>
                {pin.length >= i ? <PinDotActive width={24} height={24}/> : <PinDotInactive width={24} height={24}/>}
             </View>
           ))}
         </View>

         {/* Numpad */}
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

             {/* 2. Нуль */}
             <TouchableOpacity style={styles.numBtn} onPress={() => handlePress('0')}>
               <Text style={styles.numText}>0</Text>
             </TouchableOpacity>

             {/* 3. Видалити */}
             <TouchableOpacity style={styles.numBtn} onPress={() => handlePress('del')}>
                <BackspaceIcon width={24} height={24} />
             </TouchableOpacity>
           </View>
         </View>

         {/* --- CONTINUE BUTTON --- */}
         <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.btnPrimary} onPress={onContinue}>
               <Text style={styles.btnTextWhite}>Continue</Text>
            </TouchableOpacity>
         </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerWhite: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, justifyContent: 'space-between', paddingVertical: 40 },
  
  headerContainer: { alignItems: 'center', marginTop: 20 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 22, color: '#000', marginBottom: 38 },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 15, color: '#606773' },

  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },

  numpadWrapper: { alignItems: 'center' },
  numpad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: 300 },
  
  numBtn: { 
    width: 80, 
    height: 80, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: 10,
    marginVertical: 5
  },
  numText: { 
    fontFamily: 'Inter_700Bold', 
    fontSize: 32, 
    color: '#000' 
  },

  // Button Styles
  bottomButtonContainer: {
    paddingHorizontal: 24,
    marginBottom: 10, 
  },
  btnPrimary: {
    backgroundColor: ORANGE_COLOR, 
    width: '100%', 
    height: 56, 
    borderRadius: 28,
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: ORANGE_COLOR, 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 5
  },
  btnTextWhite: { 
    fontFamily: 'Inter_600SemiBold', 
    fontSize: 18, 
    color: '#FFF' 
  },
});