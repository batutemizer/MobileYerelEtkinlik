import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

type Event = {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  detailsTitle: string;
  detailsText: string;
  detailsList: string[];
  image: string;
};

const events: Event[] = [
  {
    id: 'konser1',
    category: 'Konserler',
    title: 'Yüksek Sadakat - Elazığ Konseri',
    date: '12 Mayıs 2025, 20:00 - Elazığ Kültür Park',
    description: 'Rock müziğin güçlü ismi Elazığ’da sahnede!',
    detailsTitle: '🎸 Yüksek Sadakat ile Müziğe Doyun 🎶',
    detailsText:
      'Elazığ’da sahne alacak olan Yüksek Sadakat konserinde, unutulmaz bir rock gecesi yaşanacak!',
    detailsList: [
      "🔥 Yüksek Sadakat'in hit şarkıları!",
      '🎤 Sahnede enerjik bir atmosfer!',
      '🎶 Kaçırılmayacak bir konser!',
    ],
    image: 'https://www.biletwise.com/uploads/category/big/1621113836.jpg',
  },
  {
    id: 'tiyatro1',
    category: 'Tiyatrolar',
    title: 'Bir Delinin Hatıra Defteri',
    date: '14 Mayıs 2025, 20:00 - Belediye Şehir Tiyatrosu',
    description: 'Gogol’ün ölümsüz eseri tek kişilik performansla sahnede.',
    detailsTitle: '🎭 Bir Delinin Hatıra Defteri - Tek Kişilik Performans!',
    detailsText:
      'Bu unutulmaz performansta Gogol’ün ölümsüz eseri sahneye taşınıyor!',
    detailsList: [
      '🎤 Unutulmaz bir oyunculuk deneyimi!',
      '💭 Derin bir düşünce yolculuğu!',
      '🎭 Etkileyici bir sahne deneyimi!',
    ],
    image:
      'https://www.sakm.net/images/slider/sakm-tiyatro-banner-2023-aralik.jpeg',
  },
  {
    id: 'soylesi1',
    category: 'Söyleşiler',
    title: 'Tarih ve Medeniyet Üzerine',
    date: '16 Mayıs 2025, 18:00 - Elazığ İl Halk Kütüphanesi',
    description: 'Prof. Dr. Ahmet Şimşirgil ile medeniyet sohbeti.',
    detailsTitle: '📚 Tarih ve Medeniyet Üzerine Derinlemesine Bir Sohbet',
    detailsText:
      'Prof. Dr. Ahmet Şimşirgil ile medeniyet ve tarih üzerine yapılacak derinlemesine bir sohbet.',
    detailsList: [
      '💬 Bilgiyi derinlemesine keşfedin!',
      '📖 Tarihsel olayları daha yakından öğrenin!',
      '🗣️ Kapsamlı bir söyleşi!',
    ],
    image: 'https://sahnedragos.com/assets/img/SG-hakkimizda-2.jpg',
  },
];

const ElazigScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const filtered = events.filter((e) =>
    [e.title, e.description, e.category]
      .some((field) => field.toLowerCase().includes(searchText.toLowerCase()))
  );

  const categories = Array.from(new Set(filtered.map((e) => e.category)));

  const toggleDetails = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Elazığ Etkinlikleri</Text>
        <Text style={styles.headerSubtitle}>
          Konserler, tiyatrolar ve söyleşiler bir arada!
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Etkinlik ara..."
        value={searchText}
        onChangeText={setSearchText}
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

          {filtered
            .filter((e) => e.category === category)
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
                  >
                    <Text style={styles.detailButtonText}>
                      {expandedIds.includes(event.id)
                        ? 'Detayları Gizle ⬅️'
                        : 'Detayları Gör ➡️'}
                    </Text>
                  </TouchableOpacity>

                  {expandedIds.includes(event.id) && (
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>{event.detailsTitle}</Text>
                      <Text style={styles.detailsText}>{event.detailsText}</Text>
                      {event.detailsList.map((item, i) => (
                        <Text key={i} style={styles.detailsListItem}>
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
          © 2025 Elazığ Etkinlikleri. Tüm hakları saklıdır.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ElazigScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    backgroundColor: '#6c63ff',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: { color: 'white', fontSize: 28, fontWeight: '700' },
  headerSubtitle: { color: 'white', fontSize: 16, marginTop: 8 },
  searchInput: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  section: { marginHorizontal: 16, marginTop: 24 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    borderLeftWidth: 5,
    borderLeftColor: '#6c63ff',
    paddingLeft: 12,
    marginBottom: 12,
    color: '#212529',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardBody: { padding: 16 },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#212529',
  },
  cardDate: { fontSize: 14, color: '#6c757d', marginBottom: 8 },
  cardDescription: { fontSize: 15, color: '#444', marginBottom: 12 },
  detailButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  detailButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  details: {
    marginTop: 16,
    backgroundColor: '#f9f3fe',
    padding: 16,
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6c63ff',
    marginBottom: 8,
  },
  detailsText: { fontSize: 16, color: '#333', marginBottom: 8 },
  detailsListItem: { fontSize: 16, color: '#555', marginBottom: 4 },
  footer: { marginTop: 32, marginBottom: 16, alignItems: 'center' },
  footerText: { color: '#888' },
});
