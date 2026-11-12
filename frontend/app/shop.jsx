import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAppStore } from '../src/store/useAppStore';
import { RpgCard } from '../src/components/RpgCard';
import { colors, spacing, radius, typography } from '../src/theme';

const SHOP_CATALOG = [
  {
    id: 'shop-1',
    name: 'Blade of Dawn Discipline',
    category: 'Weapons',
    rarity: 'Epic',
    price: 120,
    description: 'Symbolic greatsword for early-morning risers.',
  },
  {
    id: 'shop-2',
    name: 'Archmage Robes of Astral Focus',
    category: 'Armour',
    rarity: 'Legendary',
    price: 240,
    description: 'Ornate gold-trimmed robes earned by master scholars.',
  },
  {
    id: 'shop-3',
    name: 'Ember Fox Companion',
    category: 'Companions',
    rarity: 'Rare',
    price: 95,
    description: 'Spirited companion that accompanies outdoor quests.',
  },
  {
    id: 'shop-4',
    name: 'Gilded Crest Border',
    category: 'Cosmetic items',
    rarity: 'Uncommon',
    price: 50,
    description: 'Decorates your hero profile card with royal bronze filigree.',
  },
];

export default function ShopScreen() {
  const hero = useAppStore((state) => state.previewHero);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <RpgCard
        title="Royal Treasury Balance"
        subtitle="All purchases are validated authoritatively on the server"
        highlighted
      >
        <Text style={styles.balanceText}>🪙 {hero.coins} Gold Coins</Text>
      </RpgCard>

      <RpgCard
        title="Merchant Catalogue"
        subtitle="Cosmetic equipment, companions & profile themes"
      >
        {SHOP_CATALOG.map((item) => (
          <View key={item.id} style={styles.shopItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.category} • {item.rarity}
              </Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{item.price} Gold</Text>
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
  balanceText: {
    ...typography.statNumber,
    fontSize: 22,
  },
  shopItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  itemInfo: {
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
    marginVertical: 2,
  },
  itemDesc: {
    ...typography.bodyMuted,
  },
  priceTag: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  priceText: {
    color: colors.gold,
    fontWeight: '800',
    fontSize: 13,
  },
});
