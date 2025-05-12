
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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'C:/Users/hp/Desktop/MobilEtkinlik2/src/screens/types/navigation.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
    } else {
      Alert.alert('Giriş Başarılı', `Hoş geldin, ${email}`);
      navigation.navigate('FirstScreen');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#fff' },
      ]}>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={[
            styles.forgotPassword,
            { color: isDarkMode ? '#aaa' : '#333' },
          ]}>
          Şifremi unuttum?
        </Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
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
