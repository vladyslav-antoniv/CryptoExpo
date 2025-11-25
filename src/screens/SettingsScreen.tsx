import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ORANGE_COLOR } from '../constants/colors';

import GlobeIcon from '../images/settings/Globe.svg';
import LogoutIcon from '../images/settings/2.svg';
import ChevronRight from '../images/settings/arrow-dropdown.svg';

export default function SettingsScreen({ navigation }: any) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        AsyncStorage.getItem('userInfo').then(info => {
            if (info) setUser(JSON.parse(info));
        });
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.clear();
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    return (
        <SafeAreaView style={styles.containerWhite}>
            <View style={{padding: 24}}>
                <Text style={styles.headerTitle}>Settings</Text>
                
                <View style={styles.profileCard}>
                    <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#EEE', marginRight: 15, overflow: 'hidden'}}>
                        {user?.image && <Image source={{uri: user.image}} style={{width: 40, height: 40}} />}
                    </View>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>
                        {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
                    </Text>
                </View>

                <Text style={{color: '#999', fontSize: 12, marginTop: 20, marginBottom: 10}}>Basic</Text>
                <TouchableOpacity style={styles.settingRow}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <GlobeIcon /><Text style={{marginLeft: 10, fontSize: 16}}>Language</Text>
                    </View>
                    <ChevronRight />
                </TouchableOpacity>

                <Text style={{color: '#999', fontSize: 12, marginTop: 20, marginBottom: 10}}>Other</Text>
                <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <LogoutIcon /><Text style={{marginLeft: 10, fontSize: 16, color: ORANGE_COLOR}}>Log Out</Text>
                    </View>
                    <ChevronRight />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  containerWhite: { flex: 1, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  profileCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', marginBottom: 10 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', marginBottom: 10 }
});