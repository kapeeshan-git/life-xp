import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../src/store/useAuthStore';
import { colors } from '../src/theme';

export default function RootLayout() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.gold,
          headerTitleStyle: {
            fontWeight: '800',
            color: colors.text,
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="character-creation"
          options={{
            title: 'Forge Your Hero',
          }}
        />
        <Stack.Screen
          name="shop"
          options={{
            title: 'Royal Emporium',
          }}
        />
        <Stack.Screen
          name="achievements"
          options={{
            title: 'Hall of Triumphs',
          }}
        />
        <Stack.Screen
          name="statistics"
          options={{
            title: 'Chronicle of Deeds',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Sanctum Settings',
          }}
        />
      </Stack>
    </>
  );
}
