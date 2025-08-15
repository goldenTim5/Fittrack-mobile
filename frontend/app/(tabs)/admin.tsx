import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import api from '../../lib/api';

export default function AdminScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);

  const loadData = async () => {
    const usersRes = await api.get('/admin/users');
    setUsers(usersRes.data);
    const workoutsRes = await api.get('/admin/workouts');
    setWorkouts(workoutsRes.data);
  };

  const handleDeleteUser = async (id: number) => {
    await api.delete(`/admin/users/${id}`);
    loadData();
  };

  const handleDeleteWorkout = async (id: number) => {
    await api.delete(`/admin/workouts/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={styles.title}>Users</Text>
      {users.map(user => (
        <View key={user.id} style={styles.row}>
          <Text>{user.name} ({user.email})</Text>
          <Button title="Delete" color="red" onPress={() => handleDeleteUser(user.id)} />
        </View>
      ))}

      <Text style={styles.title}>Workouts</Text>
      {workouts.map(w => (
        <View key={w.id} style={styles.row}>
          <Text>{w.workoutType} - {w.duration} min ({w.user.name})</Text>
          <Button title="Delete" color="red" onPress={() => handleDeleteWorkout(w.id)} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }
});
