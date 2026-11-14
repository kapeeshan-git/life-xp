import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '../../src/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.gold,
        headerTitleStyle: {
          fontWeight: '700',
          color: colors.text,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Hero Login',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Hero Registration',
        }}
      />
    </Stack>
  );
}
