# Configuration Environnement - Fix CORS Error

## ❌ Problème Actuel

Erreur CORS lors de l'enregistrement des scores :
```
Access to fetch at 'https://...supabase.co/functions/v1/submit-score'
from origin 'http://localhost:3000' has been blocked by CORS policy
```

## ✅ Solution Rapide (Développement Local)

L'Edge Function n'est pas encore déployée, donc on utilise l'insertion directe pour le développement.

### Étape 1 : Vérifier `.env.local`

Ton fichier `.env.local` doit contenir :

```env
NEXT_PUBLIC_SUPABASE_URL=https://drmdidfzeogobrmkippr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ta-clé-anon-key-ici
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_USE_EDGE_FUNCTION=false
```

### Étape 2 : Redémarrer le Serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Relancer
npm run dev
```

### Étape 3 : Tester

1. Aller sur http://localhost:3000
2. Jouer une partie
3. Enregistrer un score
4. ✅ Devrait fonctionner !

Tu verras ce warning dans la console (c'est normal) :
```
⚠️  Utilisation de l'insertion directe (développement).
    Déployer l'Edge Function pour la production.
```

---

## 🔐 Mode Production (Avec Sécurité Complète)

### Quand Activer l'Edge Function ?

**En développement** : `NEXT_PUBLIC_USE_EDGE_FUNCTION=false`
- ✅ Fonctionne immédiatement
- ⚠️ Moins de sécurité (pas de validation serveur)
- ✅ Parfait pour tester

**En production** : `NEXT_PUBLIC_USE_EDGE_FUNCTION=true`
- ✅ Sécurité maximale
- ✅ Validation côté serveur
- ✅ Rate limiting
- ⚠️ Nécessite de déployer l'Edge Function

### Déployer l'Edge Function (Plus Tard)

Quand tu seras prêt pour la production :

```bash
# 1. Installer Supabase CLI
npm install -g supabase

# 2. Se connecter
supabase login

# 3. Lier le projet
supabase link --project-ref drmdidfzeogobrmkippr

# 4. Déployer
supabase functions deploy submit-score

# 5. Activer en production
# Dans Vercel → Environment Variables :
# NEXT_PUBLIC_USE_EDGE_FUNCTION=true
```

---

## 🔍 Debugging

### L'insertion directe ne fonctionne pas ?

Vérifier que RLS (Row Level Security) autorise les insertions :

1. Dashboard Supabase → **Database** → **Tables** → `scores`
2. **Policies** → Vérifier qu'il y a :
   - Policy "Enable insert access for all users" pour INSERT

Si la policy n'existe pas, exécuter dans SQL Editor :
```sql
CREATE POLICY "Enable insert access for all users"
ON public.scores
FOR INSERT
WITH CHECK (true);
```

### Voir les Logs

Dans la console du navigateur (F12), tu devrais voir :
- ✅ Warning d'insertion directe (normal en dev)
- ❌ Si erreur : vérifier les clés Supabase dans `.env.local`

---

## 📋 Checklist

- [ ] Fichier `.env.local` créé
- [ ] `NEXT_PUBLIC_USE_EDGE_FUNCTION=false` défini
- [ ] Serveur redémarré (`npm run dev`)
- [ ] Test d'enregistrement de score réussi
- [ ] Warning dans la console (normal)

---

## ⚡ TL;DR

**Pour faire fonctionner le jeu MAINTENANT** :

1. Vérifier que `.env.local` contient :
   ```env
   NEXT_PUBLIC_USE_EDGE_FUNCTION=false
   ```

2. Redémarrer :
   ```bash
   npm run dev
   ```

3. Jouer et enregistrer un score → ✅ Devrait fonctionner !

**Pour la production sécurisée** : Déployer l'Edge Function plus tard et passer à `true`.
