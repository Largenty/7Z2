# 7Z2 - Trouve le 722 ! 🎯

Un jeu de rapidité et d'observation inspiré par Pékin Express saison 21 "La Route des Glaciers".

Trouve la case **722** parmi des centaines de **7Z2** le plus rapidement possible !

## ✨ Fonctionnalités

- 🎮 **4 niveaux de difficulté** : Facile (300 cases) → Expert (1500 cases)
- ⏱️ **Timer précis** au millisecond (performance.now())
- 🏆 **Leaderboard** avec filtres par difficulté
- 📱 **100% Responsive** : Desktop, tablette, mobile
- 🛡️ **Anti-triche** : Ctrl+F ne fonctionne pas (CSS ::before)
- ⚡ **Système de malus** : +1s par mauvais clic
- 🔒 **Sécurisé** : Validation côté serveur, rate limiting, sanitization

## 🎯 Règles du Jeu

1. Une grille remplie de **7Z2** apparaît
2. Une seule case contient **722**
3. Trouve-la le plus vite possible !

⚠️ **Attention** : Chaque mauvais clic ajoute 1 seconde à ton score final.

## 🚀 Démarrage Rapide

```bash
# Cloner le repo
git clone https://github.com/yourusername/7Z2.git
cd 7Z2

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés Supabase

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 🛡️ Sécurité

Le jeu implémente plusieurs couches de sécurité :

- ✅ **Validation côté serveur** via Edge Function Supabase
- ✅ **Rate limiting** : 5 scores max par pseudo/minute
- ✅ **Sanitization** des inputs (pseudo, scores)
- ✅ **Détection de triche** : vitesse minimum, cohérence des données
- ✅ **Row Level Security (RLS)** sur Supabase
- ✅ **Protection XSS** : regex stricte sur les pseudos

Voir **[SECURITY.md](./SECURITY.md)** pour plus de détails.

## 🏗️ Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : Supabase (PostgreSQL)
- **Edge Functions** : Supabase Functions (Deno)
- **Déploiement** : Vercel (recommandé)

## 🎯 Niveaux de Difficulté

| Niveau    | Grille  | Cases | Temps Min |
|-----------|---------|-------|-----------|
| Facile    | 15×20   | 300   | 500ms     |
| Normal    | 20×30   | 600   | 800ms     |
| Difficile | 25×40   | 1000  | 1200ms    |
| Expert    | 30×50   | 1500  | 1500ms    |

## 📱 Responsive Design

- **Mobile** : Cellules 80×80px, scroll 2D
- **Tablette** : Cellules 60×45px, grille adaptative
- **Desktop** : Cellules 80×55px, grille centrée

## 📚 Documentation Complète

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guide de déploiement complet (Edge Functions, Vercel, etc.)
- **[SECURITY.md](./SECURITY.md)** - Documentation de sécurité et protections
- **[supabase.sql](./supabase.sql)** - Schéma complet de la base de données
- **[.env.example](./.env.example)** - Template des variables d'environnement

## 📊 Schéma Base de Données

```sql
CREATE TABLE scores (
  id UUID PRIMARY KEY,
  pseudo TEXT NOT NULL,
  duration_ms INTEGER NOT NULL,
  clicks_count INTEGER NOT NULL,
  grid_rows INTEGER NOT NULL,
  grid_cols INTEGER NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('facile', 'normal', 'difficile', 'expert')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔧 Configuration

### 1. Créer la Base de Données

Exécuter `supabase.sql` dans le SQL Editor Supabase

### 2. Déployer l'Edge Function

```bash
supabase login
supabase link --project-ref your-project-ref
supabase functions deploy submit-score
```

### 3. Variables d'Environnement

Créer `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Voir **[DEPLOYMENT.md](./DEPLOYMENT.md)** pour les instructions complètes.

## Structure du projet

```
7Z2/
├── app/                      # Pages Next.js (App Router)
│   ├── layout.tsx            # Layout global avec Header
│   ├── page.tsx              # Page d'accueil
│   ├── play/page.tsx         # Page de jeu
│   ├── leaderboard/page.tsx  # Classement
│   └── globals.css           # Styles globaux
├── components/               # Composants React
│   ├── Header.tsx            # Header avec gestion du pseudo
│   ├── Timer.tsx             # Timer avec performance.now()
│   ├── GameGrid.tsx          # Grille de jeu anti-triche
│   └── EndGameModal.tsx      # Modal de fin de partie
├── lib/                      # Librairies et helpers
│   ├── supabaseClient.ts     # Client Supabase
│   ├── scores.ts             # Gestion des scores
│   ├── time.ts               # Formatage du temps
│   ├── user.ts               # Gestion du pseudo (localStorage)
│   └── antiCheat.ts          # Logique anti-triche
├── types/                    # Types TypeScript
│   └── game.ts               # Types pour le jeu
├── supabase.sql              # Script SQL pour créer la table
├── .env.local.example        # Exemple de configuration
└── README.md                 # Ce fichier
```

## Comment ça marche ?

### Le jeu

1. Clique sur "Start" pour démarrer une partie
2. Une grille de 20x20 cases apparaît, presque toutes affichent "7Z2"
3. Une seule case affiche "722"
4. Trouve-la le plus vite possible !
5. À la fin, entre ton pseudo pour enregistrer ton score

### Anti-triche

Le jeu implémente plusieurs techniques pour empêcher la triche par Ctrl+F :

- **Variantes Unicode** : utilise des caractères visuellement identiques mais techniquement différents (ex: "7" normal vs "７" fullwidth)
- **Fragmentation** : chaque caractère est dans un `<span>` séparé
- **Caractères zero-width** : insertion aléatoire de caractères invisibles
- **Uniformité DOM** : toutes les cases ont exactement la même structure HTML

Résultat : chercher "722" ou "7Z2" avec Ctrl+F ne donne aucun résultat utile.

### Système de scores

- Les scores sont stockés dans Supabase
- Le meilleur score = le temps le plus bas
- Pas d'authentification : juste un pseudo stocké en localStorage
- RLS (Row Level Security) activé pour sécuriser les données

## 🔧 Scripts Disponibles

```bash
npm run dev          # Développement
npm run build        # Build production
npm start            # Lancer en production
npm run lint         # Linter TypeScript/ESLint
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche : `git checkout -b feature/AmazingFeature`
3. Commit : `git commit -m 'Add AmazingFeature'`
4. Push : `git push origin feature/AmazingFeature`
5. Ouvrir une Pull Request

## 📝 Licence

© 2025 Ludovic Argenty. Tous droits réservés.

## 🎬 Inspiration

Jeu inspiré par [Pékin Express](https://www.m6.fr/emission-pekin_express) saison 21 "La Route des Glaciers" diffusé tous les vendredis sur M6.

## 👨‍💻 Auteur

**Ludovic Argenty**
- Portfolio : [ludovicargenty.com](https://ludovicargenty.com)
- Projet : [fetch-me.dev](https://fetch-me.dev)

## 🙏 Remerciements

- M6 et l'équipe de Pékin Express pour l'inspiration
- La communauté Next.js et Supabase
- Tous les joueurs qui testent et améliorent le jeu !

---

**Trouve le 722 parmi les 7Z2 - Un jeu de rapidité et d'observation** 🎯
