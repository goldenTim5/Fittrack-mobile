import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createWorkout } from '../lib/workout';
import { useRouter } from 'expo-router';

export default function AddWorkoutScreen() {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const router = useRouter();

  const handleSave = async () => {
    await createWorkout({
      workoutType,
      duration: Number(duration),
      notes,
      date
    });
    router.push('/(tabs)/workouts');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Workout Type</Text>
      <TextInput value={workoutType} onChangeText={setWorkoutType} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Duration (minutes)</Text>
      <TextInput value={duration} onChangeText={setDuration} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Notes</Text>
      <TextInput value={notes} onChangeText={setNotes} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
