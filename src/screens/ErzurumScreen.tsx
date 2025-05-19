import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

// Event tipi tanımı
interface Event {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  detailsTitle: string;
  detailsText: string;
  detailsList: string[];
  image: string;
}

// Örnek etkinlik verisi
const events: Event[] = [
  {
    id: 'konser1',
    category: 'Konserler',
    title: 'Mor ve Ötesi - Erzurum Konseri',
    date: '24 Mayıs 2025, 20:00 - Erzurum Kültür Merkezi',
    description: 'Alternatif rock müzik Erzurum’da yankılanıyor!',
    detailsTitle: '🎸 Mor ve Ötesi ile Rock Gecesi',
    detailsText: 'Unutulmaz şarkılar ve müzik dolu bir gece sizi bekliyor.',
    detailsList: [
      '🎵 Hit parçalar sahnede',
      '🔥 Muhteşem sahne ışıkları',
      '🎫 Biletler tükenmeden alın!',
    ],
    image: 'https://www.biletwise.com/uploads/category/big/1621113836.jpg',
  },
  {
    id: 'tiyatro1',
    category: 'Tiyatrolar',
    title: 'Deli - Komedi Oyunu',
    date: '26 Mayıs 2025, 20:00 - Erzurum Devlet Tiyatrosu',
    description: 'Erzurum’da kahkaha tufanı sizi bekliyor.',
    detailsTitle: '🎭 Delilikle Mizahın Buluşması',
    detailsText: 'Gülmek garanti! Toplumsal hicivle dolu bir gösteri.',
    detailsList: [
      '😂 Komik ve düşündürücü sahneler',
      '🎟️ Geniş oyuncu kadrosu',
      '📍 Erzurum sahnesinde canlı!',
    ],
    image: 'https://www.sakm.net/images/slider/sakm-tiyatro-banner-2023-aralik.jpeg',
  },
  {
    id: 'soylesi1',
    category: 'Söyleşiler',
    title: 'Gençlerle Gelecek Üzerine',
    date: '28 Mayıs 2025, 16:30 - Atatürk Üniversitesi Konferans Salonu',
    description: 'Geleceğe dair ilham verici bir söyleşi Erzurum’da.',
    detailsTitle: '🧠 İlham Veren Konuşmalıar',
    detailsText:
      'Gençler için kariyer ve hedef belirleme üzerine interaktif sohbet.',
    detailsList: [
      '🎯 Hedefe ulaşmanın yolları',
      '💬 Katılımcı etkileşimi',
      '🎓 Üniversite öğrencilerine özel',
    ],
    image: 'https://sahnedragos.com/assets/img/SG-hakkimizda-2.jpg',
  },
];

const ErzurumScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [expandedEventIds, setExpandedEventIds] = useState<string[]>([]);

  const filteredEvents = events.filter((event) => {
    const keyword = searchText.toLowerCase();
    return (
      event.title.toLowerCase().includes(keyword) ||
      event.description.toLowerCase().includes(keyword) ||
      event.category.toLowerCase().includes(keyword)
    );
  });

  const categories = Array.from(new Set(filteredEvents.map((e) => e.category)));

  const toggleDetails = (id: string) => {
    setExpandedEventIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Erzurum Etkinlikleri</Text>
        <Text style={styles.headerSubtitle}>
          Doğu’nun kültür başkentinde sanat sizi bekliyor!
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Etkinlik ara..."
        value={searchText}
        onChangeText={setSearchText}
        clearButtonMode="while-editing"
        placeholderTextColor="#888"
      />

      {categories.map((category) => (
        <View key={category} style={styles.section}>
          <Text style={styles.sectionTitle}>
            {category === 'Konserler'
              ? '🎤 '
              : category === 'Tiyatrolar'
              ? '🎭 '
              : '🗣️ '}
            {category}
          </Text>

          {filteredEvents
            .filter((event) => event.category === category)
            .map((event) => (
              <View key={event.id} style={styles.card}>
                <Image source={{ uri: event.image }} style={styles.cardImage} />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{event.title}</Text>
                  <Text style={styles.cardDate}>{event.date}</Text>
                  <Text style={styles.cardDescription}>{event.description}</Text>

                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => toggleDetails(event.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.detailButtonText}>
                      {expandedEventIds.includes(event.id)
                        ? 'Detayları Gizle ⬅️'
                        : 'Detayları Gör ➡️'}
                    </Text>
                  </TouchableOpacity>

                  {expandedEventIds.includes(event.id) && (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>{event.detailsTitle}</Text>
                      <Text style={styles.detailsText}>{event.detailsText}</Text>
                      {event.detailsList.map((item, index) => (
                        <Text key={index} style={styles.detailsListItem}>
                          • {item}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ))}
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 Erzurum Etkinlikleri. Tüm hakları saklıdır.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ErzurumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  header: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e0e7ff',
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
  },
  searchInput: {
    margin: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 16,
    borderColor: '#d1d5db',
    borderWidth: 1,
    color: '#111827',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    borderLeftWidth: 5,
    borderLeftColor: '#1e3a8a',
    paddingLeft: 12,
    marginBottom: 14,
    color: '#1f2937',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  cardDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 12,
  },
  detailButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  detailButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  details: {
    marginTop: 16,
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 10,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  detailsListItem: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 4,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 13,
  },
});