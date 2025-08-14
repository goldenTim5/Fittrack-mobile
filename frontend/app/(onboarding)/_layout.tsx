import React from 'react';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide top bar for a clean welcome look
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="slides" />
    </Stack>
  );
}
