/**
 * Gestion des scores avec Supabase
 */

import { supabase } from './supabaseClient';
import type { Score, CreateScoreInput } from '@/types/game';

/**
 * Crée un nouveau score
 * Utilise l'Edge Function en production, insertion directe en développement
 *
 * @param input - Données du score à créer
 * @throws Error si l'insertion échoue ou si les données sont invalides
 */
export async function createScore(input: CreateScoreInput): Promise<void> {
  const { pseudo, durationMs, clicksCount, gridRows, gridCols, difficulty } = input;

  // Validation côté client basique
  if (!pseudo || pseudo.trim().length < 2 || pseudo.trim().length > 20) {
    throw new Error('Pseudo invalide (2-20 caractères)');
  }

  if (durationMs < 0 || clicksCount < 1) {
    throw new Error('Données de score invalides');
  }

  const useEdgeFunction = process.env.NEXT_PUBLIC_USE_EDGE_FUNCTION === 'true';

  if (useEdgeFunction) {
    // Mode production : utiliser l'Edge Function sécurisée
    try {
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
      console.error('Error creating score with Edge Function:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Impossible d\'enregistrer le score');
    }
  } else {
    // Mode développement : insertion directe (moins sécurisé mais fonctionne sans Edge Function)
    console.warn('⚠️  Utilisation de l\'insertion directe (développement). Déployer l\'Edge Function pour la production.');

    try {
      const { error } = await supabase.from('scores').insert([
        {
          pseudo: pseudo.trim(),
          duration_ms: Math.round(durationMs),
          clicks_count: clicksCount,
          grid_rows: gridRows,
          grid_cols: gridCols,
          difficulty,
        },
      ]);

      if (error) {
        console.error('Error creating score:', error);
        throw new Error(`Impossible d'enregistrer le score : ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating score:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Impossible d\'enregistrer le score');
    }
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
