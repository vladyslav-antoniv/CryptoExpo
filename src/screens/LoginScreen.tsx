import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'; // <--- IMPORT
import { ORANGE_COLOR } from '../constants/colors';

import BgLogin from '../images/signUp_login/bg.svg';
import UserIconGreen from '../images/signUp_login/img.svg'; 
import EyeIcon from '../images/password/Eye.svg';
import EyeActiveIcon from '../images/password/Eye (1).svg';
import ArrowLeft from '../images/arrow-dropdown-black.svg'; 
import InfoIcon from '../images/signUp_login/Info.svg';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
  const { t } = useTranslation(); // <--- HOOK
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
        username: 'emilys', 
        password: 'emilyspass' 
    }
  });
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: data.username, 
        password: data.password,
      });

      const { token, firstName, lastName, image } = response.data;
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify({ firstName, lastName, image }));

      setIsLoading(false);
      navigation.navigate('PinCode');

    } catch (error) {
      setIsLoading(false);
      console.error(error);
      Alert.alert(t('auth.loginError'), "Invalid username or password.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <View style={{ position: 'absolute', top: 0, width: width, height: height }}>
          <BgLogin width={width} height={height} preserveAspectRatio="xMidYMid slice" />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.navHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <ArrowLeft width={24} height={24} />
            </TouchableOpacity>
        </View>

        <View style={{ height: 48 }} /> 

        <View style={{ flex: 1 }}>
            <View style={styles.authCard}>
              <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ flexGrow: 1 }} 
                bounces={false}
              >
                
                <View style={styles.authHeaderRow}>
                    <View style={styles.userIconContainer}>
                      <UserIconGreen width={50} height={50} />
                    </View>
                    <View>
                      <Text style={styles.authTitle}>{t('auth.signInTitle')}</Text>
                      <Text style={styles.authSubtitle}>{t('auth.personalAccount')}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.label}>{t('auth.email')}</Text>
                <Controller 
                  control={control} 
                  name="username"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <View style={[styles.inputContainer, errors.username && styles.inputError]}>
                      <TextInput 
                        style={styles.inputNoBorder} 
                        placeholder={t('auth.emailPlaceholder')} 
                        placeholderTextColor="#999" 
                        onChangeText={onChange} 
                        value={value} 
                        autoCapitalize="none"
                      />
                      {errors.username && <InfoIcon width={24} height={24} />}
                    </View>
                  )}
                />

                <Text style={styles.label}>{t('auth.password')}</Text>
                <Controller 
                  control={control} 
                  name="password"
                  rules={{ required: true, minLength: 6 }}
                  render={({ field: { onChange, value } }) => (
                    <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                      <TextInput 
                        style={styles.inputNoBorder} 
                        placeholder="••••••••" 
                        placeholderTextColor="#999" 
                        secureTextEntry={!showPass} 
                        onChangeText={onChange}
                        value={value}
                      />
                      <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                          {showPass ? <EyeIcon width={24} height={24} /> : <EyeActiveIcon width={24} height={24} />}
                      </TouchableOpacity>
                    </View>
                  )}
                />
                
                <View style={styles.bottomButtonContainer}>
                  <TouchableOpacity 
                    style={styles.btnPrimary} 
                    onPress={handleSubmit(onSignIn)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <Text style={styles.btnTextWhite}>{t('auth.signInTitle')}</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={{ marginTop: 20, alignItems: 'center' }} 
                    onPress={() => navigation.navigate('SignUp')}
                  >
                      <Text style={{ color: ORANGE_COLOR, fontFamily: 'Inter_600SemiBold', fontSize: 16 }}>
                        {t('auth.createAccount')}
                      </Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>
            </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  navHeader: { 
    paddingHorizontal: 20, 
    marginTop: Platform.OS === 'android' ? 40 : 60,
  },
  backBtn: {
    width: 40, height: 40, justifyContent: 'center'
  },
  authCard: {
    flex: 1, 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    paddingHorizontal: 24, 
    paddingTop: 30, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -10 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 20, 
    elevation: 15 
  },
  authHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 }, 
  userIconContainer: { marginRight: 15 },
  
  authTitle: { 
    fontFamily: 'Inter_500Medium', 
    fontSize: 22, 
    color: '#000' 
  },
  authSubtitle: { 
    fontFamily: 'Inter_400Regular', 
    fontSize: 15, 
    color: '#606773',
    lineHeight: 24 
  },
  
  divider: {
    width: "100%", height: 1, backgroundColor: '#EBEFF5', marginBottom: 25,
  },

  label: { 
    fontFamily: 'Inter_400Regular', 
    fontSize: 15, 
    lineHeight: 24,
    color: '#606773', 
    marginBottom: 8, 
    marginLeft: 4 
  },
  
  inputContainer: {
    height: 52, 
    borderWidth: 1, 
    borderColor: '#E5E5E5', 
    borderRadius: 16,
    paddingHorizontal: 16, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 24,
    backgroundColor: '#FFF'
  },
  inputError: {
    borderColor: '#FF3B30'
  },
  inputNoBorder: { 
    flex: 1, 
    height: 50, 
    fontFamily: 'Inter_400Regular', 
    fontSize: 15, 
    color: '#000' 
  },
  
  bottomButtonContainer: {
    marginTop: 'auto', marginBottom: 30,
  },
  btnPrimary: {
    backgroundColor: ORANGE_COLOR, width: '100%', height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: ORANGE_COLOR, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
  },
  btnTextWhite: { 
    fontFamily: 'Inter_600SemiBold', 
    fontSize: 18, 
    color: '#FFF' 
  },
});