import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from './src/screens/LoginScreen';
import FirstScreen from './src/screens/FirstScreen';
import ElazigScreen from './src/screens/ElazigScreen';
import MalatyaScreen from './src/screens/MalatyaScreen';
import VanScreen from './src/screens/VanScreen';
import ErzurumScreen from './src/screens/ErzurumScreen';
import KarsScreen from './src/screens/KarsScreen';
import IstanbulScreen from './src/screens/IstanbulScreen';
import AnkaraScreen from './src/screens/AnkaraScreen';
import IzmirScreen from './src/screens/IzmirScreen';
import { RootStackParamList } from './src/screens/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'location-city';
          if (route.name === 'Elazığ') {
            iconName = 'location-city';
          } else if (route.name === 'Malatya') {
            iconName = 'place';
          } else if (route.name === 'Van') {
            iconName = 'landscape';
          } else if (route.name === 'Erzurum') {
            iconName = 'terrain';
          } else if (route.name === 'Kars') {
            iconName = 'apartment';
          } else if (route.name === 'İstanbul') {
            iconName = 'location-on';
          } else if (route.name === 'İzmir') {
            iconName = 'location-on';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4b6cb7',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#4b6cb7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Elazığ" 
        component={ElazigScreen}
        options={{
          title: 'Elazığ Etkinlikleri'
        }}
      />
      <Tab.Screen 
        name="Malatya" 
        component={MalatyaScreen}
        options={{
          title: 'Malatya Etkinlikleri'
        }}
      />
      <Tab.Screen 
        name="Van" 
        component={VanScreen}
        options={{
          title: 'Van Etkinlikleri'
        }}
      />
      <Tab.Screen 
        name="Erzurum" 
        component={ErzurumScreen}
        options={{
          title: 'Erzurum Etkinlikleri'
        }}
      />
      <Tab.Screen 
        name="Kars" 
        component={KarsScreen}
        options={{
          title: 'Kars Etkinlikleri'
        }}
      />
      <Tab.Screen 
        name="İstanbul" 
        component={IstanbulScreen}
        options={{
          title: 'İstanbul Etkinlikleri'
        }}
      />
      <Tab.Screen
        name="İzmir"
        component={IzmirScreen}
        options={{
          title: 'İzmir Etkinlikleri',
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

