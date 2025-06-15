import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Comment = {
  id: string;
  username: string;
  text: string;
  timestamp: string;
};

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  colors: string[];
  icon: string;
  details: {
    time: string;
    venue: string;
    price: string;
    category: string;
  };
  comments: Comment[];
}

const defaultEvents: Event[] = [
  {
    id: 1,
    title: "İzmir Uluslararası Fuarı",
    date: "1-10 Eylül 2024",
    location: "Kültürpark",
    description: "Uluslararası ticaret ve kültür fuarı.",
    colors: ['#FF512F', '#DD2476'],
    icon: 'store',
    details: {
      time: '10:00 - 22:00',
      venue: 'Kültürpark',
      price: '50 TL',
      category: 'Fuar',
    },
    comments: []
  },
  {
    id: 2,
    title: "İzmir Rock Festivali",
    date: "15-17 Temmuz 2024",
    location: "İnciraltı Sahili",
    description: "Türkiye'nin en büyük rock festivali.",
    colors: ['#614385', '#516395'],
    icon: 'music-note',
    details: {
      time: '14:00 - 23:00',
      venue: 'İnciraltı Sahili',
      price: '300 TL',
      category: 'Müzik',
    },
    comments: []
  },
  {
    id: 3,
    title: "İzmir Tarih ve Kültür Festivali",
    date: "1-7 Ekim 2024",
    location: "Kemeraltı",
    description: "Tarihi Kemeraltı'nda kültür ve sanat etkinlikleri.",
    colors: ['#56ab2f', '#a8e063'],
    icon: 'museum',
    details: {
      time: '11:00 - 20:00',
      venue: 'Kemeraltı Çarşısı',
      price: 'Ücretsiz',
      category: 'Kültür',
    },
    comments: []
  }
];

const IzmirScreen: React.FC = () => {
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState<string>('');
  const [events, setEvents] = useState<Event[]>(defaultEvents);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await loadUsername();
        await loadComments();
      } catch (error) {
        console.error('Veri yüklenirken hata oluştu:', error);
        setEvents(defaultEvents);
      }
    };
    initializeData();
  }, []);

  const loadUsername = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    } catch (error) {
      console.error('Kullanıcı adı yüklenirken hata oluştu:', error);
    }
  };

  const loadComments = async () => {
    try {
      const savedComments = await AsyncStorage.getItem('izmirEventComments');
      if (savedComments) {
        const parsedComments = JSON.parse(savedComments) as Event[];
        if (Array.isArray(parsedComments) && parsedComments.length > 0) {
          setEvents(parsedComments);
        } else {
          setEvents(defaultEvents);
        }
      }
    } catch (error) {
      console.error('Yorumlar yüklenirken hata oluştu:', error);
      setEvents(defaultEvents);
    }
  };

  const saveComments = async (updatedEvents: Event[]) => {
    try {
      await AsyncStorage.setItem('izmirEventComments', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error('Yorumlar kaydedilirken hata oluştu:', error);
    }
  };

  const addComment = async (eventId: number) => {
    if (!commentText.trim() || !username) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      username: username,
      text: commentText.trim(),
      timestamp: new Date().toLocaleString('tr-TR'),
    };

    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          comments: [...event.comments, newComment],
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    setCommentText('');
    await saveComments(updatedEvents);
  };

  const toggleEventDetails = (eventId: number) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.eventCard}>
      <LinearGradient
        colors={item.colors && Array.isArray(item.colors) ? item.colors : ['#000', '#fff']}
        style={styles.eventGradient}
      >
        <View style={styles.eventHeader}>
          <Icon name={item.icon} size={40} color="#fff" style={styles.eventIcon} />
          <View style={styles.eventTitleContainer}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
          </View>
        </View>

        <Text style={styles.eventLocation}>
          <Icon name="location-on" size={16} color="#fff" /> {item.location}
        </Text>

        <Text style={styles.eventDescription}>{item.description}</Text>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => toggleEventDetails(item.id)}
        >
          <Text style={styles.detailsButtonText}>
            {expandedEventId === item.id ? 'Detayları Gizle' : 'Detayları Göster'}
          </Text>
        </TouchableOpacity>

        {expandedEventId === item.id && (
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Icon name="access-time" size={20} color="#fff" />
              <Text style={styles.detailText}>{item.details.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="place" size={20} color="#fff" />
              <Text style={styles.detailText}>{item.details.venue}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="attach-money" size={20} color="#fff" />
              <Text style={styles.detailText}>{item.details.price}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="category" size={20} color="#fff" />
              <Text style={styles.detailText}>{item.details.category}</Text>
            </View>

            <View style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>Yorumlar</Text>
              {item.comments && item.comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <Text style={styles.commentUser}>{comment.username}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <Text style={styles.commentTime}>{comment.timestamp}</Text>
                </View>
              ))}
              
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.commentInput}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Yorum yaz..."
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                />
                <TouchableOpacity
                  style={[styles.commentButton, !username && styles.commentButtonDisabled]}
                  onPress={() => addComment(item.id)}
                  disabled={!username}
                >
                  <Text style={styles.commentButtonText}>Gönder</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );

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
            <Text style={styles.title}>İzmir Etkinlikleri</Text>
            <Text style={styles.subtitle}>
              Ege'nin incisi İzmir'in en güzel etkinlikleri
            </Text>
          </View>
        </LinearGradient>

        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
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
  eventCard: {
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventGradient: {
    padding: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventIcon: {
    marginRight: 15,
  },
  eventTitleContainer: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  eventLocation: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
    lineHeight: 22,
  },
  detailsButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  commentsSection: {
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  commentItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentUser: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    color: '#fff',
    marginBottom: 5,
  },
  commentTime: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 10,
    borderRadius: 8,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  commentButtonDisabled: {
    opacity: 0.5,
  },
});

export default IzmirScreen; 