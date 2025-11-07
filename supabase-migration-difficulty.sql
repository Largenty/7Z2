-- ==================================================
-- Migration : Ajout de la colonne difficulty
-- ==================================================

-- Ajouter la colonne difficulty à la table existante
ALTER TABLE public.scores
ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'normal'
CHECK (difficulty IN ('facile', 'normal', 'difficile', 'expert'));

-- Créer un index pour optimiser les requêtes par difficulté
CREATE INDEX IF NOT EXISTS idx_scores_difficulty ON public.scores (difficulty);

-- Ajouter un commentaire pour la documentation
COMMENT ON COLUMN public.scores.difficulty IS 'Niveau de difficulté : facile, normal, difficile, expert';
