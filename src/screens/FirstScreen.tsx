import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'C:/Users/hp/Desktop/MobilEtkinlik2/src/screens/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'FirstScreen'>;

const cities = ['Erzurum', 'Van', 'Elazığ', 'Malatya', 'Kars'];

const FirstScreen: React.FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredCities([]);
      setDropdownVisible(false);
    } else {
      const results = cities.filter((city) =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(results);
      setDropdownVisible(true);
    }
  };

  const handleCitySelect = (city: string) => {
    setSearchText(city);
    setDropdownVisible(false);
    switch (city) {
      case 'Elazığ':
        navigation.navigate('ElazigScreen');
        break;
      case 'Malatya':
        navigation.navigate('MalatyaScreen');
        break;
      case 'Kars':
        navigation.navigate('KarsScreen');
        break;
      case 'Erzurum':
        navigation.navigate('ErzurumScreen');
        break;
      case 'Van':
        navigation.navigate('VanScreen');
        break;
    }
  };

  const handleAboutPress = () => {
    navigation.navigate('HakkimizdaScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('C:/Users/hp/Desktop/MobilEtkinlik2/src/img/mobilbackground.jpeg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Şehrini Seç</Text>

          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Şehir adı giriniz..."
              value={searchText}
              onChangeText={handleSearch}
              placeholderTextColor="#ccc"
            />
          </View>

          {dropdownVisible && filteredCities.length > 0 && (
            <FlatList
              style={styles.dropdown}
              data={filteredCities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleCitySelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          <TouchableOpacity
            style={styles.aboutButton}
            onPress={handleAboutPress}
          >
            <Icon name="information-circle-outline" size={22} color="#fff" />
            <Text style={styles.aboutButtonText}>Hakkımda</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default FirstScreen;
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
    elevation: 5,
    maxHeight: 180,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  aboutButton: {
    marginTop: 40,
    flexDirection: 'row',
    backgroundColor: '#d11a2a',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 8,
    elevation: 6,
  },
  aboutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
