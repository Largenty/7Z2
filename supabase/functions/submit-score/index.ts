// Edge Function pour valider et enregistrer les scores de manière sécurisée
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubmitScoreRequest {
  pseudo: string;
  durationMs: number;
  clicksCount: number;
  gridRows: number;
  gridCols: number;
  difficulty: string;
}

// Configuration des difficultés (doit correspondre à lib/difficulty.ts)
const DIFFICULTY_CONFIGS: Record<string, { rows: number; cols: number; minTime: number }> = {
  facile: { rows: 15, cols: 20, minTime: 500 },
  normal: { rows: 20, cols: 30, minTime: 800 },
  difficile: { rows: 25, cols: 40, minTime: 1200 },
  expert: { rows: 30, cols: 50, minTime: 1500 },
};

function validatePseudo(pseudo: string): { valid: boolean; error?: string } {
  if (!pseudo || typeof pseudo !== 'string') {
    return { valid: false, error: 'Pseudo requis' };
  }

  const trimmed = pseudo.trim();

  if (trimmed.length < 2 || trimmed.length > 20) {
    return { valid: false, error: 'Pseudo doit faire entre 2 et 20 caractères' };
  }

  // Autoriser seulement lettres, chiffres, tirets et underscores
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return { valid: false, error: 'Pseudo invalide (caractères autorisés: lettres, chiffres, -, _)' };
  }

  return { valid: true };
}

function validateScore(data: SubmitScoreRequest): { valid: boolean; error?: string } {
  // Valider la difficulté
  if (!DIFFICULTY_CONFIGS[data.difficulty]) {
    return { valid: false, error: 'Difficulté invalide' };
  }

  const config = DIFFICULTY_CONFIGS[data.difficulty];

  // Vérifier que les dimensions correspondent à la difficulté
  if (data.gridRows !== config.rows || data.gridCols !== config.cols) {
    return { valid: false, error: 'Dimensions de grille invalides pour cette difficulté' };
  }

  // Vérifier que la durée est positive et raisonnable
  if (typeof data.durationMs !== 'number' || data.durationMs < 0) {
    return { valid: false, error: 'Durée invalide' };
  }

  // Temps minimum : 500ms pour facile, plus pour les autres difficultés
  if (data.durationMs < config.minTime) {
    return { valid: false, error: 'Temps suspect (trop rapide)' };
  }

  // Temps maximum : 1 heure
  if (data.durationMs > 3600000) {
    return { valid: false, error: 'Temps trop long' };
  }

  // Vérifier le nombre de clics
  if (typeof data.clicksCount !== 'number' || data.clicksCount < 1) {
    return { valid: false, error: 'Nombre de clics invalide' };
  }

  // Maximum 1000 clics (valeur arbitraire raisonnable)
  if (data.clicksCount > 1000) {
    return { valid: false, error: 'Nombre de clics trop élevé' };
  }

  // Vérifier la cohérence durée/clics
  // Un clic ne peut pas prendre moins de 50ms en moyenne (20 clics/seconde max)
  const avgTimePerClick = data.durationMs / data.clicksCount;
  if (avgTimePerClick < 50) {
    return { valid: false, error: 'Vitesse de clics suspecte' };
  }

  return { valid: true };
}

serve(async (req) => {
  // Gérer CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Créer le client Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Parser la requête
    const data: SubmitScoreRequest = await req.json();

    // Valider le pseudo
    const pseudoValidation = validatePseudo(data.pseudo);
    if (!pseudoValidation.valid) {
      return new Response(
        JSON.stringify({ error: pseudoValidation.error }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Valider le score
    const scoreValidation = validateScore(data);
    if (!scoreValidation.valid) {
      return new Response(
        JSON.stringify({ error: scoreValidation.error }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Vérifier le rate limiting (max 5 scores par pseudo par minute)
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
    const { count } = await supabaseClient
      .from('scores')
      .select('*', { count: 'exact', head: true })
      .eq('pseudo', data.pseudo.trim())
      .gte('created_at', oneMinuteAgo);

    if (count && count >= 5) {
      return new Response(
        JSON.stringify({ error: 'Trop de soumissions. Attendez une minute.' }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Insérer le score
    const { error: insertError } = await supabaseClient.from('scores').insert([
      {
        pseudo: data.pseudo.trim(),
        duration_ms: Math.round(data.durationMs),
        clicks_count: data.clicksCount,
        grid_rows: data.gridRows,
        grid_cols: data.gridCols,
        difficulty: data.difficulty,
      },
    ]);

    if (insertError) {
      console.error('Error inserting score:', insertError);
      return new Response(
        JSON.stringify({ error: 'Erreur lors de l\'enregistrement du score' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
