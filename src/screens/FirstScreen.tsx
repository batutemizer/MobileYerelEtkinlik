import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CityType = {
  name: string;
  tabName: string;
  color: string;
  gradient: string[];
  icon: string;
};

const { width } = Dimensions.get('window');

const FirstScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const cities: CityType[] = [
    {
      name: 'Elazığ',
      tabName: 'Elazığ',
      color: '#4CAF50',
      gradient: ['#4CAF50', '#45a049'],
      icon: 'location-on'
    },
    {
      name: 'Malatya',
      tabName: 'Malatya',
      color: '#2196F3',
      gradient: ['#2196F3', '#1976D2'],
      icon: 'location-on'
    },
    {
      name: 'Van',
      tabName: 'Van',
      color: '#9C27B0',
      gradient: ['#9C27B0', '#7B1FA2'],
      icon: 'location-on'
    },
    {
      name: 'Erzurum',
      tabName: 'Erzurum',
      color: '#FF5722',
      gradient: ['#FF5722', '#E64A19'],
      icon: 'location-on'
    },
    {
      name: 'Kars',
      tabName: 'Kars',
      color: '#795548',
      gradient: ['#795548', '#5D4037'],
      icon: 'location-on'
    },
    {
      name: 'İstanbul',
      tabName: 'İstanbul',
      color: '#1cb5e0',
      gradient: ['#1cb5e0', '#000046'],
      icon: 'location-on'
    },
    {
      name: 'Ankara',
      tabName: 'Ankara',
      color: '#FFC107',
      gradient: ['#FFC107', '#FFA000'],
      icon: 'location-on'
    },
    {
      name: 'İzmir',
      tabName: 'İzmir',
      color: '#E91E63',
      gradient: ['#E91E63', '#C2185B'],
      icon: 'location-on'
    }
  ];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCityPress = (tabName: string) => {
    navigation.navigate('MainTabs', { screen: tabName });
  };

  return (
    <ImageBackground
      source={require('../img/mobilbackground.jpeg')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Doğu Anadolu'nun En Büyük Etkinlik Platformu</Text>
            <Text style={styles.subtitle}>
              Şehrinizdeki tüm etkinliklerden haberdar olun
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Şehir ara..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                <Icon name="close" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.citiesContainer}>
          {filteredCities.map((city, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cityCard}
              onPress={() => handleCityPress(city.tabName)}
            >
              <LinearGradient
                colors={city.gradient}
                style={styles.cityGradient}
              >
                <Icon name={city.icon} size={40} color="#fff" style={styles.cityIcon} />
                <Text style={styles.cityName}>{city.name}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  searchContainer: {
    padding: 15,
    paddingTop: 0,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  citiesContainer: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cityCard: {
    width: width * 0.43,
    height: 180,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cityGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  cityIcon: {
    marginBottom: 10,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
});

export default FirstScreen;
