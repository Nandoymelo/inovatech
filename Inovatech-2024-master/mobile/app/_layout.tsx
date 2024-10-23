import { Stack } from 'expo-router/stack';

import theme from '../assets/theme';
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
  } from 'react-native-paper';
  
export default function Layout() {
    return (
        <PaperProvider theme={theme}>
            <Stack screenOptions={{
                 headerShown: false,}}>
                <Stack.Screen name="(tabs)"  />
            </Stack>
        </PaperProvider>
    );
}
