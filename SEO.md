# Guide SEO - 7Z2

Ce document explique toutes les optimisations SEO mises en place et comment améliorer le référencement du site.

## ✅ Optimisations Implémentées

### 1. **Metadata Complètes** (`app/layout.tsx`)

#### Titre et Description
```typescript
title: '7Z2 - Trouve le 722 ! | Jeu de Rapidité et Observation'
description: 'Jeu de rapidité inspiré par Pékin Express...'
```

- ✅ Titre optimisé avec mots-clés principaux
- ✅ Description accrocheuse (155-160 caractères)
- ✅ Template pour pages enfants : `%s | 7Z2`

#### Mots-clés
```typescript
keywords: ['7Z2', '722', 'jeu de rapidité', 'Pékin Express', ...]
```

- ✅ 13 mots-clés pertinents
- ✅ Mix français/anglais pour audience internationale

#### Open Graph (Facebook, Discord, LinkedIn)
```typescript
openGraph: {
  type: 'website',
  locale: 'fr_FR',
  title: '7Z2 - Trouve le 722 ! | Jeu de Rapidité',
  images: [{ url: '/og-image.png', width: 1200, height: 630 }]
}
```

- ✅ Image sociale 1200×630px
- ✅ Titre et description optimisés
- ✅ URL canonique

#### Twitter Card
```typescript
twitter: {
  card: 'summary_large_image',
  creator: '@ludovicargenty'
}
```

- ✅ Large image card pour meilleur engagement
- ✅ Créateur identifié

### 2. **Fichiers SEO Essentiels**

#### `robots.txt`
```txt
User-agent: *
Allow: /
Sitemap: https://votre-domaine.com/sitemap.xml
```

- ✅ Autorise tous les robots
- ✅ Pointe vers le sitemap

#### `sitemap.xml`
```xml
<url>
  <loc>https://votre-domaine.com/</loc>
  <priority>1.0</priority>
  <changefreq>weekly</changefreq>
</url>
```

- ✅ 3 pages principales indexées
- ✅ Priorités définies (1.0 pour home, 0.9 pour /play)
- ✅ Fréquence de changement indiquée

#### `manifest.json` (PWA)
```json
{
  "name": "7Z2 - Trouve le 722",
  "theme_color": "#000000",
  "categories": ["games", "entertainment"]
}
```

- ✅ Progressive Web App ready
- ✅ Catégories définies
- ✅ Icônes 192×192 et 512×512

### 3. **Favicons et Icônes**

Structure attendue dans `/public` :
- `favicon.ico` (32×32)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

### 4. **Images Sociales**

- **og-image.png** (1200×630px) - Open Graph
  - Utilisée par Facebook, LinkedIn, Discord, WhatsApp
  - Doit contenir : logo 7Z2, slogan, design noir/blanc

### 5. **Structure Sémantique HTML**

- ✅ Balises `<header>`, `<main>`, `<footer>`
- ✅ Headings hiérarchiques (`h1`, `h2`, `h3`)
- ✅ Balises `<nav>` pour navigation
- ✅ Attributs `alt` sur images (quand ajoutées)

### 6. **Performance**

- ✅ Next.js 14 avec App Router (SSR/SSG)
- ✅ Images optimisées automatiquement (Next/Image)
- ✅ CSS-in-JS pour critical CSS inline
- ✅ Font preloading (Google Fonts)

---

## 🚀 Actions à Faire

### Étape 1 : Créer les Visuels

#### Logo Principal
1. Créer `logo.svg` ou `logo.png` (512×512px)
   - Style : noir/blanc minimaliste
   - Texte : "7Z2" en Nunito Sans Black
   - Fond : blanc

2. Placer dans `/public/logo.png`

#### Favicons
1. Aller sur [favicon.io](https://favicon.io/favicon-generator/)
2. Configuration :
   - Texte : "7Z2"
   - Background : White (#FFFFFF)
   - Font : Nunito Sans Black
   - Font Size : 110
   - Font Color : Black (#000000)
3. Télécharger le pack et extraire dans `/public`

#### Image Open Graph
1. Créer un design 1200×630px sur [Canva](https://canva.com) ou Figma
2. Contenu suggéré :
   ```
   ┌─────────────────────────────────────┐
   │  7Z2                                │  (très gros, noir)
   │                                     │
   │  Trouve le 722 parmi les 7Z2        │
   │  Jeu de rapidité • 4 niveaux        │
   │  Gratuit • ludovicargenty.com       │
   └─────────────────────────────────────┘
   ```
3. Exporter en PNG et placer dans `/public/og-image.png`

### Étape 2 : Configurer l'URL du Site

#### Développement
Dans `.env.local` :
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Production (Vercel)
Dans **Vercel Dashboard** → **Settings** → **Environment Variables** :
```env
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

### Étape 3 : Mettre à Jour les Fichiers

#### `public/sitemap.xml`
Remplacer `https://votre-domaine.com` par votre vraie URL :
```xml
<loc>https://7z2.votredomaine.com/</loc>
```

#### `public/robots.txt`
```txt
Sitemap: https://7z2.votredomaine.com/sitemap.xml
```

### Étape 4 : Soumettre à Google

#### Google Search Console
1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Ajouter la propriété (URL de votre site)
3. Vérifier la propriété (DNS ou fichier HTML)
4. Soumettre le sitemap : `https://votre-domaine.com/sitemap.xml`

#### Bing Webmaster Tools
1. Aller sur [bing.com/webmasters](https://www.bing.com/webmasters)
2. Répéter le processus

---

## 📊 Vérifications SEO

### Tester les Metadata

#### Open Graph / Twitter Card
1. **Facebook Debugger** : [developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
   - Entrer l'URL du site
   - Cliquer "Scrape Again" pour mettre à jour le cache
   - Vérifier que l'image og-image.png s'affiche

2. **Twitter Card Validator** : [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
   - Entrer l'URL
   - Vérifier le preview

3. **LinkedIn Post Inspector** : [linkedin.com/post-inspector/](https://www.linkedin.com/post-inspector/)

#### Lighthouse (Performance & SEO)
Dans Chrome DevTools (F12) :
1. Onglet **Lighthouse**
2. Cocher **SEO** + **Performance**
3. Cliquer "Generate report"
4. Objectif : **90+ en SEO**, **90+ en Performance**

#### Structured Data
Tester sur [schema.org validator](https://validator.schema.org/)

---

## 🎯 Mots-clés Ciblés

### Primaires
- 7Z2
- 722
- Trouve le 722
- Jeu de rapidité

### Secondaires
- Pékin Express jeu
- Jeu d'observation
- Jeu gratuit en ligne
- Challenge rapide
- Jeu de réflexes

### Long-tail
- "trouve le 722 parmi les 7Z2"
- "jeu inspiré Pékin Express"
- "jeu de rapidité gratuit navigateur"

---

## 📈 Analytics (Recommandé)

### Google Analytics 4
1. Créer une propriété GA4
2. Ajouter le tracking script dans `app/layout.tsx`

```typescript
import Script from 'next/script'

export default function RootLayout() {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      ...
    </html>
  )
}
```

### Plausible Analytics (Alternative Privacy-Friendly)
Plus simple et respectueux de la vie privée :
```typescript
<Script defer data-domain="votre-domaine.com" src="https://plausible.io/js/script.js" />
```

---

## 🔗 Backlinks et Promotion

### Soumissions Gratuites
- [Product Hunt](https://www.producthunt.com/) - Lancer le produit
- [Indie Hackers](https://www.indiehackers.com/) - Partager dans la communauté
- [Reddit r/WebGames](https://reddit.com/r/WebGames) - Poster le jeu
- [Hacker News Show HN](https://news.ycombinator.com/showhn.html)

### Réseaux Sociaux
- Twitter/X : Tweet avec screenshot + lien
- LinkedIn : Post professionnel avec contexte
- Facebook : Partager dans groupes de jeux
- Discord : Serveurs de dev/gaming

### Article de Blog
Écrire un article sur ludovicargenty.com :
- "Comment j'ai créé 7Z2, un jeu inspiré par Pékin Express"
- Lien vers le jeu
- Backlink de qualité (même domaine)

---

## 📋 Checklist SEO Finale

- [ ] Logo créé et placé dans `/public`
- [ ] Favicons générés et ajoutés
- [ ] Image og-image.png créée (1200×630)
- [ ] `NEXT_PUBLIC_SITE_URL` configurée
- [ ] `sitemap.xml` mis à jour avec vraie URL
- [ ] `robots.txt` mis à jour
- [ ] Site déployé en production
- [ ] Google Search Console configuré
- [ ] Sitemap soumis à Google
- [ ] Bing Webmaster Tools configuré
- [ ] Test Facebook Debugger passé
- [ ] Test Twitter Card Validator passé
- [ ] Lighthouse SEO score > 90
- [ ] Analytics installé (GA4 ou Plausible)
- [ ] Partagé sur réseaux sociaux

---

## 🎓 Ressources

### Outils SEO
- [Google Search Console](https://search.google.com/search-console)
- [Ahrefs Free SEO Tools](https://ahrefs.com/free-seo-tools)
- [Ubersuggest](https://neilpatel.com/ubersuggest/)

### Vérificateurs
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

### Guides
- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)

---

**Bon référencement ! 🚀**
