import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { getWorkouts, deleteWorkout } from '../../lib/workout';
import { useRouter } from 'expo-router';

export default function WorkoutListScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const router = useRouter();

  const loadWorkouts = async () => {
    const data = await getWorkouts();
    setWorkouts(data);
  };

  const handleDelete = async (id: number) => {
    await deleteWorkout(id);
    loadWorkouts();
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add Workout" onPress={() => router.push('/add-workout')} />
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderColor: '#ccc'
            }}
            onPress={() => router.push({ pathname: '/edit-workout', params: { id: item.id } })}
          >
            <Text>{item.workoutType} - {item.duration} mins</Text>
            <Text>{new Date(item.date).toLocaleDateString()}</Text>
            <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
