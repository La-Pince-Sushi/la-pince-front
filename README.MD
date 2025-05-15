# La Pince – Frontend

Frontend de l’application **La Pince**, projet de fin de formation DWWM. Ce dépôt contient l’interface utilisateur développée en **React**, avec une architecture SPA propulsée par **Vite**, **Zustand** pour la gestion d’état global, et **Axios** pour les appels API.

---

## 🚀 Stack technique

- React (v18+)
- TypeScript
- Vite
- Zustand (store global)
- React Router
- Bulma (CSS Framework)
- ESLint / Prettier

---

## 📁 Structure du projet

```bash
lapince-front/
├── src/
│   ├── assets/            # Images, icônes, etc.
│   ├── components/
│   │   ├── common/        # Composants réutilisables (boutons, inputs, etc.)
│   │   ├── layout/        # Header, footer, etc.
│   │   ├── auth/          # Composants liés à l'authentification
│   │   ├── dashboard/     # Composants du dashboard
│   │   ├── budget/        # Composants liés aux budgets
│   │   └── expense/       # Composants liés aux dépenses
│   ├── pages/
│   │   ├── auth/          # Pages d'authentification
│   │   ├── dashboard/     # Pages du dashboard
│   │   └── profile/       # Pages de profil
│   ├── store/             # État global (Redux, Context API, etc.)
│   ├── services/          # Services API
│   ├── utils/             # Fonctions utilitaires
│   ├── types/             # Types TypeScript
│   ├── router/            # Configuration du routeur
│   ├── app.tsx            # Composant racine
│   └── main.tsx           # Point d’entrée de l’appli (ReactDOM.createRoot)
└── index.html             # Point d'entrée HTML
├── .env                     # Variables d’environnement (URL API, etc.)
├── .env.example             # Exemple de configuration .env
├── .gitignore
├── vite.config.ts           # Config Vite
├── tsconfig.json            # Config TypeScript
├── package.json
└── README.md
```
## Structure du projet LaPince

### Description des dossiers

#### `assets/`

Contient toutes les ressources statiques comme les images, les icônes, les polices, etc.

#### `components/`

Regroupe tous les composants réutilisables de l'application :

- `common/` : Composants génériques (boutons, inputs, modals, etc.)
- `layout/` : Éléments de structure (header, footer, sidebar, etc.)
- `auth/` : Composants spécifiques à l'authentification
- `dashboard/` : Composants utilisés dans le tableau de bord
- `budget/` : Composants liés à la gestion des budgets
- `expense/` : Composants liés à la gestion des dépenses

#### `pages/`

Contient les pages principales de l'application :

- `auth/` : Pages d'authentification (login, register, reset-password)
- `dashboard/` : Pages du tableau de bord (home, expenses, budgets)
- `profile/` : Pages de gestion du profil utilisateur

#### `store/`

Gestion de l'état global de l'application (contexts, reducers, etc.)

#### `services/`

Services pour communiquer avec l'API et effectuer des opérations externes

#### `utils/`

Fonctions utilitaires réutilisables dans toute l'application

#### `types/`

Définitions des types TypeScript pour l'application

#### `router/`

Configuration des routes de l'application

#### `app.tsx`

Composant racine de l'application React

#### `index.html`

Point d'entrée HTML de l'application

## ⚙️ Installation

### 1. Cloner le projet
```bash
git clone https://github.com/<votre-org>/la-pince-front.git
cd la-pince-front
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer l’environnement

Créer un fichier .env à la racine du projet, basé sur .env.example :

```env
VITE_API_URL=http://localhost:3001
```

### ▶️ Lancer le projet
```bash
npm run dev
```

L'application tournera sur http://localhost:5173 (ou selon la config Vite).

### 📦 Scripts disponibles

| Script | Description |
| npm run dev | Lance Vite en mode développement |
| npm run build | Génère une version de production dans /dist |
| npm run preview | Prévisualise la build de production |
| npm run lint | Vérifie le code avec ESLint |

### 👥 Équipe projet

Projet réalisé dans le cadre du Titre Professionnel DWWM.

Lead Front-End : Laetitia

Membres de l’équipe : À compléter ici

### 📄 Licence
Projet open-source à but pédagogique. Développé pour l’évaluation du titre DWWM.
