import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { colors, spacing, radius, typography } from '../theme';

export function ServerStatusBanner() {
  const serverStatus = useAppStore((state) => state.serverStatus);
  const databaseStatus = useAppStore((state) => state.databaseStatus);
  const serverError = useAppStore((state) => state.serverError);
  const apiBaseUrl = useAppStore((state) => state.apiBaseUrl);
  const verifyBackendConnection = useAppStore((state) => state.verifyBackendConnection);

  useEffect(() => {
    verifyBackendConnection();
  }, [verifyBackendConnection]);

  const isOnline = serverStatus === 'online';
  const isChecking = serverStatus === 'checking';

  const badgeColor = isChecking
    ? colors.primary
    : isOnline
    ? colors.success
    : colors.danger;

  const statusLabel = isChecking
    ? 'Checking Realm Server...'
    : isOnline
    ? `Realm Online • DB: ${databaseStatus}`
    : 'Realm Offline (Cached Mode)';

  return (
    <View style={styles.banner}>
      <View style={styles.statusRow}>
        <View style={styles.leftRow}>
          <View style={[styles.dot, { backgroundColor: badgeColor }]} />
          <View>
            <Text style={styles.statusTitle}>{statusLabel}</Text>
            <Text style={styles.endpointText}>{apiBaseUrl}/health</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.pingButton}
          onPress={verifyBackendConnection}
          disabled={isChecking}
        >
          <Text style={styles.pingButtonText}>
            {isChecking ? 'Pinging...' : 'Ping API'}
          </Text>
        </TouchableOpacity>
      </View>

      {serverError && !isOnline ? (
        <Text style={styles.errorText}>{serverError}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.sm,
  },
  statusTitle: {
    ...typography.body,
    fontWeight: '700',
  },
  endpointText: {
    ...typography.bodyMuted,
    fontSize: 11,
  },
  pingButton: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.sm,
  },
  pingButtonText: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '700',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});

export default ServerStatusBanner;
