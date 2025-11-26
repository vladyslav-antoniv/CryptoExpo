import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ORANGE_COLOR } from '../constants/colors';

// Images
import ArrowLeft from '../images/arrow-dropdown-black.svg';
import GlobeIcon from '../images/settings/Globe.svg'; 

export default function LanguageScreen({ navigation }: any) {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };

  const renderOption = (langCode: string, label: string) => {
    const isSelected = currentLang === langCode;
    return (
      <TouchableOpacity 
        style={[styles.optionItem, isSelected ? styles.optionSelected : null]} 
        onPress={() => changeLanguage(langCode)}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <View style={[styles.iconCircle, isSelected && {backgroundColor: 'rgba(255, 125, 0, 0.1)'}]}>
              <GlobeIcon width={20} height={20} color={isSelected ? ORANGE_COLOR : '#999'} />
           </View>
           <Text style={[styles.optionText, isSelected && {color: '#000', fontFamily: 'Inter_600SemiBold'}]}>
             {label}
           </Text>
        </View>

        {isSelected ? (
          <View style={styles.checkboxSelected}>
             <Text style={{color: '#FFF', fontSize: 12, fontWeight: 'bold'}}>✓</Text>
          </View>
        ) : (
          <View style={styles.checkboxInactive} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.containerWhite}>
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft width={24} height={24} />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Language</Text>
         <View style={{width: 24}} /> 
      </View>

      <View style={styles.content}>
         {renderOption('en', 'English')}
         {renderOption('ar', 'Arabic')}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerWhite: { flex: 1, backgroundColor: '#FFF' },
  
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 10, marginBottom: 20
  },
  backBtn: { padding: 5 },
  headerTitle: { fontFamily: 'Inter_700Bold', fontSize: 20, color: '#000' },

  content: { paddingHorizontal: 24 },

  optionItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    marginBottom: 12,
    backgroundColor: '#FFF'
  },
  optionSelected: {
    borderColor: ORANGE_COLOR,
  },
  
  iconCircle: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#F9F9F9',
    alignItems: 'center', justifyContent: 'center', marginRight: 12
  },
  optionText: {
    fontFamily: 'Inter_400Regular', fontSize: 16, color: '#333'
  },

  checkboxSelected: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: ORANGE_COLOR,
    alignItems: 'center', justifyContent: 'center'
  },
  checkboxInactive: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#E5E5E5',
    backgroundColor: '#F9F9F9'
  }
});