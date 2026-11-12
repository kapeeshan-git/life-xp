import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CHARACTER_CLASSES } from '../src/constants/gameConstants';
import { RpgCard } from '../src/components/RpgCard';
import { RpgButton } from '../src/components/RpgButton';
import { colors, spacing, radius, typography } from '../src/theme';

export default function CharacterCreationScreen() {
  const router = useRouter();
  const [characterName, setCharacterName] = useState('Aster');
  const [selectedClass, setSelectedClass] = useState(CHARACTER_CLASSES[1]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <RpgCard
        title="Name Your Hero"
        subtitle="Choose an identity for your real-life adventure"
      >
        <TextInput
          style={styles.input}
          placeholder="Enter hero name..."
          placeholderTextColor={colors.muted}
          value={characterName}
          onChangeText={setCharacterName}
        />
      </RpgCard>

      <RpgCard
        title="Select Character Class"
        subtitle="Classes grant starting bonuses without restricting any quest"
      >
        <View style={styles.classGrid}>
          {CHARACTER_CLASSES.map((cls) => {
            const active = selectedClass.id === cls.id;
            return (
              <TouchableOpacity
                key={cls.id}
                style={[styles.classCard, active && styles.classCardActive]}
                onPress={() => setSelectedClass(cls)}
              >
                <Text style={styles.className}>{cls.name}</Text>
                <Text style={styles.classTitle}>{cls.title}</Text>
                <Text style={styles.classTheme}>{cls.theme}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </RpgCard>

      <RpgCard
        title={`${selectedClass.name} Attributes & Focus`}
        subtitle={selectedClass.title}
        highlighted
      >
        <Text style={styles.bonusTitle}>Starting Attribute Bonuses:</Text>
        <View style={styles.bonusRow}>
          {Object.entries(selectedClass.bonuses)
            .filter(([, val]) => val > 0)
            .map(([attr, val]) => (
              <View key={attr} style={styles.bonusPill}>
                <Text style={styles.bonusPillText}>
                  {attr.toUpperCase()} +{val}
                </Text>
              </View>
            ))}
        </View>

        <Text style={styles.bonusTitle}>Recommended Real-Life Activities:</Text>
        {selectedClass.recommendedActivities.map((act) => (
          <Text key={act} style={styles.activityItem}>
            • {act}
          </Text>
        ))}

        <RpgButton
          title="Confirm Hero & Enter Dashboard"
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.confirmBtn}
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
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: 16,
  },
  classGrid: {
    gap: spacing.sm,
  },
  classCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  classCardActive: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.gold,
    borderWidth: 1.5,
  },
  className: {
    ...typography.cardTitle,
    color: colors.gold,
  },
  classTitle: {
    ...typography.badge,
    color: colors.muted,
    marginTop: 2,
  },
  classTheme: {
    ...typography.body,
    marginTop: 4,
  },
  bonusTitle: {
    ...typography.badge,
    color: colors.primary,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  bonusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  bonusPill: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  bonusPillText: {
    color: colors.gold,
    fontWeight: '800',
    fontSize: 12,
  },
  activityItem: {
    ...typography.body,
    marginBottom: 4,
  },
  confirmBtn: {
    marginTop: spacing.md,
  },
});
