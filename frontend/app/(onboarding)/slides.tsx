import React from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function OnboardingSlides() {
  const router = useRouter();

  const slides = [
    { image: require('../../assets/images/slides/track.png'), title: 'Track Workouts', desc: 'Log your exercises and monitor progress over time.' },
    { image: require('../../assets/images/slides/analytic.png'), title: 'View Analytics', desc: 'Charts and stats to keep you motivated.' },
    { image: require('../../assets/images/slides/reminder.png'), title: 'Stay Consistent', desc: 'Daily reminders to keep you on track.' }
  ];

  return (
    <Swiper loop={false} showsPagination={true} activeDotColor="#000">
      {slides.map((slide, idx) => (
        <View key={idx} style={styles.slide}>
          <Image source={slide.image} style={styles.image} />
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.desc}>{slide.desc}</Text>
          {idx === slides.length - 1 && (
            <Button title="Continue" onPress={() => router.replace('/(auth)/login')} />
          )}
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  image: { width: width * 0.7, height: width * 0.7, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  desc: { fontSize: 16, textAlign: 'center', color: '#555' }
});
