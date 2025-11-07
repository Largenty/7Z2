/**
 * Configuration des niveaux de difficulté
 */

import type { Difficulty, DifficultyConfig } from '@/types/game';

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  facile: {
    name: 'facile',
    label: 'Facile',
    description: '300 cases',
    rows: 15,
    cols: 20,
  },
  normal: {
    name: 'normal',
    label: 'Normal',
    description: '600 cases',
    rows: 20,
    cols: 30,
  },
  difficile: {
    name: 'difficile',
    label: 'Difficile',
    description: '1000 cases',
    rows: 25,
    cols: 40,
  },
  expert: {
    name: 'expert',
    label: 'Expert',
    description: '1500 cases',
    rows: 30,
    cols: 50,
  },
};

export function getDifficultyConfig(difficulty: Difficulty): DifficultyConfig {
  return DIFFICULTY_CONFIGS[difficulty];
}
