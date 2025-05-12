import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'C:/Users/hp/Desktop/MobilEtkinlik2/src/screens/types/navigation.ts'; 

type Props = NativeStackScreenProps<RootStackParamList, 'FirstScreen'>;

const cities = ['Erzurum', 'Van', 'Elazığ', 'Malatya', 'Kars'];

const FirstScreen: React.FC<Props> = ({ navigation }) => {
  const handleCityPress = (city: string) => {
    if (city === 'Elazığ') {
      navigation.navigate('ElazigScreen');
    } else if (city === 'Malatya') {
      navigation.navigate('MalatyaScreen');
    }
    else if (city === 'Kars') {
      navigation.navigate('KarsScreen');
    } 
    else if (city === 'Erzurum') {
      navigation.navigate('ErzurumScreen');
    } 
    else if (city === 'Van') {
      navigation.navigate('VanScreen');
    }

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bir Şehir Seçiniz</Text>
      {cities.map((city, index) => (
        <TouchableOpacity
          key={index}
          style={styles.cityButton}
          onPress={() => handleCityPress(city)}
        >
          <Text style={styles.cityText}>{city}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  cityButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 6,
    width: '100%',
    alignItems: 'center',
  },
  cityText: {
    color: '#fff',
    fontSize: 18,
  },
});
