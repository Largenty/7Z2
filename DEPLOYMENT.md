# Guide de Déploiement 7Z2

## 📋 Prérequis

- Node.js 18+
- Compte Supabase (gratuit)
- Supabase CLI installée : `npm install -g supabase`
- Compte Vercel ou autre hébergeur Next.js (optionnel)

---

## 🗄️ Configuration Base de Données

### 1. Créer la Table Scores

Dans le **SQL Editor** de Supabase, exécuter le fichier `supabase.sql` complet.

### 2. Appliquer la Migration de Difficulté

Si vous avez déjà des scores existants, exécuter `supabase-migration-difficulty.sql` :

```sql
ALTER TABLE public.scores
ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'normal'
CHECK (difficulty IN ('facile', 'normal', 'difficile', 'expert'));

CREATE INDEX IF NOT EXISTS idx_scores_difficulty ON public.scores (difficulty);
```

---

## 🔧 Déploiement Edge Function

### 1. Installer Supabase CLI

```bash
npm install -g supabase
```

### 2. Se Connecter à Supabase

```bash
supabase login
```

### 3. Lier le Projet

```bash
supabase link --project-ref drmdidfzeogobrmkippr
```

Remplacer `drmdidfzeogobrmkippr` par votre propre project-ref (visible dans les settings Supabase).

### 4. Déployer la Fonction

```bash
supabase functions deploy submit-score
```

### 5. Vérifier le Déploiement

```bash
supabase functions list
```

Vous devriez voir :
```
┌─────────────────┬─────────┬─────────────┐
│ Name            │ Status  │ Version     │
├─────────────────┼─────────┼─────────────┤
│ submit-score    │ ACTIVE  │ 1           │
└─────────────────┴─────────┴─────────────┘
```

### 6. Tester la Fonction

```bash
curl -i --location --request POST 'https://drmdidfzeogobrmkippr.supabase.co/functions/v1/submit-score' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "pseudo": "TestUser",
    "durationMs": 5000,
    "clicksCount": 5,
    "gridRows": 20,
    "gridCols": 30,
    "difficulty": "normal"
  }'
```

Réponse attendue : `{"success":true}`

---

## 🌐 Déploiement Frontend (Next.js)

### Option A : Vercel (Recommandé)

1. **Connecter le Repo GitHub à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer "New Project"
   - Importer le repo GitHub

2. **Configurer les Variables d'Environnement**

Dans Vercel → Settings → Environment Variables :

```env
NEXT_PUBLIC_SUPABASE_URL=https://drmdidfzeogobrmkippr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Déployer**
   - Vercel déploie automatiquement à chaque push sur `main`

### Option B : Auto-hébergement

1. **Build le projet**
```bash
npm run build
```

2. **Lancer en production**
```bash
npm start
```

3. **Configurer Nginx (exemple)**
```nginx
server {
    listen 80;
    server_name 7z2.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 Variables d'Environnement

### Fichier `.env.local` (développement)

```env
NEXT_PUBLIC_SUPABASE_URL=https://drmdidfzeogobrmkippr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **IMPORTANT** :
- Ne JAMAIS commit `.env.local` dans Git
- Ajouter `.env.local` au `.gitignore`
- Utiliser `.env.example` comme template

### Où Trouver les Clés Supabase

1. Aller sur [supabase.com](https://supabase.com/dashboard)
2. Sélectionner votre projet
3. **Settings** → **API**
4. Copier :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📦 Installation Locale

```bash
# Cloner le repo
git clone https://github.com/yourusername/7Z2.git
cd 7Z2

# Installer les dépendances
npm install

# Créer .env.local avec les variables ci-dessus
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 🧪 Tests

### Tester l'Edge Function Localement

```bash
# Lancer les fonctions localement
supabase functions serve submit-score

# Dans un autre terminal, tester
curl -i --location --request POST 'http://localhost:54321/functions/v1/submit-score' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "pseudo": "TestLocal",
    "durationMs": 3000,
    "clicksCount": 3,
    "gridRows": 20,
    "gridCols": 30,
    "difficulty": "normal"
  }'
```

### Tester le Frontend

```bash
npm run dev
```

Scénarios de test :
- [ ] Sélectionner une difficulté
- [ ] Jouer une partie
- [ ] Cliquer sur le mauvais 7Z2 (malus de 1s)
- [ ] Trouver le 722
- [ ] Enregistrer un score avec un pseudo valide
- [ ] Vérifier que le score apparaît dans le leaderboard
- [ ] Tester le filtre de difficulté dans le leaderboard

---

## 🐛 Debugging

### Voir les Logs de l'Edge Function

```bash
supabase functions logs submit-score --follow
```

### Erreurs Courantes

**"Module not found: Can't resolve '@/lib/supabaseClient'"**
→ Vérifier que `tsconfig.json` contient :
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**"Invalid API key"**
→ Vérifier que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est correcte dans `.env.local`

**"Column scores.difficulty does not exist"**
→ Exécuter la migration `supabase-migration-difficulty.sql` dans Supabase SQL Editor

**"Functions invoke error"**
→ Vérifier que l'Edge Function est déployée : `supabase functions list`

---

## 📱 Configuration Mobile

Le site est responsive et fonctionne sur mobile. Pour tester :

1. **Chrome DevTools**
   - F12 → Toggle device toolbar
   - Sélectionner "iPhone 12" ou similaire

2. **Sur Appareil Réel**
   - Déployer sur Vercel
   - Scanner le QR code depuis le mobile
   - Tester la grille tactile

---

## 🚀 Checklist Avant Production

- [ ] Edge Function déployée et testée
- [ ] Base de données configurée avec RLS
- [ ] Migration de difficulté appliquée
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Tests frontend passés
- [ ] Tests mobile effectués
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] SSL/HTTPS activé
- [ ] Logs de monitoring configurés
- [ ] Lire `SECURITY.md` pour comprendre les protections

---

## 📊 Monitoring Production

### Supabase Dashboard
- **Database** → Vérifier le nombre de rows dans `scores`
- **Functions** → Voir les invocations et erreurs
- **Logs** → Surveiller les erreurs SQL

### Vercel Dashboard
- **Analytics** → Voir le trafic
- **Deployments** → Historique des déploiements
- **Logs** → Erreurs frontend

---

## 🔄 Mise à Jour

### Mettre à Jour l'Edge Function

1. Modifier `supabase/functions/submit-score/index.ts`
2. Redéployer :
```bash
supabase functions deploy submit-score
```

### Mettre à Jour le Frontend

**Avec Vercel** : Push sur `main`, déploiement automatique

**Auto-hébergé** :
```bash
git pull
npm install
npm run build
pm2 restart 7z2  # ou votre process manager
```

---

## 📞 Support

- **Issues** : [GitHub Issues](https://github.com/yourusername/7Z2/issues)
- **Sécurité** : Voir `SECURITY.md`
- **Documentation Supabase** : [docs.supabase.com](https://supabase.com/docs)
- **Documentation Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
