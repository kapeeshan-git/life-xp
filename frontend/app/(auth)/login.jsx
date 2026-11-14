import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore';
import { RpgCard } from '../../src/components/RpgCard';
import { RpgButton } from '../../src/components/RpgButton';
import { ServerStatusBanner } from '../../src/components/ServerStatusBanner';
import { colors, spacing, radius, typography } from '../../src/theme';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const authError = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleLogin = async () => {
    setLocalError(null);
    clearError();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setLocalError('Please enter both your email address and password.');
      return;
    }

    const result = await login({
      email: trimmedEmail,
      password,
    });

    if (result.success) {
      router.replace('/(tabs)/home');
    }
  };

  const displayedError = localError || authError;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ServerStatusBanner />

      <RpgCard
        title="Return to the Sanctum"
        subtitle="Authenticate to load your RPG character"
        highlighted
      >
        {displayedError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {displayedError}</Text>
          </View>
        ) : null}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="hero@lifexp.realm"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Secret Passphrase</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.muted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <RpgButton
          title="Sign In & Enter Dashboard"
          loading={isLoading}
          onPress={handleLogin}
          style={styles.submitButton}
        />

        <RpgButton
          title="New Hero? Create an Account"
          variant="secondary"
          disabled={isLoading}
          onPress={() => router.push('/(auth)/register')}
        />
      </RpgCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  errorBox: {
    backgroundColor: 'rgba(199, 92, 92, 0.16)',
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  fieldGroup: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body,
    color: colors.gold,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: 15,
  },
  submitButton: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
});
