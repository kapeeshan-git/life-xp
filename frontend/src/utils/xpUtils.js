export const calculateLevelFromXp = (totalXp = 0) => {
  const safeXp = Math.max(0, Number(totalXp) || 0);
  return Math.floor(safeXp / 100) + 1;
};

export const calculateXpProgress = (totalXp = 0) => {
  const safeXp = Math.max(0, Number(totalXp) || 0);
  const level = calculateLevelFromXp(safeXp);
  const currentLevelProgress = safeXp % 100;
  return {
    level,
    currentLevelProgress,
    xpRequiredForLevel: 100,
  };
};
