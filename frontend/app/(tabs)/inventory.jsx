import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { RpgCard } from '../../src/components/RpgCard';
import { RpgButton } from '../../src/components/RpgButton';
import { colors, spacing, radius, typography } from '../../src/theme';

const STARTER_INVENTORY = [
  {
    id: 'inv-1',
    name: 'Apprentice Staff of Clarity',
    category: 'Weapons',
    rarity: 'Rare',
    equipped: true,
    description: 'Forged for scholars who complete deep study sessions.',
  },
  {
    id: 'inv-2',
    name: 'Mantle of Midnight Focus',
    category: 'Armour',
    rarity: 'Epic',
    equipped: true,
    description: 'Woven with dark navy threads and bronze runes.',
  },
  {
    id: 'inv-3',
    name: 'Owl Familiar (Aether)',
    category: 'Companions',
    rarity: 'Legendary',
    equipped: false,
    description: 'A loyal arcane companion that watches over daily streaks.',
  },
];

export default function InventoryScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <RpgCard
        title="Hero Vault & Equipment"
        subtitle="Manage weapons, armour, companions & cosmetics"
      >
        {STARTER_INVENTORY.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.category} • {item.rarity}
              </Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
            <View
              style={[
                styles.equipBadge,
                item.equipped ? styles.equippedBadge : styles.storedBadge,
              ]}
            >
              <Text
                style={[
                  styles.equipText,
                  item.equipped ? styles.equippedText : styles.storedText,
                ]}
              >
                {item.equipped ? 'Equipped' : 'Stored'}
              </Text>
            </View>
          </View>
        ))}

        <RpgButton
          title="Visit Royal Emporium (Shop)"
          variant="secondary"
          onPress={() => router.push('/shop')}
          style={styles.shopBtn}
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
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  itemDetails: {
    flex: 1,
    paddingRight: spacing.md,
  },
  itemName: {
    ...typography.cardTitle,
    color: colors.gold,
  },
  itemMeta: {
    ...typography.badge,
    color: colors.muted,
    marginTop: 2,
    marginBottom: 4,
  },
  itemDesc: {
    ...typography.bodyMuted,
  },
  equipBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  equippedBadge: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.gold,
  },
  storedBadge: {
    backgroundColor: colors.background,
    borderColor: colors.borderSubtle,
  },
  equipText: {
    ...typography.badge,
    fontSize: 10,
  },
  equippedText: {
    color: colors.gold,
  },
  storedText: {
    color: colors.muted,
  },
  shopBtn: {
    marginTop: spacing.md,
  },
});
