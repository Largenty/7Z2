# 🚀 Démarrage Rapide - 7Z2

## ⚡ En 3 Minutes

### 1. Installer les Dépendances

```bash
npm install
```

### 2. Configurer l'Environnement

Créer `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://drmdidfzeogobrmkippr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ta-clé-anon-ici
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_USE_EDGE_FUNCTION=false
```

**Où trouver les clés ?**
- Dashboard Supabase → **Settings** → **API**
- Copier **Project URL** et **anon public** key

### 3. Lancer le Projet

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

✅ **Le jeu fonctionne !**

---

## 🎮 Tester le Jeu

1. Cliquer **"Jouer"**
2. Choisir une difficulté
3. Cliquer **"Start"**
4. Trouver le **722** parmi les **7Z2**
5. Enregistrer ton score

---

## ⚠️ Erreur CORS ?

Si tu vois cette erreur :
```
Access to fetch at '...supabase.co/functions/v1/submit-score'
has been blocked by CORS policy
```

**Solution** : Vérifier que dans `.env.local` :
```env
NEXT_PUBLIC_USE_EDGE_FUNCTION=false
```

Puis redémarrer :
```bash
# Ctrl+C pour arrêter
npm run dev
```

---

## 📚 Prochaines Étapes

### Développement

- ✅ Le jeu fonctionne en local
- ✅ Les scores s'enregistrent
- ⚠️ Mode développement (insertion directe, moins sécurisé)

### Production (Plus Tard)

1. **Créer les assets visuels** (logo, favicons)
   - Voir `public/LOGO_INSTRUCTIONS.md`

2. **Déployer sur Vercel**
   - Voir `VERCEL_DEPLOY.md`

3. **Déployer l'Edge Function** (sécurité)
   - Voir `DEPLOYMENT.md`

4. **Optimiser le SEO**
   - Voir `SEO.md`

---

## 📂 Structure du Projet

```
7Z2/
├── app/                  # Pages Next.js
│   ├── page.tsx         # Accueil
│   ├── play/page.tsx    # Jeu
│   └── leaderboard/     # Classement
├── components/          # Composants React
├── lib/                 # Librairies (scores, user, etc.)
├── public/             # Assets statiques
├── supabase/           # Edge Functions (optionnel)
└── .env.local          # Variables d'environnement (à créer)
```

---

## 🆘 Aide

### Problèmes Courants

**"Cannot find module '@/lib/...'"**
→ Vérifier que `tsconfig.json` contient `"@/*": ["./*"]`

**"Invalid API key"**
→ Vérifier `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans `.env.local`

**"Table scores does not exist"**
→ Exécuter `supabase.sql` dans Supabase SQL Editor

**Scores ne s'enregistrent pas**
→ Voir `ENV_SETUP.md` pour la configuration complète

### Documentation Complète

- **[ENV_SETUP.md](./ENV_SETUP.md)** - Fix erreur CORS et configuration
- **[VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)** - Déploiement Vercel
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Déploiement complet
- **[SECURITY.md](./SECURITY.md)** - Sécurité
- **[SEO.md](./SEO.md)** - Référencement

---

## ✅ Checklist

- [ ] `npm install` exécuté
- [ ] `.env.local` créé avec les bonnes clés
- [ ] `npm run dev` lancé
- [ ] Jeu accessible sur http://localhost:3000
- [ ] Test : Jouer une partie
- [ ] Test : Enregistrer un score
- [ ] Tout fonctionne !

---

**Bon jeu ! 🎯**
