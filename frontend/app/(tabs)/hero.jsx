import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAppStore } from '../../src/store/useAppStore';
import { ATTRIBUTE_DEFINITIONS } from '../../src/constants/gameConstants';
import { RpgCard } from '../../src/components/RpgCard';
import { RpgProgressBar } from '../../src/components/RpgProgressBar';
import { colors, spacing, radius, typography } from '../../src/theme';

export default function HeroScreen() {
  const hero = useAppStore((state) => state.previewHero);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <RpgCard
        title={`${hero.characterName} • ${hero.characterClass}`}
        subtitle={`Level ${hero.level} Adventurer`}
        highlighted
      >
        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>TOTAL XP</Text>
            <Text style={styles.summaryValue}>{hero.totalXp}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>GOLD COINS</Text>
            <Text style={styles.summaryValue}>{hero.coins}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>STREAK</Text>
            <Text style={styles.summaryValue}>{hero.streakDays} Days</Text>
          </View>
        </View>
      </RpgCard>

      <RpgCard
        title="Core Attributes"
        subtitle="Attributes grow through quests and discipline"
      >
        {ATTRIBUTE_DEFINITIONS.map((attr) => {
          const value = hero.attributes?.[attr.key] || 0;
          return (
            <View key={attr.key} style={styles.attributeRow}>
              <View style={styles.attributeHeader}>
                <View>
                  <Text style={styles.attributeName}>{attr.label}</Text>
                  <Text style={styles.attributeDesc}>{attr.description}</Text>
                </View>
                <Text style={styles.attributeValue}>{value}</Text>
              </View>
              <RpgProgressBar
                current={value}
                max={20}
                showValues={false}
                fillColor={colors.primary}
              />
            </View>
          );
        })}
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.badge,
    color: colors.muted,
    marginBottom: 4,
  },
  summaryValue: {
    ...typography.statNumber,
  },
  attributeRow: {
    marginBottom: spacing.md,
  },
  attributeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  attributeName: {
    ...typography.cardTitle,
    fontSize: 15,
  },
  attributeDesc: {
    ...typography.bodyMuted,
    fontSize: 12,
  },
  attributeValue: {
    ...typography.statNumber,
    fontSize: 18,
  },
});
