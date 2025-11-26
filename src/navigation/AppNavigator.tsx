import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ORANGE_COLOR } from '../constants/colors';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import PinCodeScreen from '../screens/PinCodeScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import LanguageScreen from '../screens/LanguageScreen';

import HomeIcon from '../images/menu/item 1.svg';
import HomeActive from '../images/menu/item 1-active.svg';
import PortfolioIcon from '../images/menu/item 2.svg';
import SearchIcon from '../images/menu/item 3.svg';
import ProfileIcon from '../images/menu/item 4.svg';
import ProfileActive from '../images/menu/item 4-active.svg';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const { t, i18n } = useTranslation();

  return (
    <Tab.Navigator 
      key={i18n.language} 
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: ORANGE_COLOR, 
        tabBarInactiveTintColor: '#999', 
        tabBarStyle: { 
            height: 80, 
            paddingBottom: 20, 
            paddingTop: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20, 
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#FFF',
            borderTopWidth: 0,
            shadowColor: '#000', shadowOffset: {width: 0, height: -2}, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10
        },
        tabBarLabelStyle: {
            fontFamily: 'Inter_500Medium',
            fontSize: 12,
            marginTop: 5
        }
    }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
            tabBarLabel: t('tabs.home'), 
            tabBarIcon: ({focused}) => focused ? <HomeActive width={24} height={24}/> : <HomeIcon width={24} height={24}/> 
        }} 
      />
      <Tab.Screen 
        name="Portfolio" 
        component={HomeScreen} 
        options={{ 
            tabBarLabel: t('tabs.portfolio'),
            tabBarIcon: () => <PortfolioIcon width={24} height={24}/> 
        }} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
            tabBarLabel: t('search.title'), 
            tabBarIcon: () => <SearchIcon width={24} height={24}/> 
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={SettingsScreen} 
        options={{ 
            tabBarLabel: t('tabs.profile'),
            tabBarIcon: ({focused}) => focused ? <ProfileActive width={24} height={24}/> : <ProfileIcon width={24} height={24}/> 
        }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PinCode" component={PinCodeScreen} />
        
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} /> 
    </Stack.Navigator>
  );
}