import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export function RpgCard({ title, subtitle, rightElement, children, style, highlighted = false }) {
  return (
    <View
      style={[
        styles.card,
        highlighted && styles.cardHighlighted,
        style,
      ]}
    >
      {(title || rightElement) && (
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {rightElement ? <View>{rightElement}</View> : null}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardHighlighted: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.gold,
    borderWidth: 1.5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    ...typography.sectionTitle,
  },
  subtitle: {
    ...typography.bodyMuted,
    marginTop: 2,
  },
});

export default RpgCard;
