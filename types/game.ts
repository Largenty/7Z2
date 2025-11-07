/**
 * Types pour le jeu 7Z2
 */

// Type pour les niveaux de difficulté
export type Difficulty = 'facile' | 'normal' | 'difficile' | 'expert';

// Configuration des niveaux de difficulté
export interface DifficultyConfig {
  name: Difficulty;
  label: string;
  description: string;
  rows: number;
  cols: number;
}

// Type pour un score dans Supabase
export interface Score {
  id: string;
  pseudo: string;
  duration_ms: number;
  clicks_count: number;
  grid_rows: number;
  grid_cols: number;
  difficulty: Difficulty;
  created_at: string;
}

// Type pour créer un nouveau score (sans id ni created_at)
export interface CreateScoreInput {
  pseudo: string;
  durationMs: number;
  clicksCount: number;
  gridRows: number;
  gridCols: number;
  difficulty: Difficulty;
}

// Type pour la position d'une cellule dans la grille
export interface CellPosition {
  row: number;
  col: number;
}

// Type pour le statut du jeu
export type GameStatus = 'idle' | 'playing' | 'finished';

// Type pour les caractères obfusqués (anti-triche)
export interface ObfuscatedChar {
  char: string; // Le caractère à afficher (variante Unicode)
  key: string; // Clé unique pour React
}

// Type pour le texte affiché dans une case
export type CellDisplayText = '7Z2' | '722';

// Configuration de la grille
export interface GridConfig {
  rows: number;
  cols: number;
}
