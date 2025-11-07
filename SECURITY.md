# Sécurité 7Z2

## ⚠️ Mesures de Sécurité Implémentées

### 1. **Validation Côté Serveur (Edge Function)**

L'Edge Function `submit-score` valide toutes les soumissions :

#### Validation du Pseudo
- Longueur : 2-20 caractères
- Caractères autorisés : `a-z`, `A-Z`, `0-9`, `-`, `_`
- Blocage des pseudos réservés : `admin`, `root`, `system`, etc.

#### Validation des Scores
- **Durée** :
  - Minimum : 500ms (facile) à 1500ms (expert)
  - Maximum : 1 heure (3 600 000ms)
- **Nombre de clics** :
  - Minimum : 1
  - Maximum : 1000
- **Vitesse moyenne** : minimum 50ms par clic (détection de bots)
- **Dimensions de grille** : doivent correspondre à la difficulté sélectionnée

#### Rate Limiting
- Maximum **5 scores par pseudo par minute**
- Prévient le spam et les attaques par déni de service

### 2. **Protection XSS**

- Pseudos sanitizés côté client ET serveur
- Regex stricte pour bloquer les caractères spéciaux
- Pas d'injection HTML possible via les inputs

### 3. **Row Level Security (RLS) Supabase**

Dans `supabase.sql` :
```sql
-- Lecture publique
CREATE POLICY "Enable read access for all users"
ON public.scores FOR SELECT USING (true);

-- Insertion publique (validée par Edge Function)
CREATE POLICY "Enable insert access for all users"
ON public.scores FOR INSERT WITH CHECK (true);

-- Pas de UPDATE ni DELETE par les utilisateurs
```

### 4. **Sanitization des Inputs**

Fonction `sanitizePseudo()` dans `lib/user.ts` :
- Retire tous les caractères non autorisés
- Trim les espaces
- Limite à 20 caractères

### 5. **Validation des Données Côté Client**

Avant d'appeler l'API :
- Vérification des types
- Vérification des ranges
- Arrondi des nombres flottants

---

## 🚀 Déploiement de la Sécurité

### Étape 1 : Déployer l'Edge Function

1. Installer Supabase CLI :
```bash
npm install -g supabase
```

2. Connecter à votre projet :
```bash
supabase login
supabase link --project-ref drmdidfzeogobrmkippr
```

3. Déployer la fonction :
```bash
supabase functions deploy submit-score
```

4. Vérifier le déploiement :
```bash
supabase functions list
```

### Étape 2 : Configurer les Variables d'Environnement

Les variables sont automatiquement injectées par Supabase :
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### Étape 3 : Tester la Fonction

```bash
curl -i --location --request POST 'https://drmdidfzeogobrmkippr.supabase.co/functions/v1/submit-score' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "pseudo": "TestUser",
    "durationMs": 5000,
    "clicksCount": 10,
    "gridRows": 20,
    "gridCols": 30,
    "difficulty": "normal"
  }'
```

### Étape 4 : Vérifier les Politiques RLS

Dans le dashboard Supabase :
1. Aller dans **Database** → **Tables** → `scores`
2. Cliquer sur **Policies**
3. Vérifier que RLS est activé
4. Vérifier les 2 politiques (SELECT et INSERT)

---

## 🛡️ Vulnérabilités Restantes & Recommandations

### ⚠️ Ce qui N'EST PAS encore protégé

1. **Triche sophistiquée**
   - Un utilisateur technique peut toujours modifier le code client
   - **Solution** : Ajouter un système de replay/vérification des parties

2. **DDoS au niveau applicatif**
   - Rate limiting basique (5/min) peut être contourné avec plusieurs IPs
   - **Solution** : Utiliser Cloudflare ou AWS Shield

3. **Contenu offensant dans les pseudos**
   - Liste de blocage basique
   - **Solution** : Intégrer une API de modération de contenu

### 💡 Améliorations Futures

1. **CAPTCHA** : Ajouter hCaptcha/reCAPTCHA avant soumission
2. **IP Tracking** : Stocker les IPs pour détecter les abus
3. **Système de signalement** : Permettre aux utilisateurs de signaler des scores suspects
4. **Admin Panel** : Interface pour modérer et supprimer des scores
5. **Replay System** : Enregistrer les clics pour vérifier la légitimité

---

## 📊 Monitoring

### Logs Supabase Edge Functions

Voir les logs :
```bash
supabase functions logs submit-score
```

### Métriques à Surveiller

1. **Taux de rejet** : Nombre de requêtes rejetées par validation
2. **Rate limit hits** : Combien d'utilisateurs touchent la limite
3. **Temps de réponse** : Performance de l'Edge Function
4. **Erreurs serveur** : Bugs potentiels

---

## 🔐 Checklist de Sécurité

- [x] Validation côté serveur (Edge Function)
- [x] Sanitization des inputs
- [x] Rate limiting basique
- [x] Row Level Security (RLS)
- [x] Protection XSS
- [x] Validation des dimensions de grille
- [x] Détection de vitesse suspecte
- [x] Blocage des pseudos réservés
- [ ] CAPTCHA (recommandé pour production)
- [ ] IP rate limiting (recommandé pour production)
- [ ] Système de replay (optionnel)
- [ ] Modération de contenu (optionnel)

---

## 📞 En Cas de Problème

### Erreurs Courantes

**"Temps suspect (trop rapide)"**
→ Le temps minimum dépend de la difficulté. Augmenter `minTime` dans l'Edge Function si nécessaire.

**"Trop de soumissions"**
→ L'utilisateur a dépassé 5 scores/minute. Attendre 60 secondes.

**"Dimensions de grille invalides"**
→ Les dimensions ne correspondent pas à la difficulté. Vérifier `DIFFICULTY_CONFIGS`.

### Support

Pour toute question de sécurité : créer une issue sur le repo GitHub (privée si vulnérabilité).
