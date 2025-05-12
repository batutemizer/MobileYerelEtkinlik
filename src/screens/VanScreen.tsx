import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VanScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Van'a Hoş Geldiniz!</Text>
      <Text style={styles.description}>
        Bu sayfa Van ile ilgili bilgileri, etkinlikleri ve gezilecek yerleri gösterebilir.
      </Text>
    </View>
  );
};

export default VanScreen;

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
