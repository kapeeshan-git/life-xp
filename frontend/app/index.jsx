import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';
import { RpgCard } from '../src/components/RpgCard';
import { RpgButton } from '../src/components/RpgButton';
import { ServerStatusBanner } from '../src/components/ServerStatusBanner';
import { colors, spacing, typography } from '../src/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroHeader}>
          <Text style={styles.emblem}>⚔️ LIFEXP ⚔️</Text>
          <Text style={styles.subtitle}>
            TURN REAL-LIFE DISCIPLINE INTO LEGENDARY PROGRESSION
          </Text>
        </View>

        <ServerStatusBanner />

        {isAuthenticated && user ? (
          <RpgCard
            title={`Session Active: ${user.username}`}
            subtitle={`Authenticated as ${user.email}`}
            highlighted
          >
            <Text style={styles.loreText}>
              Your JWT session is active and verified with the LifeXP Realm
              Server. Enter the Sanctum Dashboard to continue your quests.
            </Text>
            <RpgButton
              title={`Enter Realm as ${user.username}`}
              onPress={() => router.push('/(tabs)/home')}
              style={styles.buttonSpacing}
            />
            <RpgButton
              title="Log Out of Account"
              variant="danger"
              onPress={logout}
            />
          </RpgCard>
        ) : (
          <RpgCard
            title="Chronicles of the Everyday Hero"
            subtitle="Real-Life Gamification RPG"
            highlighted
          >
            <Text style={styles.loreText}>
              Forge your character, select from four ancient classes—Warrior,
              Mage, Ranger, or Paladin—and transform your daily study, fitness,
              creativity, and wellbeing into rewarding RPG quests.
            </Text>
            <View style={styles.featurePills}>
              <Text style={styles.pill}>• Authoritative XP & Leveling</Text>
              <Text style={styles.pill}>• 4 Hero Classes & 5 Attributes</Text>
              <Text style={styles.pill}>• Quests, Streaks & Achievements</Text>
              <Text style={styles.pill}>• Offline SQLite Synchronization</Text>
            </View>
          </RpgCard>
        )}

        {!isAuthenticated && (
          <View style={styles.actionsContainer}>
            <RpgButton
              title="Hero Login"
              loading={isInitializing}
              onPress={() => router.push('/(auth)/login')}
              style={styles.buttonSpacing}
            />
            <RpgButton
              title="Begin New Journey (Register)"
              variant="secondary"
              onPress={() => router.push('/(auth)/register')}
              style={styles.buttonSpacing}
            />
            <RpgButton
              title="Preview Realm Dashboard"
              variant="secondary"
              onPress={() => router.push('/(tabs)/home')}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    justifyContent: 'center',
    flexGrow: 1,
  },
  heroHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  emblem: {
    ...typography.heroTitle,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.badge,
    color: colors.muted,
    textAlign: 'center',
  },
  loreText: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  featurePills: {
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  pill: {
    ...typography.bodyMuted,
    color: colors.gold,
    fontWeight: '600',
  },
  actionsContainer: {
    marginTop: spacing.md,
  },
  buttonSpacing: {
    marginBottom: spacing.sm,
  },
});
