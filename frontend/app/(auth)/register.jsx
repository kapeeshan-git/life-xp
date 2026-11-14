import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore';
import { RpgCard } from '../../src/components/RpgCard';
import { RpgButton } from '../../src/components/RpgButton';
import { ServerStatusBanner } from '../../src/components/ServerStatusBanner';
import { colors, spacing, radius, typography } from '../../src/theme';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;

export default function RegisterScreen() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const authError = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleRegister = async () => {
    setLocalError(null);
    clearError();

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!USERNAME_REGEX.test(trimmedUsername)) {
      setLocalError(
        'Username must be 3-30 characters (letters, numbers, underscores, or hyphens).'
      );
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setLocalError('Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Password and confirm password do not match.');
      return;
    }

    const result = await register({
      username: trimmedUsername,
      email: trimmedEmail,
      password,
      confirmPassword,
    });

    if (result.success) {
      router.replace('/character-creation');
    }
  };

  const displayedError = localError || authError;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ServerStatusBanner />

      <RpgCard
        title="Inscribe Your Name"
        subtitle="Create a LifeXP account & proceed to Character Creation"
        highlighted
      >
        {displayedError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {displayedError}</Text>
          </View>
        ) : null}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="aster_mage"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="aster@lifexp.realm"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password (min. 8 characters)</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.muted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.muted}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <RpgButton
          title="Register & Forge Character"
          loading={isLoading}
          onPress={handleRegister}
          style={styles.submitButton}
        />

        <RpgButton
          title="Already Registered? Sign In"
          variant="secondary"
          disabled={isLoading}
          onPress={() => router.push('/(auth)/login')}
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
