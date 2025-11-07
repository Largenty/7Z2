/**
 * Module anti-triche pour le jeu 7Z2
 *
 * STRATÉGIE :
 * - Utilise les mêmes caractères normaux partout (taille identique garantie)
 * - Fragmente chaque caractère dans un élément séparé
 * - Insère des caractères zero-width aléatoires pour casser Ctrl+F
 *
 * RÉSULTAT : Les chaînes "722" et "7Z2" ne sont jamais rendues littéralement dans le DOM
 */

import type { ObfuscatedChar, CellDisplayText } from '@/types/game';

// Caractère invisible zero-width space (U+200B)
const ZERO_WIDTH_SPACE = '\u200B';

/**
 * Génère un tableau de caractères obfusqués pour un texte donné
 *
 * Pour chaque caractère :
 * 1. Utilise le caractère normal (même taille partout)
 * 2. Ajoute aléatoirement des zero-width spaces pour casser Ctrl+F
 *
 * @param text - Le texte à obfusquer ("7Z2" ou "722")
 * @returns Un tableau de caractères obfusqués avec clés uniques pour React
 */
export function generateObfuscatedText(text: CellDisplayText): ObfuscatedChar[] {
  const chars = text.split('');
  const result: ObfuscatedChar[] = [];

  chars.forEach((char, index) => {
    // Utilise le caractère normal pour garantir la même taille
    // Mais ajoute aléatoirement des zero-width spaces pour casser Ctrl+F
    const shouldAddZeroWidth = Math.random() > 0.3 && index > 0;
    const finalChar = shouldAddZeroWidth ? ZERO_WIDTH_SPACE + char : char;

    result.push({
      char: finalChar,
      key: `char-${index}-${Math.random().toString(36).substring(2, 9)}`,
    });
  });

  return result;
}

/**
 * Génère une position aléatoire pour la case spéciale
 *
 * @param rows - Nombre de lignes de la grille
 * @param cols - Nombre de colonnes de la grille
 * @returns Position { row, col } de la case spéciale
 */
export function generateRandomSpecialPosition(rows: number, cols: number): { row: number; col: number } {
  return {
    row: Math.floor(Math.random() * rows),
    col: Math.floor(Math.random() * cols),
  };
}

/**
 * Vérifie si une position correspond à la case spéciale
 *
 * @param row - Ligne cliquée
 * @param col - Colonne cliquée
 * @param specialRow - Ligne de la case spéciale
 * @param specialCol - Colonne de la case spéciale
 * @returns true si c'est la case spéciale
 */
export function isSpecialCell(
  row: number,
  col: number,
  specialRow: number,
  specialCol: number
): boolean {
  return row === specialRow && col === specialCol;
}
