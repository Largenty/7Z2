-- ==================================================
-- Script de création de la table scores pour 7Z2
-- ==================================================

-- Créer la table scores
CREATE TABLE IF NOT EXISTS public.scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pseudo TEXT NOT NULL,
  duration_ms INTEGER NOT NULL,
  clicks_count INTEGER NOT NULL,
  grid_rows INTEGER NOT NULL,
  grid_cols INTEGER NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'normal' CHECK (difficulty IN ('facile', 'normal', 'difficile', 'expert')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Créer un index pour optimiser les requêtes de classement (tri par duration_ms)
CREATE INDEX IF NOT EXISTS idx_scores_duration ON public.scores (duration_ms ASC);

-- Créer un index pour optimiser les requêtes par pseudo
CREATE INDEX IF NOT EXISTS idx_scores_pseudo ON public.scores (pseudo);

-- Créer un index pour optimiser les requêtes par date
CREATE INDEX IF NOT EXISTS idx_scores_created_at ON public.scores (created_at DESC);

-- Créer un index pour optimiser les requêtes par difficulté
CREATE INDEX IF NOT EXISTS idx_scores_difficulty ON public.scores (difficulty);

-- ==================================================
-- Configuration RLS (Row Level Security)
-- ==================================================

-- Activer RLS sur la table scores
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut LIRE les scores (SELECT)
CREATE POLICY "Enable read access for all users"
ON public.scores
FOR SELECT
USING (true);

-- Politique : tout le monde peut INSÉRER des scores (INSERT)
CREATE POLICY "Enable insert access for all users"
ON public.scores
FOR INSERT
WITH CHECK (true);

-- Note : pas de politique pour UPDATE ou DELETE
-- Les scores ne peuvent pas être modifiés ou supprimés par les utilisateurs

-- ==================================================
-- Vérifications et commentaires
-- ==================================================

-- Ajouter des commentaires pour la documentation
COMMENT ON TABLE public.scores IS 'Stockage des scores du jeu 7Z2';
COMMENT ON COLUMN public.scores.id IS 'Identifiant unique du score';
COMMENT ON COLUMN public.scores.pseudo IS 'Pseudo du joueur (sans authentification)';
COMMENT ON COLUMN public.scores.duration_ms IS 'Durée de la partie en millisecondes';
COMMENT ON COLUMN public.scores.clicks_count IS 'Nombre de clics effectués durant la partie';
COMMENT ON COLUMN public.scores.grid_rows IS 'Nombre de lignes de la grille';
COMMENT ON COLUMN public.scores.grid_cols IS 'Nombre de colonnes de la grille';
COMMENT ON COLUMN public.scores.difficulty IS 'Niveau de difficulté : facile, normal, difficile, expert';
COMMENT ON COLUMN public.scores.created_at IS 'Date et heure de création du score';
