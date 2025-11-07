/**
 * Gestion des scores avec Supabase
 */

import { supabase } from './supabaseClient';
import type { Score, CreateScoreInput } from '@/types/game';

/**
 * Crée un nouveau score via l'Edge Function sécurisée
 *
 * @param input - Données du score à créer
 * @throws Error si l'insertion échoue ou si les données sont invalides
 */
export async function createScore(input: CreateScoreInput): Promise<void> {
  const { pseudo, durationMs, clicksCount, gridRows, gridCols, difficulty } = input;

  // Validation côté client basique avant d'appeler le serveur
  if (!pseudo || pseudo.trim().length < 2 || pseudo.trim().length > 20) {
    throw new Error('Pseudo invalide (2-20 caractères)');
  }

  if (durationMs < 0 || clicksCount < 1) {
    throw new Error('Données de score invalides');
  }

  try {
    // Appeler l'Edge Function pour validation et insertion sécurisées
    const { data, error } = await supabase.functions.invoke('submit-score', {
      body: {
        pseudo: pseudo.trim(),
        durationMs: Math.round(durationMs),
        clicksCount,
        gridRows,
        gridCols,
        difficulty,
      },
    });

    if (error) {
      console.error('Error calling submit-score function:', error);
      throw new Error(error.message || 'Erreur lors de l\'enregistrement du score');
    }

    if (data?.error) {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Error creating score:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Impossible d\'enregistrer le score');
  }
}

/**
 * Récupère les meilleurs scores (les plus rapides)
 *
 * @param limit - Nombre maximum de scores à récupérer
 * @param difficulty - Filtre optionnel par niveau de difficulté
 * @returns Liste des meilleurs scores, triés par durée croissante
 * @throws Error si la requête échoue
 */
export async function getTopScores(limit: number = 50, difficulty?: string): Promise<Score[]> {
  let query = supabase
    .from('scores')
    .select('*')
    .order('duration_ms', { ascending: true })
    .limit(limit);

  if (difficulty) {
    query = query.eq('difficulty', difficulty);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching scores:', error);
    throw new Error(`Impossible de charger les scores : ${error.message}`);
  }

  return data || [];
}

/**
 * Récupère tous les scores d'un joueur spécifique
 *
 * @param pseudo - Pseudo du joueur
 * @returns Liste des scores du joueur, triés par date décroissante
 */
export async function getScoresByPseudo(pseudo: string): Promise<Score[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('pseudo', pseudo)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching scores by pseudo:', error);
    return [];
  }

  return data || [];
}

/**
 * Récupère le meilleur score (le plus rapide) d'un joueur
 *
 * @param pseudo - Pseudo du joueur
 * @returns Le meilleur score du joueur, ou null si aucun score
 */
export async function getBestScoreByPseudo(pseudo: string): Promise<Score | null> {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('pseudo', pseudo)
    .order('duration_ms', { ascending: true })
    .limit(1)
    .single();

  if (error) {
    // Si aucun score trouvé, ce n'est pas une vraie erreur
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching best score:', error);
    return null;
  }

  return data;
}
