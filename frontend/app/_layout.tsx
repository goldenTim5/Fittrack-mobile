import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Slot, Redirect } from 'expo-router';

export default function RootLayout() {
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const seen = await AsyncStorage.getItem('hasOnboarded');
      if (seen) {
        setFirstLaunch(false);
      } else {
        setFirstLaunch(true);
        await AsyncStorage.setItem('hasOnboarded', 'true');
      }
    })();
  }, []);

  if (firstLaunch === null) return null;

  if (firstLaunch) return <Redirect href="/(onboarding)/welcome"/>;

  return <Slot />;
}
