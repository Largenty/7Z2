/**
 * Utilitaires pour la gestion du temps
 */

/**
 * Formate une durée en millisecondes en format lisible mm:ss.ms
 *
 * @param ms - Durée en millisecondes
 * @returns Chaîne formatée (ex: "01:23.45")
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10); // Garder 2 chiffres

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

/**
 * Formate une durée en millisecondes en format court pour le leaderboard
 *
 * @param ms - Durée en millisecondes
 * @returns Chaîne formatée (ex: "12.53 s" ou "1:23.45")
 */
export function formatTimeShort(ms: number): string {
  const totalSeconds = ms / 1000;

  // Si moins d'une minute, afficher uniquement les secondes
  if (totalSeconds < 60) {
    return `${totalSeconds.toFixed(2)} s`;
  }

  // Sinon, utiliser le format complet
  return formatTime(ms);
}

/**
 * Formate une date ISO en format lisible
 *
 * @param isoDate - Date au format ISO 8601
 * @returns Date formatée (ex: "07/11/2025")
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Formate une date ISO en format lisible avec heure
 *
 * @param isoDate - Date au format ISO 8601
 * @returns Date et heure formatées (ex: "07/11/2025 à 14:30")
 */
export function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  const formattedDate = formatDate(isoDate);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${formattedDate} à ${hours}:${minutes}`;
}
