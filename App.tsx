import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import FirstScreen from './src/screens/FirstScreen';
import ElazigScreen from './src/screens/ElazigScreen'; 
import MalatyaScreen from './src/screens/MalatyaScreen';
import KarsScreen from './src/screens/KarsScreen';
import ErzurumScreen from './src/screens/ErzurumScreen';
import VanScreen from './src/screens/VanScreen';
import HakkimizdaScreen from './src/screens/HakkimizdaScreen';

export type RootStackParamList = {
  Login: undefined;
  FirstScreen: undefined;
  ElazigScreen: undefined; 
  MalatyaScreen: undefined;
  KarsScreen: undefined;
  ErzurumScreen: undefined;
  VanScreen: undefined;
  HakkimizdaScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="ElazigScreen" component={ElazigScreen} /> 
        <Stack.Screen name="MalatyaScreen" component={MalatyaScreen} /> 
        <Stack.Screen name="KarsScreen" component={KarsScreen} /> 
        <Stack.Screen name="VanScreen" component={VanScreen} /> 
        <Stack.Screen name="ErzurumScreen" component={ErzurumScreen} />
        <Stack.Screen name="HakkimizdaScreen" component={HakkimizdaScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

