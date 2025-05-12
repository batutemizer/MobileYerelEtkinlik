import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErzurumScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Erzurum'a Hoş Geldiniz!</Text>
      <Text style={styles.description}>
        Bu sayfa Erzurum ile ilgili kültürel bilgiler, etkinlikler ve tarihi yerleri sunabilir.
      </Text>
    </View>
  );
};

export default ErzurumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
