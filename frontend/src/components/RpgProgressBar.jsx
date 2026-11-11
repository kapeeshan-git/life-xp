import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export function RpgProgressBar({
  current = 0,
  max = 100,
  label,
  fillColor = colors.gold,
  showValues = true,
}) {
  const safeMax = max > 0 ? max : 100;
  const percentage = Math.min(100, Math.max(0, Math.round((current / safeMax) * 100)));

  return (
    <View style={styles.container}>
      {(label || showValues) && (
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>{label || 'Progress'}</Text>
          {showValues && (
            <Text style={styles.valueText}>
              {current} / {safeMax} ({percentage}%)
            </Text>
          )}
        </View>
      )}
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  labelText: {
    ...typography.bodyMuted,
    color: colors.text,
    fontWeight: '600',
  },
  valueText: {
    ...typography.bodyMuted,
    color: colors.gold,
    fontWeight: '700',
  },
  track: {
    height: 12,
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});

export default RpgProgressBar;
