# Instructions pour les Assets du Dossier Public

## 🖼️ Logo et Images

### Logo Principal
Placez votre logo dans ce dossier avec les noms suivants :

- **logo.svg** - Logo vectoriel (recommandé)
- **logo.png** - Logo PNG haute résolution (512×512px minimum)
- **logo-small.png** - Logo petit format pour le header (64×64px)

### Favicons
Générer les favicons avec un outil comme [favicon.io](https://favicon.io/) ou [realfavicongenerator.net](https://realfavicongenerator.net/)

Fichiers requis :
- **favicon.ico** - Favicon classique (32×32px)
- **favicon-16x16.png** - Petit favicon
- **favicon-32x32.png** - Favicon moyen
- **apple-touch-icon.png** - Icône iOS (180×180px)
- **android-chrome-192x192.png** - Android petit (192×192px)
- **android-chrome-512x512.png** - Android grand (512×512px)

### Open Graph / Social Media
Pour un meilleur partage sur les réseaux sociaux :

- **og-image.png** - Image Open Graph (1200×630px)
  - Utilisée quand tu partages le lien sur Facebook, Twitter, Discord, etc.
  - Doit contenir : logo 7Z2, slogan, design minimaliste noir/blanc

- **twitter-card.png** - Twitter Card (1200×675px) [optionnel]

## 🎨 Recommandations Design Logo

### Style
- **Minimaliste** : Noir & blanc uniquement
- **Police** : Nunito Sans Black (comme le site)
- **Format** : "7Z2" en gros caractères
- **Sous-titre** : "Trouve le 722" (optionnel)

### Exemple de contenu og-image.png
```
┌──────────────────────────────────────────┐
│                                          │
│           7Z2                            │
│           (logo géant, bold)             │
│                                          │
│      Trouve le 722 parmi les 7Z2         │
│      Un jeu de rapidité                  │
│                                          │
│      ludovicargenty.com                  │
│                                          │
└──────────────────────────────────────────┘
```

## 📐 Dimensions Standards

| Fichier                  | Dimensions | Usage                    |
|--------------------------|------------|--------------------------|
| favicon.ico              | 32×32      | Navigateur (tab)         |
| apple-touch-icon.png     | 180×180    | iOS home screen          |
| android-chrome-192.png   | 192×192    | Android home screen      |
| android-chrome-512.png   | 512×512    | Android splash screen    |
| og-image.png             | 1200×630   | Facebook, LinkedIn       |
| twitter-card.png         | 1200×675   | Twitter (optionnel)      |

## 🛠️ Outils de Génération

### Favicons
1. **[Favicon.io](https://favicon.io/favicon-generator/)**
   - Générateur de texte vers favicon
   - Configuration : Texte "7Z2", fond blanc, texte noir

2. **[RealFaviconGenerator](https://realfavicongenerator.net/)**
   - Upload ton logo.png
   - Génère tous les formats automatiquement

### Images Open Graph
1. **[Canva](https://www.canva.com/)**
   - Template "Facebook Post" (1200×630)
   - Design noir/blanc minimaliste

2. **Figma / Photoshop**
   - Créer un design custom

## 📂 Structure Finale

```
public/
├── LOGO_INSTRUCTIONS.md         (ce fichier)
├── logo.svg                     (à créer)
├── logo.png                     (à créer)
├── logo-small.png               (à créer)
├── favicon.ico                  (à créer)
├── favicon-16x16.png            (à créer)
├── favicon-32x32.png            (à créer)
├── apple-touch-icon.png         (à créer)
├── android-chrome-192x192.png   (à créer)
├── android-chrome-512x512.png   (à créer)
├── og-image.png                 (à créer)
├── robots.txt                   (généré)
├── sitemap.xml                  (généré)
└── manifest.json                (généré)
```

## ✅ Checklist

- [ ] Logo créé (logo.svg ou logo.png)
- [ ] Favicons générés (favicon.ico, etc.)
- [ ] Image Open Graph créée (og-image.png)
- [ ] Tous les fichiers placés dans /public
- [ ] Vérifier l'affichage sur localhost:3000
- [ ] Tester le partage sur Facebook/Twitter avec [Card Validator](https://cards-dev.twitter.com/validator)

## 🔗 Liens Utiles

- [Favicon Generator](https://favicon.io/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Canva](https://www.canva.com/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
