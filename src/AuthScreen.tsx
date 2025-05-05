import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


import { RootStackParamList } from '../App'; 



type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

interface AuthScreenProps {
  navigation: AuthScreenNavigationProp;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const handleLoginPress = () => {
    console.log('Giriş Yap butonuna tıklandı');
    navigation.navigate('Home'); 
  };

  const handleSignUpPress = () => {
    console.log('Kayıt Ol butonuna tıklandı');
   
  };

  return (
    <ImageBackground
      source={require('../assets/mobil2.jpeg')}  
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Hoşgeldiniz!</Text>
        <Text style={styles.subtitle}>Hesabınıza giriş yapın ya da yeni bir hesap oluşturun.</Text>

        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUpPress}>
          <Text style={[styles.buttonText, styles.signUpText]}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(23, 22, 53, 0.6)', 
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  signUpButton: {
    backgroundColor: '#ff6600',
  },
  signUpText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default AuthScreen;
