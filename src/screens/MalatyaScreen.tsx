import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

type Event = {
  id: string;
  category: string;
  image: string;
  title: string;
  date: string;
  desc: string;
  detailsTitle: string;
  detailsDesc: string;
  detailsList: string[];
};

const eventsData: Event[] = [
  {
    id: 'konser1',
    category: 'Konserler',
    image: 'https://www.biletwise.com/uploads/category/big/1621113836.jpg',
    title: 'Haluk Levent - Malatya Açıkhava Konseri',
    date: '30 Mayıs 2025, 20:30 - Malatya Kongre ve Kültür Merkezi',
    desc: 'Rock müziğin efsanesi Haluk Levent Malatya’da sahnede!',
    detailsTitle: '🎸 Unutulmaz Haluk Levent Gecesi',
    detailsDesc:
      'Yılların eskitemediği parçalar eşliğinde duygusal ve enerjik bir konser.',
    detailsList: [
      '🎤 Canlı performans',
      '🌃 Açık hava atmosferi',
      '🎫 Biletler hızla tükeniyor!',
    ],
  },
  // İstersen buraya başka etkinlikler ekleyebilirsin
];

const MalatyaScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

  const handleToggleDetails = (id: string) => {
    setOpenDetailsId(prev => (prev === id ? null : id));
  };

  // Arama ile filtreleme
  const filteredEvents = eventsData.filter(event =>
    (
      event.title +
      event.date +
      event.desc +
      event.detailsTitle +
      event.detailsDesc +
      event.detailsList.join(' ')
    )
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Kategoriler (örneğin sadece Konserler var burada)
  const categories = Array.from(new Set(eventsData.map(e => e.category)));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Malatya Etkinlikleri</Text>
        <Text style={styles.headerSubtitle}>
          Anadolu’nun kalbinde kültür, sanat ve müzik bir arada!
        </Text>
      </View>

      <TextInput
        placeholder="Etkinlik ara..."
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {categories.map(category => (
        <View key={category} style={{ marginBottom: 30 }}>
          <Text style={styles.sectionTitle}>
            {category === 'Konserler' ? '🎤 Konserler' : category}
          </Text>

          <FlatList
            data={filteredEvents.filter(e => e.category === category)}
            keyExtractor={item => item.id}
            scrollEnabled={false} // ScrollView zaten var
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDate}>{item.date}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>

                  <TouchableOpacity
                    onPress={() => handleToggleDetails(item.id)}
                    style={[
                      styles.button,
                      openDetailsId === item.id && styles.buttonToggle,
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.buttonText}>
                      {openDetailsId === item.id ? 'Detayları Gizle ⬅️' : 'Detayları Gör ➡️'}
                    </Text>
                  </TouchableOpacity>

                  {openDetailsId === item.id && (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>{item.detailsTitle}</Text>
                      <Text style={styles.detailsDesc}>{item.detailsDesc}</Text>
                      {item.detailsList.map((detail, index) => (
                        <Text key={index} style={styles.detailsListItem}>
                          • {detail}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            )}
          />
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 Malatya Etkinlikleri. Tüm hakları saklıdır.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  header: {
    backgroundColor: '#0d6efd',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 6,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: 'white',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    borderLeftWidth: 6,
    borderLeftColor: '#0d6efd',
    paddingLeft: 12,
    marginBottom: 12,
    color: '#0d6efd',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginBottom: 18,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#212529',
  },
  cardDate: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 15,
    color: '#444',
  },
  button: {
    marginTop: 14,
    backgroundColor: '#0d6efd',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
  },
  buttonToggle: {
    backgroundColor: '#6610f2',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  details: {
    marginTop: 14,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 12,
  },
  detailsTitle: {
    fontSize: 18,
    color: '#0d6efd',
    fontWeight: '700',
    marginBottom: 8,
  },
  detailsDesc: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  detailsListItem: {
    fontSize: 15,
    color: '#333',
    marginBottom: 2,
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#6c757d',
  },
});

export default MalatyaScreen;
