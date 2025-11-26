import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ORANGE_COLOR } from '../constants/colors';

import LinkBankIcon from '../images/home/iconx64-white.svg'; 
import AddWalletIcon from '../images/home/iconx64-green.svg'; 
import ChevronRight from '../images/settings/arrow-dropdown.svg'; 
import ArrowOrange from '../images/home/arrow-dropdown-orange.svg';
import ArrowGreen from '../images/home/arrow-dropdown-green.svg';
import TestTaskImage from '../images/home/img.svg'; 
import ArrowGreenSmall from '../images/home/arrow-dropdown-green.svg';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // User
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) setUser(JSON.parse(userInfo));

    try {
      // API
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3');
      setPosts(response.data);
      await AsyncStorage.setItem('cachedPosts', JSON.stringify(response.data));
      setLoading(false);
    } catch (error) {
      // OffLine
      const cached = await AsyncStorage.getItem('cachedPosts');
      if (cached) setPosts(JSON.parse(cached));
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.orangeHeader} />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.headerInfo}>
             <Text style={styles.labelName}>{t('home.yourName')}</Text>
             <Text style={styles.userName}>
               {user ? `${user.firstName} ${user.lastName}` : 'Jhon doe'}
             </Text>
          </View>

          <View style={styles.testTaskCard}>
             <View style={styles.testTaskTextContainer}>
                <Text style={styles.cardTitleSmall}>{t('home.testTask')}</Text>
                <Text style={styles.cardSubtitle}>Lorem ipsum</Text>
                
                <TouchableOpacity style={styles.linkRow}>
                   <Text style={styles.linkText}>{t('home.goToCall')}</Text>
                   <ArrowGreenSmall width={24} height={24}/>
                </TouchableOpacity>
             </View>
             
             <View style={styles.imageBox}>
                <TestTaskImage width={80} height={80} style={{ borderRadius: 15 }} /> 
             </View>
          </View>

          <Text style={styles.sectionTitle}>{t('home.beforeStart')}</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.horizontalScroll}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 10 }}
          >
             <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#4E4E4E' }]}>
                <View style={styles.cardTop}>
                    <View style={styles.iconCircle}>
                       <LinkBankIcon width={48} height={48} />
                    </View>
                    <Text style={styles.actionTitle}>{t('home.linkBank')}</Text>
                </View>
                
                <View style={styles.actionFooter}>
                     <Text style={styles.actionSteps}>{t('home.steps2')}</Text>
                     <ChevronRight width={24} height={24} />
                </View>
             </TouchableOpacity>

             <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#FF6B6B' }]}>
                <View style={styles.cardTop}>
                    <View style={styles.iconCircle}>
                       <AddWalletIcon width={48} height={48} />
                    </View>
                    <Text style={styles.actionTitle}>{t('home.addWallet')}</Text>
                </View>

                <View style={styles.actionFooter}>
                     <Text style={styles.actionSteps}>{t('home.steps3')}</Text>
                     <ChevronRight width={24} height={24} />
                </View>
             </TouchableOpacity>
          </ScrollView>

          <Text style={styles.sectionTitle}>{t('home.posts')}</Text>
          
          {loading ? (
            <ActivityIndicator color={ORANGE_COLOR} style={{ marginTop: 20 }} />
          ) : (
            posts.map((post) => (
              <TouchableOpacity 
                key={post.id} 
                style={styles.postCard}
                onPress={() => navigation.navigate('PostDetails', { postId: post.id })}
              >
                  <Text style={styles.postTitle} numberOfLines={1}>
                    {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                  </Text>
                  <Text style={styles.postBody} numberOfLines={3}>
                    {post.body.charAt(0).toUpperCase() + post.body.slice(1)}
                  </Text>
              </TouchableOpacity>
            ))
          )}

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  
  orangeHeader: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 260, 
    backgroundColor: ORANGE_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  scrollContent: { paddingTop: 10 },

  headerInfo: { alignItems: 'center', marginTop: 20, marginBottom: 20 },
  labelName: { fontFamily: 'Inter_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 5 },
  userName: { fontFamily: 'Inter_700Bold', fontSize: 30, color: '#FFF' },

  testTaskCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 8
  },
  testTaskTextContainer: { flex: 1, paddingRight: 10, justifyContent: 'center' },
  cardTitleSmall: { fontFamily: 'Inter_700Bold', fontSize: 16, color: '#000', marginBottom: 4 },
  cardSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#999', marginBottom: 15 },
  linkRow: { flexDirection: 'row', alignItems: 'center' },
  linkText: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: '#00C4B4', marginRight: 46 },
  imageBox: { width: 80, height: 80, borderRadius: 15, overflow: 'hidden' },

  sectionTitle: { 
    fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#666', 
    marginLeft: 24, marginBottom: 15 
  },

  horizontalScroll: { marginHorizontal: -0, marginBottom: 20 },
  
  actionCard: {
    width: 160, height: 160, borderRadius: 24, padding: 20, marginRight: 15,
    justifyContent: 'space-between'
  },
  cardTop: { alignItems: 'flex-start' },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24, 
    backgroundColor: ORANGE_COLOR, 
    justifyContent: 'center', alignItems: 'center', marginBottom: 15
  },
  actionTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#FFF', lineHeight: 20 },
  actionFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actionSteps: { fontFamily: 'Inter_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.6)' },

  postCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    marginBottom: 15,
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2
  },
  postTitle: { fontFamily: 'Inter_700Bold', fontSize: 17, color: '#000', marginBottom: 8 },
  postBody: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#666', lineHeight: 20 },
});