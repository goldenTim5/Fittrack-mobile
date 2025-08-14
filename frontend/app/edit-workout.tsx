import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { updateWorkout, getWorkouts } from '../lib/workout';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditWorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const workouts = await getWorkouts();
      const workout = workouts.find((w: any) => w.id === Number(id));
      if (workout) {
        setWorkoutType(workout.workoutType);
        setDuration(workout.duration.toString());
        setNotes(workout.notes || '');
        setDate(workout.date.split('T')[0]);
      }
    })();
  }, [id]);

  const handleUpdate = async () => {
    await updateWorkout(Number(id), {
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
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
}
