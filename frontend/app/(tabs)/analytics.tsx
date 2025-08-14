import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { VictoryBar, VictoryPie, VictoryChart } from 'victory';
import { VictoryTheme } from 'victory';
import { getWorkouts } from '../../lib/workout';

export default function AnalyticsScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getWorkouts();
      setWorkouts(data);
    })();
  }, []);

  if (!workouts.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No workout data yet.</Text>
      </View>
    );
  }

  // Weekly bar chart data
  const weeklyData = workouts.reduce((acc: any, w) => {
    const day = new Date(w.date).toLocaleDateString('en-US', { weekday: 'short' });
    const found = acc.find((item: any) => item.day === day);
    if (found) {
      found.minutes += w.duration;
    } else {
      acc.push({ day, minutes: w.duration });
    }
    return acc;
  }, []);

  // Pie chart data by workout type
  const typeData = workouts.reduce((acc: any, w) => {
    const found = acc.find((item: any) => item.x === w.workoutType);
    if (found) {
      found.y += 1;
    } else {
      acc.push({ x: w.workoutType, y: 1 });
    }
    return acc;
  }, []);

  // Stats
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Weekly Activity</Text>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryBar data={weeklyData} x="day" y="minutes" />
      </VictoryChart>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Workout Breakdown</Text>
      <VictoryPie data={typeData} colorScale="qualitative" />

      <View style={{ marginTop: 20 }}>
        <Text>Total Workouts: {workouts.length}</Text>
        <Text>Total Minutes: {totalMinutes}</Text>
      </View>
    </ScrollView>
  );
}
