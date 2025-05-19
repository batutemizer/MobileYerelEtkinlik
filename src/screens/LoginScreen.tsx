import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useColorScheme,
  Alert,
  ImageBackground,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'C:/Users/hp/Desktop/MobilEtkinlik2/src/screens/types/navigation.ts';

const BACKEND_URL = 'http://10.196.186.1:5000/api/login';

// Arka plan resmi dosyanın yolunu kendi projenin yapısına göre ayarla
const BACKGROUND_IMAGE = require('C:/Users/hp/Desktop/MobilEtkinlik2/src/img/login.jpg');

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Giriş Başarılı', `Hoş geldiniz, ${email}`);
        navigation.navigate('FirstScreen');
      } else {
        Alert.alert('Hata', data.message || 'Giriş başarısız.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Sunucuya bağlanılamıyor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background}>
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.1)' },
        ]}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#000' : '#fff'}
        />
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
          Giriş Yap
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#222' : '#eee',
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}
          placeholder="E-posta"
          placeholderTextColor={isDarkMode ? '#888' : '#666'}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#222' : '#eee',
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}
          placeholder="Şifre"
          placeholderTextColor={isDarkMode ? '#888' : '#666'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: '#555' }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Giriş Yapılıyor...' : 'Giriş'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={[
              styles.forgotPassword,
              { color: isDarkMode ? '#aaa' : '#333' },
            ]}
          >
            Şifremi unuttum?
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

export default LoginScreen;
