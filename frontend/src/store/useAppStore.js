import { create } from 'zustand';
import { checkApiHealth, API_BASE_URL } from '../services/api';

export const useAppStore = create((set) => ({
  apiBaseUrl: API_BASE_URL,
  serverStatus: 'checking', // 'checking' | 'online' | 'offline'
  databaseStatus: 'unknown',
  lastCheckedAt: null,
  serverError: null,

  // Preview Hero state for Phase 1 UI demonstration (will be replaced by live MongoDB player data in Phases 2-3)
  previewHero: {
    characterName: 'Aster',
    characterClass: 'Mage',
    level: 5,
    currentXpInLevel: 50,
    xpForNextLevel: 100,
    totalXp: 450,
    coins: 250,
    streakDays: 4,
    attributes: {
      strength: 5,
      intelligence: 11,
      agility: 6,
      vitality: 6,
      discipline: 9,
    },
  },

  verifyBackendConnection: async () => {
    set({ serverStatus: 'checking', serverError: null });
    try {
      const data = await checkApiHealth();
      set({
        serverStatus: data?.status === 'OK' ? 'online' : 'offline',
        databaseStatus: data?.database?.state || 'unknown',
        lastCheckedAt: data?.timestamp || new Date().toISOString(),
        serverError: null,
      });
      return data;
    } catch (error) {
      set({
        serverStatus: 'offline',
        databaseStatus: 'disconnected',
        lastCheckedAt: new Date().toISOString(),
        serverError: error.message,
      });
      return null;
    }
  },
}));

export default useAppStore;
