import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {
  QUEST_CATEGORIES,
  STARTER_PREVIEW_QUESTS,
} from '../../src/constants/gameConstants';
import { RpgCard } from '../../src/components/RpgCard';
import { colors, spacing, radius, typography } from '../../src/theme';

export default function QuestsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...QUEST_CATEGORIES];

  const filteredQuests =
    selectedCategory === 'All'
      ? STARTER_PREVIEW_QUESTS
      : STARTER_PREVIEW_QUESTS.filter((q) => q.category === selectedCategory);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        {categories.map((cat) => {
          const active = cat === selectedCategory;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, active && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[styles.categoryText, active && styles.categoryTextActive]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <RpgCard
        title="Available Realm Contracts"
        subtitle="Complete real-life tasks to claim XP & Gold"
      >
        {filteredQuests.map((quest) => (
          <View key={quest.id} style={styles.questItem}>
            <View style={styles.questMain}>
              <View style={styles.titleRow}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.difficultyBadge}>{quest.difficulty}</Text>
              </View>
              <Text style={styles.questDesc}>{quest.realLifeActivity}</Text>
              <Text style={styles.categoryLabel}>Category: {quest.category}</Text>
            </View>
            <View style={styles.rewardBox}>
              <Text style={styles.xpValue}>+{quest.xpReward} XP</Text>
              <Text style={styles.coinValue}>+{quest.coinReward} Gold</Text>
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
  filterBar: {
    marginBottom: spacing.md,
  },
  filterContent: {
    gap: spacing.sm,
  },
  categoryChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.gold,
  },
  categoryText: {
    ...typography.badge,
    color: colors.muted,
  },
  categoryTextActive: {
    color: colors.background,
  },
  questItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  questMain: {
    flex: 1,
    paddingRight: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 4,
  },
  questTitle: {
    ...typography.cardTitle,
  },
  difficultyBadge: {
    ...typography.badge,
    color: colors.gold,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  questDesc: {
    ...typography.body,
    color: colors.text,
  },
  categoryLabel: {
    ...typography.bodyMuted,
    fontSize: 12,
    marginTop: 2,
  },
  rewardBox: {
    alignItems: 'flex-end',
  },
  xpValue: {
    color: colors.success,
    fontWeight: '800',
    fontSize: 14,
  },
  coinValue: {
    color: colors.gold,
    fontWeight: '700',
    fontSize: 12,
    marginTop: 2,
  },
});
