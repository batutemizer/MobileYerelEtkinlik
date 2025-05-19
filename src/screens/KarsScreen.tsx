import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from 'react-native';

type Event = {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  detailsTitle: string;
  detailsDesc: string;
  detailsList: string[];
  imageUrl: string;
};

const eventsData: Event[] = [
  {
    id: 'konser1',
    category: 'Konserler',
    title: "Ayna - Kars Konseri",
    date: "15 Nisan 2025, 20:00 - Kars Kültür Merkezi",
    description: "Türk rock müziğinin efsanelerinden Ayna Kars'ta sahnede!",
    detailsTitle: "🎸 Ayna ile Coşkulu Bir Gece!",
    detailsDesc: "Ayna grubu ile nostaljik ve enerjik bir konser sizi bekliyor.",
    detailsList: [
      "🎵 En sevilen şarkılar",
      "🔥 Sınırlı bilet!",
      "🎉 Unutulmaz sahne performansı",
    ],
    imageUrl: "https://www.biletwise.com/uploads/category/big/1621113836.jpg",
  },
  {
    id: 'tiyatro1',
    category: 'Tiyatrolar',
    title: "İçimizdeki Şeytan",
    date: "26 Nisan 2025, 19:00 - Kars Kültür Merkezi",
    description: "Sabahattin Ali’nin unutulmaz eseri sahnede hayat buluyor.",
    detailsTitle: "🎭 Dramatik Bir Yolculuk",
    detailsDesc: "Modern insanın çelişkilerini sahnede keşfedin.",
    detailsList: [
      "🎭 Edebi derinlik",
      "🧠 Düşünsel sorgulama",
      "🎟️ Etkileyici oyunculuk",
    ],
    imageUrl: "https://www.sakm.net/images/slider/sakm-tiyatro-banner-2023-aralik.jpeg",
  },
  {
    id: 'soylesi1',
    category: 'Söyleşiler',
    title: "Edebiyat ve Kimlik",
    date: "28 Nisan 2025, 17:00 - Kafkas Üniversitesi",
    description: "Prof. Dr. Zeynep Doğan ile edebiyatın toplumsal etkisi üzerine keyifli bir sohbet.",
    detailsTitle: "📚 Edebiyatla Kimliği Keşfet",
    detailsDesc: "Kültürel miras, birey ve toplum bağlamında derin bir söyleşi.",
    detailsList: [
      "💬 Etkileşimli soru-cevap",
      "📖 Modern Türk edebiyatı",
      "🎤 Akademik bakış",
    ],
    imageUrl: "https://sahnedragos.com/assets/img/SG-hakkimizda-2.jpg",
  },
];

export default function KarsScreen() {
  const [searchText, setSearchText] = useState('');
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

  const filteredEvents = eventsData.filter(ev =>
    ev.title.toLowerCase().includes(searchText.toLowerCase()) ||
    ev.description.toLowerCase().includes(searchText.toLowerCase()) ||
    ev.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const groupedEvents = filteredEvents.reduce((groups, event) => {
    if (!groups[event.category]) {
      groups[event.category] = [];
    }
    groups[event.category].push(event);
    return groups;
  }, {} as Record<string, Event[]>);

  const toggleDetails = (id: string) => {
    setOpenDetailsId(openDetailsId === id ? null : id);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Kars Etkinlikleri</Text>
        <Text style={styles.subtitle}>Doğu'nun tarihi başkentinde kültür ve sanat sizi bekliyor!</Text>
      </View>

      <TextInput
        placeholder="Etkinlik ara..."
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />

      {Object.entries(groupedEvents).map(([category, events]) => (
        <View key={category} style={{ marginBottom: 32 }}>
          <Text style={styles.sectionTitle}>
            {category === 'Konserler' ? '🎤 Konserler' : category === 'Tiyatrolar' ? '🎭 Tiyatrolar' : '🗣️ Söyleşiler'}
          </Text>

          {events.map(event => (
            <View key={event.id} style={styles.card}>
              <Image source={{ uri: event.imageUrl }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{event.title}</Text>
                <Text style={styles.cardDate}>{event.date}</Text>
                <Text style={styles.cardDesc}>{event.description}</Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => toggleDetails(event.id)}
                >
                  <Text style={styles.buttonText}>
                    {openDetailsId === event.id ? 'Detayları Gizle ⬅️' : 'Detayları Gör ➡️'}
                  </Text>
                </TouchableOpacity>

                {openDetailsId === event.id && (
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>{event.detailsTitle}</Text>
                    <Text style={styles.detailsDesc}>{event.detailsDesc}</Text>
                    {event.detailsList.map((item, idx) => (
                      <Text key={idx} style={styles.detailsListItem}>{item}</Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  header: {
    backgroundColor: '#6c63ff',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: 'white',
    marginTop: 4,
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    borderLeftWidth: 6,
    borderLeftColor: '#6c63ff',
    paddingLeft: 12,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
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
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#6c63ff',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  details: {
    marginTop: 16,
    backgroundColor: '#f9f3fe',
    padding: 14,
    borderRadius: 8,
  },
  detailsTitle: {
    color: '#6c63ff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  detailsDesc: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  detailsListItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
});
