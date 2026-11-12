import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RpgCard } from '../src/components/RpgCard';
import { colors, spacing, radius, typography } from '../src/theme';

const ACHIEVEMENTS_LIST = [
  {
    id: 'ach-1',
    title: 'First Steps',
    requirement: 'Complete first quest',
    xpReward: 25,
    coinReward: 10,
    unlocked: true,
  },
  {
    id: 'ach-2',
    title: 'Bookworm',
    requirement: 'Complete 10 study quests',
    xpReward: 75,
    coinReward: 30,
    unlocked: true,
  },
  {
    id: 'ach-3',
    title: 'Iron Will',
    requirement: 'Complete 10 fitness quests',
    xpReward: 75,
    coinReward: 30,
    unlocked: false,
  },
  {
    id: 'ach-4',
    title: 'Consistent Hero',
    requirement: 'Maintain a 7-day streak',
    xpReward: 100,
    coinReward: 40,
    unlocked: false,
  },
  {
    id: 'ach-5',
    title: 'Rising Adventurer',
    requirement: 'Reach level 5',
    xpReward: 80,
    coinReward: 35,
    unlocked: true,
  },
  {
    id: 'ach-6',
    title: 'Master of Quests',
    requirement: 'Complete 100 quests',
    xpReward: 300,
    coinReward: 150,
    unlocked: false,
  },
];

export default function AchievementsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <RpgCard
        title="Hall of Triumphs"
        subtitle="Automatically unlocked by server milestones"
      >
        {ACHIEVEMENTS_LIST.map((ach) => (
          <View key={ach.id} style={styles.achRow}>
            <View style={styles.achInfo}>
              <Text style={styles.achTitle}>
                {ach.unlocked ? '🏆 ' : '🔒 '}
                {ach.title}
              </Text>
              <Text style={styles.achReq}>{ach.requirement}</Text>
              <Text style={styles.achRewards}>
                Reward: +{ach.xpReward} XP • +{ach.coinReward} Gold
              </Text>
            </View>
            <View
              style={[
                styles.badge,
                ach.unlocked ? styles.unlockedBadge : styles.lockedBadge,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  ach.unlocked ? styles.unlockedText : styles.lockedText,
                ]}
              >
                {ach.unlocked ? 'Unlocked' : 'Locked'}
              </Text>
            </View>
          </View>
        ))}
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
  achRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  achInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  achTitle: {
    ...typography.cardTitle,
    color: colors.gold,
  },
  achReq: {
    ...typography.body,
    marginTop: 2,
  },
  achRewards: {
    ...typography.bodyMuted,
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  unlockedBadge: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.success,
  },
  lockedBadge: {
    backgroundColor: colors.background,
    borderColor: colors.borderSubtle,
  },
  badgeText: {
    ...typography.badge,
    fontSize: 10,
  },
  unlockedText: {
    color: colors.success,
  },
  lockedText: {
    color: colors.muted,
  },
});
