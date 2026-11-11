export const CHARACTER_CLASSES = [
  {
    id: 'Warrior',
    name: 'Warrior',
    title: 'Vanguard of Iron',
    theme: 'Strength and discipline.',
    bonuses: {
      strength: 3,
      vitality: 2,
      intelligence: 0,
      agility: 0,
      discipline: 0,
    },
    recommendedActivities: [
      'Physical exercise',
      'Fitness',
      'Discipline',
      'Consistency',
      'Challenging personal goals',
    ],
  },
  {
    id: 'Mage',
    name: 'Mage',
    title: 'Scholar of the Arcane',
    theme: 'Knowledge and intelligence.',
    bonuses: {
      strength: 0,
      intelligence: 3,
      agility: 0,
      vitality: 0,
      discipline: 2,
    },
    recommendedActivities: [
      'Studying',
      'Reading',
      'Programming',
      'Learning new skills',
      'Academic development',
    ],
  },
  {
    id: 'Ranger',
    name: 'Ranger',
    title: 'Pathfinder of the Wilds',
    theme: 'Exploration and agility.',
    bonuses: {
      strength: 0,
      intelligence: 2,
      agility: 3,
      vitality: 0,
      discipline: 0,
    },
    recommendedActivities: [
      'Exploring new places',
      'Creative activities',
      'Learning practical skills',
      'Outdoor activities',
      'Photography',
    ],
  },
  {
    id: 'Paladin',
    name: 'Paladin',
    title: 'Guardian of Balance',
    theme: 'Balance and wellbeing.',
    bonuses: {
      strength: 0,
      intelligence: 0,
      agility: 0,
      vitality: 3,
      discipline: 2,
    },
    recommendedActivities: [
      'Healthy routines',
      'Meditation',
      'Sleep schedules',
      'Personal wellbeing',
      'Helping others',
    ],
  },
];

export const QUEST_CATEGORIES = [
  'Study',
  'Fitness',
  'Wellbeing',
  'Creativity',
  'Discipline',
  'Exploration',
];

export const QUEST_DIFFICULTIES = {
  Easy: { label: 'Easy', xpReward: 20, coinReward: 8 },
  Normal: { label: 'Normal', xpReward: 40, coinReward: 15 },
  Hard: { label: 'Hard', xpReward: 75, coinReward: 25 },
  Epic: { label: 'Epic', xpReward: 150, coinReward: 50 },
};

export const ATTRIBUTE_DEFINITIONS = [
  { key: 'strength', label: 'Strength', description: 'Physical development' },
  { key: 'intelligence', label: 'Intelligence', description: 'Learning and knowledge' },
  { key: 'agility', label: 'Agility', description: 'Creativity and exploration' },
  { key: 'vitality', label: 'Vitality', description: 'Health-related routines and wellbeing' },
  { key: 'discipline', label: 'Discipline', description: 'Consistency and self-control' },
];

export const STARTER_PREVIEW_QUESTS = [
  {
    id: 'q-study-1',
    title: 'Knowledge Seeker',
    realLifeActivity: 'Study for 1 hour',
    category: 'Study',
    difficulty: 'Normal',
    xpReward: 50,
    coinReward: 15,
  },
  {
    id: 'q-fitness-1',
    title: 'Warrior Training',
    realLifeActivity: 'Exercise for 30 minutes',
    category: 'Fitness',
    difficulty: 'Normal',
    xpReward: 40,
    coinReward: 15,
  },
  {
    id: 'q-study-2',
    title: 'Ancient Knowledge',
    realLifeActivity: 'Read 20 pages',
    category: 'Study',
    difficulty: 'Easy',
    xpReward: 25,
    coinReward: 8,
  },
  {
    id: 'q-discipline-1',
    title: 'Rise of the Hero',
    realLifeActivity: 'Wake up early',
    category: 'Discipline',
    difficulty: 'Easy',
    xpReward: 20,
    coinReward: 8,
  },
  {
    id: 'q-discipline-2',
    title: 'Strategic Preparation',
    realLifeActivity: 'Complete daily planning',
    category: 'Discipline',
    difficulty: 'Easy',
    xpReward: 20,
    coinReward: 8,
  },
  {
    id: 'q-creativity-1',
    title: 'Mastery Begins',
    realLifeActivity: 'Learn a new skill',
    category: 'Creativity',
    difficulty: 'Normal',
    xpReward: 50,
    coinReward: 15,
  },
];
