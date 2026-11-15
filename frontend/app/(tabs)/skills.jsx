import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RpgCard } from '../../src/components/RpgCard';
import { colors, spacing, radius, typography } from '../../src/theme';

const SKILL_BRANCHES = [
  {
    className: 'Warrior',
    skills: [
      { name: 'Physical Strength', req: 'Level 2 • Strength 5', unlocked: true },
      { name: 'Endurance', req: 'Level 4 • Vitality 6', unlocked: true },
      { name: 'Discipline', req: 'Level 7 • Discipline 10', unlocked: false },
    ],
  },
  {
    className: 'Mage',
    skills: [
      { name: 'Learning Speed', req: 'Level 2 • Intelligence 6', unlocked: true },
      { name: 'Focus', req: 'Level 5 • Discipline 8', unlocked: true },
      { name: 'Knowledge', req: 'Level 8 • Intelligence 12', unlocked: false },
    ],
  },
  {
    className: 'Ranger',
    skills: [
      { name: 'Exploration', req: 'Level 2 • Agility 6', unlocked: false },
      { name: 'Creativity', req: 'Level 5 • Intelligence 7', unlocked: false },
      { name: 'Adaptability', req: 'Level 8 • Agility 11', unlocked: false },
    ],
  },
  {
    className: 'Paladin',
    skills: [
      { name: 'Consistency', req: 'Level 2 • Discipline 6', unlocked: true },
      { name: 'Recovery', req: 'Level 5 • Vitality 8', unlocked: false },
      { name: 'Balance', req: 'Level 9 • Vitality 12', unlocked: false },
    ],
  },
];

export default function SkillsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      {SKILL_BRANCHES.map((branch) => (
        <RpgCard
          key={branch.className}
          title={`${branch.className} Mastery`}
          subtitle="Unlockable RPG abilities"
        >
          {branch.skills.map((skill) => (
            <View key={skill.name} style={styles.skillNode}>
              <View>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillReq}>{skill.req}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  skill.unlocked ? styles.unlockedBadge : styles.lockedBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    skill.unlocked ? styles.unlockedText : styles.lockedText,
                  ]}
                >
                  {skill.unlocked ? 'Unlocked' : 'Locked'}
                </Text>
              </View>
            </View>
          ))}
        </RpgCard>
      ))}
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
  skillNode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  skillName: {
    ...typography.cardTitle,
    fontSize: 15,
  },
  skillReq: {
    ...typography.bodyMuted,
    fontSize: 12,
  },
  statusBadge: {
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
  statusText: {
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
