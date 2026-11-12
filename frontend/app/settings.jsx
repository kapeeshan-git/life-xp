import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../src/store/useAppStore';
import { useAuthStore } from '../src/store/useAuthStore';
import { RpgCard } from '../src/components/RpgCard';
import { RpgButton } from '../src/components/RpgButton';
import { ServerStatusBanner } from '../src/components/ServerStatusBanner';
import { colors, spacing, typography } from '../src/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const apiBaseUrl = useAppStore((state) => state.apiBaseUrl);
  const serverStatus = useAppStore((state) => state.serverStatus);
  const databaseStatus = useAppStore((state) => state.databaseStatus);
  const lastCheckedAt = useAppStore((state) => state.lastCheckedAt);
  const verifyBackendConnection = useAppStore((state) => state.verifyBackendConnection);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const lastVerifiedAt = useAuthStore((state) => state.lastVerifiedAt);
  const refreshProfile = useAuthStore((state) => state.refreshProfile);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <ServerStatusBanner />

      <RpgCard
        title="Authenticated Hero Account"
        subtitle="Protected Route & JWT Session Status (/api/auth/me)"
        highlighted
      >
        <View style={styles.row}>
          <Text style={styles.label}>Session State</Text>
          <Text
            style={[
              styles.value,
              { color: isAuthenticated ? colors.success : colors.danger },
            ]}
          >
            {isAuthenticated ? 'AUTHENTICATED (JWT)' : 'UNAUTHENTICATED'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{user?.username || 'Not signed in'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || 'Not signed in'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Verified (/auth/me)</Text>
          <Text style={styles.value}>{lastVerifiedAt || 'Never'}</Text>
        </View>

        {isAuthenticated ? (
          <>
            <RpgButton
              title="Verify Protected Route (/api/auth/me)"
              loading={isLoading}
              onPress={refreshProfile}
              style={styles.buttonSpacing}
            />
            <RpgButton
              title="Log Out of Account"
              variant="danger"
              onPress={handleLogout}
              style={styles.buttonSpacing}
            />
          </>
        ) : (
          <RpgButton
            title="Go to Hero Login"
            onPress={() => router.push('/(auth)/login')}
            style={styles.buttonSpacing}
          />
        )}
      </RpgCard>

      <RpgCard
        title="Backend & Synchronization Diagnostics"
        subtitle="Phase 1 & 2 Server Health"
      >
        <View style={styles.row}>
          <Text style={styles.label}>API Base URL</Text>
          <Text style={styles.value}>{apiBaseUrl}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Server Status</Text>
          <Text style={styles.value}>{serverStatus.toUpperCase()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>MongoDB State</Text>
          <Text style={styles.value}>{databaseStatus.toUpperCase()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last Health Check</Text>
          <Text style={styles.value}>{lastCheckedAt || 'Never'}</Text>
        </View>

        <RpgButton
          title="Test Backend Health Endpoint"
          variant="secondary"
          onPress={verifyBackendConnection}
          style={styles.buttonSpacing}
        />
      </RpgCard>

      <RpgCard title="Navigation Controls" subtitle="Realm Gate">
        <RpgButton
          title="Return to Welcome Gate"
          variant="secondary"
          onPress={() => router.replace('/')}
        />
      </RpgCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  label: {
    ...typography.bodyMuted,
  },
  value: {
    ...typography.body,
    color: colors.gold,
    fontWeight: '700',
  },
  buttonSpacing: {
    marginTop: spacing.md,
  },
});
