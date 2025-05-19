import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HakkimizdaScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.photoPlaceholder}>
          <Image
            source={require('C:/Users/hp/Desktop/MobilEtkinlik2/src/img/ben.jpeg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.intro}>
          <Text style={styles.title}>Merhaba, ben Batuhan TEMİZER</Text>
          <Text style={styles.paragraph}>
            Bu platformu, şehirlerdeki etkinlikleri daha görünür hale getirmek ve insanların kültürel yaşama daha kolay erişmesini sağlamak amacıyla kurdum. Teknolojiyle sanatı, eğlenceyi ve bilgilendirici etkinlikleri bir araya getiriyoruz.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>İletişim</Text>
        <Text style={styles.contactText}>📧 E-posta: <Text style={styles.link} onPress={() => Linking.openURL('mailto:temizerbatu@gmail.com')}>temizerbatu@gmail.com</Text></Text>
        <Text style={styles.contactText}>📞 Telefon: +90 552 264 1898</Text>
        <Text style={styles.contactText}>📍 Adres: Elazığ, Türkiye</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sosyal Medya</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/batutemizer')}>
            <Icon name="instagram" size={28} color="#4b6cb7" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/batuhan-temizer-47a7b726a/')}>
            <Icon name="linkedin" size={28} color="#4b6cb7" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/batutemizer')}>
            <Icon name="github" size={28} color="#4b6cb7" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HakkimizdaScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 32,
    alignItems: 'center',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4b6cb7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden', // Resmin yuvarlak görünmesi için önemli
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  intro: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    borderBottomWidth: 2,
    borderBottomColor: '#4b6cb7',
    paddingBottom: 4,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  contactText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  link: {
    color: '#4b6cb7',
    textDecorationLine: 'underline',
  },
  socialIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 20,
  },
});
