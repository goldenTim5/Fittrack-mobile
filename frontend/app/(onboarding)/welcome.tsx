import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Site_Logos/logo-png.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>FitTrack Lite</Text>
      <Text style={styles.subtitle}>
        Track your workouts, see your progress, and stay motivated.
      </Text>
      <Button title="Get Started" onPress={() => router.push('/(onboarding)/slides')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30 }
});
