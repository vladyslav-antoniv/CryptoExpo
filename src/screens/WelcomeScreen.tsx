import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ORANGE_COLOR } from '../constants/colors';

import BgWelcome from '../images/welcome/bg.svg';
import VectorLogo from '../images/welcome/1/Vector.svg';
import IconRealEstate from '../images/welcome/Crowd-real-estate.svg';
import IconEtfs from '../images/welcome/ETFs.svg';
import IconCrypto from '../images/welcome/Crypto.svg';
import IconLending from '../images/welcome/Crowd-lending.svg';
import IconCommodities from '../images/welcome/Commodities.svg'; 

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: any) {
  const { t } = useTranslation();
  
  const handlePress = (category: string) => {
    console.log(`Pressed: ${category}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={[StyleSheet.absoluteFill, {marginTop: 200}]}>
         <BgWelcome width={width} height={height}/>
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.welcomeContent}>
          
          <View style={styles.gridWrapper}>
            <View style={styles.gridCol}>
               <View style={[styles.cardItem, styles.cardLogo]}>
                  <VectorLogo width={60} height={80} color="#FFF" /> 
               </View>

               <TouchableOpacity 
                 style={styles.cardItem} 
                 onPress={() => handlePress('Real Estate')}
                 activeOpacity={0.7}
               >
                  <IconRealEstate width={164} height={136} style={{marginBottom: 10}} />
               </TouchableOpacity>

               <TouchableOpacity 
                 style={styles.cardItem} 
                 onPress={() => handlePress('ETFs')}
                 activeOpacity={0.7}
               >
                  <IconEtfs width={164} height={136} style={{marginBottom: 10}} />
               </TouchableOpacity>
            </View>

            <View style={[styles.gridCol, { marginTop: 80 }]}> 
               <TouchableOpacity 
                 style={styles.cardItem} 
                 onPress={() => handlePress('Lending')}
                 activeOpacity={0.7}
               >
                  <IconLending width={164} height={136} style={{marginBottom: 10}} />
               </TouchableOpacity>

               <TouchableOpacity 
                 style={styles.cardItem} 
                 onPress={() => handlePress('Commodities')}
                 activeOpacity={0.7}
               >
                  <IconCommodities width={164} height={136} style={{marginBottom: 10}} />
               </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.cardItem} 
                  onPress={() => handlePress('Crypto')}
                  activeOpacity={0.7}
                >
                  <IconCrypto width={164} height={136} style={{marginBottom: 10}} />
               </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity style={styles.btnTextOnly} onPress={() => navigation.navigate('Login')}>
               <Text style={styles.textLinkOrange}>{t('welcome.signIn')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('SignUp')}>
               <Text style={styles.btnTextWhite}>{t('welcome.signUp')}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F3F5' },
  safeArea: { flex: 1 },
  welcomeContent: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  gridWrapper: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginTop: 10 },
  gridCol: { flex: 1, gap: 20 },
  cardItem: {
    backgroundColor: '#FFF', borderRadius: 24, padding: 10,
    alignItems: 'center', justifyContent: 'center', height: 150,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3
  },
  cardLogo: {
    backgroundColor: ORANGE_COLOR, height: 150,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24
  },
  cardText: { display: 'none' }, 
  bottomButtonsContainer: { paddingBottom: 30, paddingTop: 20, alignItems: 'center' },
  btnTextOnly: { marginBottom: 20 },
  textLinkOrange: { color: ORANGE_COLOR, fontSize: 18, fontWeight: '600' },
  btnPrimary: {
    backgroundColor: ORANGE_COLOR, width: '100%', height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: ORANGE_COLOR, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
  },
  btnTextWhite: { color: '#FFF', fontSize: 18, fontWeight: '600' },
});