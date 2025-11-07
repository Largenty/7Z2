/**
 * Gestion du pseudo utilisateur (localStorage, pas de vrai login)
 */

const STORAGE_KEY = 'sevenz2_current_user';

/**
 * Récupère le pseudo actuel depuis le localStorage
 *
 * @returns Le pseudo ou null si non défini
 */
export function getCurrentPseudo(): string | null {
  if (typeof window === 'undefined') {
    return null; // Côté serveur, pas de localStorage
  }

  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error reading pseudo from localStorage:', error);
    return null;
  }
}

/**
 * Sauvegarde le pseudo dans le localStorage
 *
 * @param pseudo - Le pseudo à sauvegarder
 */
export function savePseudo(pseudo: string): void {
  if (typeof window === 'undefined') {
    return; // Côté serveur, impossible de sauvegarder
  }

  try {
    localStorage.setItem(STORAGE_KEY, pseudo);
  } catch (error) {
    console.error('Error saving pseudo to localStorage:', error);
  }
}

/**
 * Supprime le pseudo du localStorage
 */
export function clearPseudo(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing pseudo from localStorage:', error);
  }
}

/**
 * Sanitize un pseudo en retirant les caractères dangereux
 *
 * @param pseudo - Le pseudo à nettoyer
 * @returns Le pseudo nettoyé
 */
export function sanitizePseudo(pseudo: string): string {
  // Trim et nettoyer
  let cleaned = pseudo.trim();

  // Supprimer tous les caractères qui ne sont pas lettres, chiffres, -, _
  cleaned = cleaned.replace(/[^a-zA-Z0-9\-_]/g, '');

  // Limiter à 20 caractères
  cleaned = cleaned.substring(0, 20);

  return cleaned;
}

/**
 * Valide un pseudo
 *
 * @param pseudo - Le pseudo à valider
 * @returns true si valide, false sinon
 */
export function isValidPseudo(pseudo: string): boolean {
  // Protection contre les valeurs nulles/undefined
  if (!pseudo || typeof pseudo !== 'string') {
    return false;
  }

  // Trim les espaces
  const trimmed = pseudo.trim();

  // Doit faire entre 2 et 20 caractères
  if (trimmed.length < 2 || trimmed.length > 20) {
    return false;
  }

  // Pas de caractères spéciaux dangereux (autorise lettres, chiffres, -, _)
  const validPattern = /^[a-zA-Z0-9\-_]+$/;
  if (!validPattern.test(trimmed)) {
    return false;
  }

  // Bloquer les pseudos offensants courants
  const blockedWords = ['admin', 'root', 'system', 'null', 'undefined', 'bot'];
  const lowerPseudo = trimmed.toLowerCase();
  if (blockedWords.some(word => lowerPseudo === word)) {
    return false;
  }

  return true;
}
