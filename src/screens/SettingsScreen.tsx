import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'; 
import { ORANGE_COLOR } from '../constants/colors';

import GlobeIcon from '../images/settings/Globe.svg';
import LogoutIcon from '../images/settings/2.svg';
import ChevronRight from '../images/settings/arrow-dropdown.svg';

const { width } = Dimensions.get('window');

export default function SettingsScreen({ navigation }: any) {
    const { t } = useTranslation(); 
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        AsyncStorage.getItem('userInfo').then(info => {
            if (info) setUser(JSON.parse(info));
        });
    }, []);

    const handleLogoutPress = () => {
        navigation.navigate('PinCode', { isLogout: true });
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.contentContainer}>
                    
                    <Text style={styles.headerTitle}>{t('settings.title')}</Text>
                    
                    <View style={styles.profileCard}>
                        <View style={styles.avatarBox}>
                            {user?.image && <Image source={{uri: user.image}} style={{width: 40, height: 40}} />}
                        </View>
                        <Text style={styles.profileName}>
                            {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
                        </Text>
                    </View>

                    <Text style={styles.sectionHeader}>{t('settings.basic')}</Text>
                    <View style={styles.settingsGroup}>
                        <TouchableOpacity 
                            style={styles.settingRow} 
                            onPress={() => navigation.navigate('Language')}
                        >
                            <View style={styles.rowLeft}>
                                <GlobeIcon width={24} height={24} />
                                <Text style={styles.settingText}>{t('settings.language')}</Text>
                            </View>
                            <ChevronRight width={14} height={14} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionHeader}>{t('settings.other')}</Text>
                    <View style={styles.settingsGroup}>
                        <TouchableOpacity 
                            style={[styles.settingRow, { borderBottomWidth: 0 }]} 
                            onPress={handleLogoutPress} 
                        >
                            <View style={styles.rowLeft}>
                                <LogoutIcon width={24} height={24} />
                                <Text style={[styles.settingText, { color: ORANGE_COLOR }]}>{t('settings.logout')}</Text>
                            </View>
                            <ChevronRight width={14} height={14} />
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
  contentContainer: { 
    paddingHorizontal: 24, 
    paddingTop: 20 
  },
  headerTitle: { 
    fontFamily: 'Inter_700Bold', 
    fontSize: 30, 
    marginBottom: 30, 
    color: '#000' 
  },
  profileCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2
  },
  avatarBox: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5', 
    marginRight: 15, overflow: 'hidden', justifyContent: 'center', alignItems: 'center'
  },
  profileName: { 
    fontFamily: 'Inter_600SemiBold', 
    fontSize: 16, 
    color: '#000' 
  },
  sectionHeader: { 
    fontFamily: 'Inter_400Regular', 
    fontSize: 12, 
    color: '#999', 
    marginTop: 10, 
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  settingsGroup: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2
  },
  settingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 16, 
  },
  rowLeft: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  settingText: { 
    fontFamily: 'Inter_500Medium', 
    fontSize: 16, 
    marginLeft: 15, 
    color: '#000' 
  }
});