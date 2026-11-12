import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RpgCard } from '../src/components/RpgCard';
import { RpgProgressBar } from '../src/components/RpgProgressBar';
import { colors, spacing, radius, typography } from '../src/theme';

export default function StatisticsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <RpgCard
        title="Hero Overview"
        subtitle="Lifetime progression metrics"
        highlighted
      >
        <View style={styles.metricsGrid}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>18</Text>
            <Text style={styles.metricLabel}>Quests Completed</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>450</Text>
            <Text style={styles.metricLabel}>Total XP Earned</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>4 Days</Text>
            <Text style={styles.metricLabel}>Current Streak</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>7 Days</Text>
            <Text style={styles.metricLabel}>Longest Streak</Text>
          </View>
        </View>
      </RpgCard>

      <RpgCard
        title="Category Distribution"
        subtitle="Weekly & monthly quest focus"
      >
        <View style={styles.barGroup}>
          <RpgProgressBar
            label="Study & Knowledge"
            current={8}
            max={12}
            fillColor={colors.mana}
          />
        </View>
        <View style={styles.barGroup}>
          <RpgProgressBar
            label="Fitness & Strength"
            current={5}
            max={12}
            fillColor={colors.danger}
          />
        </View>
        <View style={styles.barGroup}>
          <RpgProgressBar
            label="Discipline & Routines"
            current={5}
            max={12}
            fillColor={colors.gold}
          />
        </View>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metricBox: {
    width: '48%',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    alignItems: 'center',
  },
  metricValue: {
    ...typography.statNumber,
  },
  metricLabel: {
    ...typography.bodyMuted,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  barGroup: {
    marginBottom: spacing.md,
  },
});
