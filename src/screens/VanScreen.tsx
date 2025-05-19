import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
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
    title: 'Mor ve Ötesi - Van Konseri',
    date: '18 Mayıs 2025, 21:00 - Van Kültür Merkezi',
    desc: 'Alternatif rock müziğin efsane grubu Van’da sahnede!',
    detailsTitle: '🎸 Mor ve Ötesi ile Geceye Ritim Katın 🎶',
    detailsDesc: 'Mor ve Ötesi konseriyle Van’da müzik dolu bir akşam sizi bekliyor!',
    detailsList: [
      '🎵 En sevilen parçalar sahnede!',
      '🔥 Coşkulu bir atmosfer!',
      '🎫 Sınırlı sayıda bilet!',
    ],
  },
  {
    id: 'tiyatro1',
    category: 'Tiyatrolar',
    image:
      'https://www.sakm.net/images/slider/sakm-tiyatro-banner-2023-aralik.jpeg',
    title: 'Deli - Komedi Oyunu',
    date: '20 Mayıs 2025, 20:30 - Van Devlet Tiyatrosu',
    desc: 'Bir adamın çılgın hikayesi sizi kahkahalara boğacak.',
    detailsTitle: '🎭 “Deli” ile Hem Güldüren Hem Düşündüren Sahne!',
    detailsDesc:
      'Hayatın absürtlüklerini mizahla ele alan eşsiz bir tiyatro deneyimi.',
    detailsList: [
      '😂 Bol kahkahalı sahneler!',
      '🧠 İnce göndermeler ve toplumsal eleştiriler!',
      '🎟️ Herkese hitap eden bir oyun!',
    ],
  },
  {
    id: 'soylesi1',
    category: 'Söyleşiler',
    image: 'https://sahnedragos.com/assets/img/SG-hakkimizda-2.jpg',
    title: 'Gençlerle Gelecek Üzerine',
    date: '22 Mayıs 2025, 17:00 - Van Yüzüncü Yıl Üniversitesi',
    desc:
      'Doç. Dr. Ayşe Korkmaz ile kariyer ve gelecek planları üzerine interaktif sohbet.',
    detailsTitle: '👩‍🏫 Gençlerle İlham Verici Bir Buluşma',
    detailsDesc:
      'Kariyer, gelecek ve yaşam üzerine keyifli ve yönlendirici bir söyleşi.',
    detailsList: [
      '📌 Motivasyon ve hedef belirleme!',
      '🎓 Akademik ve kişisel gelişim üzerine tavsiyeler!',
      '💬 Katılımcı sorularına interaktif cevaplar!',
    ],
  },
];

const VanScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

  const handleToggleDetails = (id: string) => {
    setOpenDetailsId(prev => (prev === id ? null : id));
  };

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

  const categories = Array.from(new Set(eventsData.map(e => e.category)));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Van Etkinlikleri</Text>
        <Text style={styles.headerSubtitle}>
          Doğunun incisi Van’da kültür ve sanat bir arada!
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
            {category === 'Konserler'
              ? '🎤 Konserler'
              : category === 'Tiyatrolar'
              ? '🎭 Tiyatrolar'
              : '🗣️ Söyleşiler'}
          </Text>

          <FlatList
            data={filteredEvents.filter(e => e.category === category)}
            keyExtractor={item => item.id}
            scrollEnabled={false}
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
                      {openDetailsId === item.id
                        ? 'Detayları Gizle ⬅️'
                        : 'Detayları Gör ➡️'}
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
        <Text style={styles.footerText}>© 2025 Van Etkinlikleri. Tüm hakları saklıdır.</Text>
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
    backgroundColor: '#6c63ff',
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
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    borderLeftWidth: 6,
    borderLeftColor: '#6c63ff',
    paddingLeft: 12,
    marginBottom: 12,
    color: '#6c63ff',
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
    backgroundColor: '#6c63ff',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
  },
  buttonToggle: {
    backgroundColor: '#584ee0',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  details: {
    marginTop: 14,
    backgroundColor: '#f9f3fe',
    borderRadius: 8,
    padding: 12,
  },
  detailsTitle: {
    fontSize: 18,
    color: '#6c63ff',
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
    color: '#555',
    marginBottom: 2,
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
    marginTop
      : 30,
      },
footerText: {
fontSize: 14,
color: '#999',
},
});

export default VanScreen;