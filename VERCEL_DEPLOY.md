# Déploiement sur Vercel - Guide Rapide

## 🚀 Déploiement Automatique

### Étape 1 : Connecter le Repo GitHub

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer **"Add New Project"**
3. Importer depuis GitHub
4. Sélectionner le repo `7Z2`
5. Cliquer **"Deploy"**

Vercel détectera automatiquement Next.js et configurera tout.

### Étape 2 : Configurer les Variables d'Environnement

Dans **Vercel Dashboard** → **Settings** → **Environment Variables**, ajouter :

```env
NEXT_PUBLIC_SUPABASE_URL=https://drmdidfzeogobrmkippr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon-supabase
NEXT_PUBLIC_SITE_URL=https://votre-projet.vercel.app
NEXT_PUBLIC_USE_EDGE_FUNCTION=false
```

**Important** :
- Cocher **Production**, **Preview**, et **Development**
- Remplacer les valeurs par tes vraies clés Supabase
- ⚠️ Laisser `NEXT_PUBLIC_USE_EDGE_FUNCTION=false` pour l'instant (on l'activera après avoir déployé l'Edge Function)

### Étape 3 : Mettre à Jour les Fichiers SEO

Une fois déployé, récupère ton URL Vercel (ex: `7z2.vercel.app`) et mets à jour :

**`public/sitemap.xml`** :
```xml
<loc>https://7z2.vercel.app/</loc>
```

**`public/robots.txt`** :
```txt
Sitemap: https://7z2.vercel.app/sitemap.xml
```

Commit et push ces changements, Vercel redéploiera automatiquement.

---

## 🔧 Déploiement des Edge Functions Supabase

**Important** : Les Edge Functions Supabase sont déployées SÉPARÉMENT de Vercel.

### Déployer l'Edge Function

```bash
# 1. Installer Supabase CLI
npm install -g supabase

# 2. Se connecter
supabase login

# 3. Lier le projet
supabase link --project-ref drmdidfzeogobrmkippr

# 4. Déployer la fonction
supabase functions deploy submit-score

# 5. Vérifier
supabase functions list
```

Tu devrais voir :
```
┌──────────────┬────────┬──────────┐
│ Name         │ Status │ Version  │
├──────────────┼────────┼──────────┤
│ submit-score │ ACTIVE │ 1        │
└──────────────┴────────┴──────────┘
```

### Activer l'Edge Function en Production

Une fois l'Edge Function déployée et testée :

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. Modifier `NEXT_PUBLIC_USE_EDGE_FUNCTION` :
   ```
   NEXT_PUBLIC_USE_EDGE_FUNCTION=true
   ```
3. **Redéployer** (Vercel le fait automatiquement ou manuellement via "Redeploy")

✅ Les scores seront maintenant validés côté serveur avec toutes les protections de sécurité !

---

## 🌐 Configuration Domaine Personnalisé (Optionnel)

### Sur Vercel

1. **Settings** → **Domains**
2. Ajouter ton domaine : `7z2.ludovicargenty.com`
3. Suivre les instructions DNS

### Mettre à Jour les Variables

Une fois le domaine configuré :

1. Dans Vercel → **Environment Variables**
2. Modifier `NEXT_PUBLIC_SITE_URL` :
   ```env
   NEXT_PUBLIC_SITE_URL=https://7z2.ludovicargenty.com
   ```
3. Redéployer (Vercel le fait automatiquement)

4. Mettre à jour `sitemap.xml` et `robots.txt` avec le nouveau domaine

---

## 🔍 Vérifications Post-Déploiement

### 1. Tester le Site

Ouvrir l'URL Vercel et vérifier :
- [ ] Page d'accueil charge
- [ ] Sélection de difficulté fonctionne
- [ ] Jeu se lance
- [ ] Score s'enregistre (avec Edge Function)
- [ ] Leaderboard affiche les scores
- [ ] Filtres de difficulté fonctionnent

### 2. Vérifier les Edge Functions

Tester l'enregistrement d'un score :
```bash
curl -X POST https://drmdidfzeogobrmkippr.supabase.co/functions/v1/submit-score \
  -H "Authorization: Bearer votre-anon-key" \
  -H "Content-Type: application/json" \
  -d '{
    "pseudo": "TestVercel",
    "durationMs": 5000,
    "clicksCount": 5,
    "gridRows": 20,
    "gridCols": 30,
    "difficulty": "normal"
  }'
```

Résultat attendu : `{"success":true}`

### 3. Tester le SEO

#### Open Graph
1. **Facebook Debugger** : [developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
   - Entrer ton URL Vercel
   - Vérifier que l'image og-image.png s'affiche

#### Twitter Card
2. **Twitter Validator** : [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

#### Lighthouse
3. Dans Chrome (F12) → **Lighthouse** → **Generate Report**
   - SEO Score > 90
   - Performance > 90

### 4. Vérifier les Logs

En cas d'erreur :

**Vercel** :
```bash
vercel logs
```

Ou dans le dashboard : **Deployments** → Cliquer sur le déploiement → **Function Logs**

**Supabase Edge Functions** :
```bash
supabase functions logs submit-score
```

---

## 🐛 Troubleshooting

### Erreur : "Cannot find module supabase/functions"

✅ **Solution** : C'est normal ! Le dossier `supabase/` est exclu de Next.js (voir `tsconfig.json`). Les Edge Functions sont déployées séparément via Supabase CLI.

### Erreur : "Invalid API key"

✅ **Solution** : Vérifier que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est correcte dans les variables d'environnement Vercel.

### Erreur : "Functions invoke error"

✅ **Solution** : L'Edge Function n'est pas déployée. Exécuter :
```bash
supabase functions deploy submit-score
```

### Les scores ne s'enregistrent pas

1. Vérifier les logs Vercel : erreurs réseau ?
2. Vérifier les logs Supabase : validation échouée ?
3. Tester l'Edge Function avec curl (voir ci-dessus)

### L'image og-image.png ne s'affiche pas

1. Vérifier que le fichier existe dans `/public/og-image.png`
2. Vérifier `NEXT_PUBLIC_SITE_URL` dans Vercel
3. Forcer le refresh du cache Facebook :
   - Facebook Debugger → "Scrape Again"

---

## 📊 Monitoring

### Vercel Analytics

Activer gratuitement :
1. **Analytics** tab dans le projet Vercel
2. Voir les visites, pays, devices

### Supabase Monitoring

1. Dashboard Supabase → **Database** → Vérifier le nombre de rows
2. **Functions** → Voir le nombre d'invocations
3. **Logs** → Surveiller les erreurs

---

## 🔄 Redéploiement

### Automatique
Chaque `git push` sur `main` redéploie automatiquement sur Vercel.

### Manuel
```bash
# Depuis le terminal local
vercel --prod
```

### Edge Function
```bash
# Après modification de supabase/functions/submit-score/index.ts
supabase functions deploy submit-score
```

---

## ✅ Checklist Finale

- [ ] Projet déployé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Edge Function déployée sur Supabase
- [ ] Test : Enregistrer un score
- [ ] Test : Voir le leaderboard
- [ ] sitemap.xml mis à jour avec URL production
- [ ] robots.txt mis à jour
- [ ] Test Open Graph (Facebook Debugger)
- [ ] Test Twitter Card
- [ ] Lighthouse score > 90
- [ ] Google Search Console configuré
- [ ] Sitemap soumis à Google

---

## 🎉 C'est Déployé !

Ton jeu est maintenant en ligne ! Partage le lien :
- Twitter/X
- LinkedIn
- Reddit r/WebGames
- Product Hunt

**URL du jeu** : https://votre-projet.vercel.app

---

## 📞 Support

En cas de problème :
1. Vérifier les logs Vercel
2. Vérifier les logs Supabase
3. Consulter [DEPLOYMENT.md](./DEPLOYMENT.md) pour plus de détails
4. Créer une issue GitHub si nécessaire
