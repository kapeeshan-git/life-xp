import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../src/store/useAppStore';
import { useAuthStore } from '../../src/store/useAuthStore';
import { STARTER_PREVIEW_QUESTS } from '../../src/constants/gameConstants';
import { RpgCard } from '../../src/components/RpgCard';
import { RpgButton } from '../../src/components/RpgButton';
import { RpgProgressBar } from '../../src/components/RpgProgressBar';
import { ServerStatusBanner } from '../../src/components/ServerStatusBanner';
import { colors, spacing, radius, typography } from '../../src/theme';

export default function HomeScreen() {
  const router = useRouter();
  const hero = useAppStore((state) => state.previewHero);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const dailyQuests = STARTER_PREVIEW_QUESTS.slice(0, 3);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <ServerStatusBanner />

      <RpgCard
        title={
          isAuthenticated && user
            ? `Welcome back, ${user.username}!`
            : 'Welcome back, Hero!'
        }
        subtitle={
          isAuthenticated && user
            ? `Authenticated Session • ${user.email}`
            : 'Preview Mode (Sign in to save permanent progress)'
        }
        highlighted
      >
        <View style={styles.heroHeaderRow}>
          <View>
            <Text style={styles.heroName}>
              {hero.characterName.toUpperCase()} THE {hero.characterClass.toUpperCase()}
            </Text>
            <Text style={styles.heroLevel}>LEVEL {hero.level}</Text>
          </View>
          <View style={styles.statsBadgeRow}>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeLabel}>GOLD</Text>
              <Text style={styles.statBadgeValue}>{hero.coins}</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeLabel}>STREAK</Text>
              <Text style={styles.statBadgeValue}>{hero.streakDays}d 🔥</Text>
            </View>
          </View>
        </View>

        <View style={styles.xpContainer}>
          <RpgProgressBar
            label={`Total XP: ${hero.totalXp} (Level ${hero.level} Progress)`}
            current={hero.currentXpInLevel}
            max={hero.xpForNextLevel}
            fillColor={colors.gold}
          />
        </View>

        <View style={styles.sessionActionRow}>
          {isAuthenticated ? (
            <RpgButton
              title="Log Out"
              variant="secondary"
              onPress={handleLogout}
            />
          ) : (
            <RpgButton
              title="Sign In / Register Account"
              variant="secondary"
              onPress={() => router.push('/(auth)/login')}
            />
          )}
        </View>
      </RpgCard>

      <RpgCard
        title="Daily Quests"
        subtitle="Complete real-life deeds to earn authoritative XP & Gold"
      >
        {dailyQuests.map((quest) => (
          <View key={quest.id} style={styles.questRow}>
            <View style={styles.questInfo}>
              <Text style={styles.questTitle}>{quest.title}</Text>
              <Text style={styles.questActivity}>{quest.realLifeActivity}</Text>
            </View>
            <View style={styles.rewardColumn}>
              <Text style={styles.xpText}>+{quest.xpReward} XP</Text>
              <Text style={styles.coinText}>+{quest.coinReward} Gold</Text>
            </View>
          </View>
        ))}
      </RpgCard>

      <RpgCard title="Quick Navigation" subtitle="Explore Realm Modules">
        <View style={styles.quickNavGrid}>
          <TouchableOpacity
            style={styles.navTile}
            onPress={() => router.push('/shop')}
          >
            <Text style={styles.navTileTitle}>🏪 Royal Shop</Text>
            <Text style={styles.navTileSubtitle}>Spend Gold Coins</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTile}
            onPress={() => router.push('/achievements')}
          >
            <Text style={styles.navTileTitle}>🏆 Achievements</Text>
            <Text style={styles.navTileSubtitle}>Triumphs & Badges</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTile}
            onPress={() => router.push('/statistics')}
          >
            <Text style={styles.navTileTitle}>📜 Statistics</Text>
            <Text style={styles.navTileSubtitle}>Weekly & Monthly</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTile}
            onPress={() => router.push('/character-creation')}
          >
            <Text style={styles.navTileTitle}>⚔️ Classes</Text>
            <Text style={styles.navTileSubtitle}>Character Creation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navTile}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.navTileTitle}>⚙️ Settings</Text>
            <Text style={styles.navTileSubtitle}>Profile & Auth Status</Text>
          </TouchableOpacity>
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
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroName: {
    ...typography.screenTitle,
    color: colors.gold,
    fontSize: 18,
  },
  heroLevel: {
    ...typography.badge,
    color: colors.text,
    marginTop: 4,
  },
  statsBadgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statBadge: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignItems: 'center',
  },
  statBadgeLabel: {
    ...typography.badge,
    color: colors.muted,
    fontSize: 10,
  },
  statBadgeValue: {
    ...typography.statNumber,
    fontSize: 15,
  },
  xpContainer: {
    marginTop: spacing.xs,
  },
  sessionActionRow: {
    marginTop: spacing.md,
  },
  questRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  questInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  questTitle: {
    ...typography.cardTitle,
    fontSize: 15,
  },
  questActivity: {
    ...typography.bodyMuted,
  },
  rewardColumn: {
    alignItems: 'flex-end',
  },
  xpText: {
    color: colors.success,
    fontWeight: '800',
    fontSize: 13,
  },
  coinText: {
    color: colors.gold,
    fontWeight: '700',
    fontSize: 12,
  },
  quickNavGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  navTile: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    width: '48%',
  },
  navTileTitle: {
    ...typography.cardTitle,
    color: colors.gold,
    fontSize: 14,
  },
  navTileSubtitle: {
    ...typography.bodyMuted,
    fontSize: 11,
    marginTop: 2,
  },
});
