# 🧪 SciStudent Shop – E-commerce Scientifique & Tech

## 📌 Description
**SciStudent Shop** est une plateforme e-commerce moderne dédiée à la vente de **matériel scientifique et technologique pour étudiants**.  
Le projet a été réalisé dans le cadre d’un **challenge de développement web**, avec pour objectif de créer une boutique en ligne fonctionnelle, responsive et professionnelle.

---

## 🎯 Objectifs du projet
- Créer un site e-commerce simple et efficace
- Offrir une bonne expérience utilisateur (UX/UI)
- Mettre en place un backend fonctionnel
- Ajouter des fonctionnalités avancées (emails, dashboard admin)

---

## 🛠️ Stack technique

### Frontend
- **React JS**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **React Router**

### Backend
- **Firebase**
  - Firestore (base de données)
  - Authentication
  - Firebase Hosting / Storage

### Autres
- Envoi d’emails automatiques aux clients
- Dashboard Admin sécurisé

---

## ✨ Fonctionnalités

### 👤 Côté utilisateur
- Page d’accueil avec produits mis en avant
- Liste des produits (nom, description, prix)
- Recherche et filtres par catégorie
- Ajout au panier
- Gestion du panier (quantité, suppression, total)
- Page détail produit
- Design responsive (mobile / desktop)
- Réception d’un email après commande

### 🔐 Côté administrateur
- Dashboard admin
- Liste complète des commandes
- Informations clients
- Suivi et gestion des commandes
- Interface simple et claire

---

## 📱 Responsive Design
Le site est entièrement responsive et optimisé pour :
- 📱 Mobile
- 💻 Desktop
- 📟 Tablette

---

## 📂 Description des fichiers et dossiers

### 📁 src/components
Contient les composants réutilisables de l’interface utilisateur et du dashboard admin.

#### 🔹 Composants généraux
- **Navbar.jsx**  
  Barre de navigation principale du site.

- **Footer.jsx**  
  Pied de page avec informations générales et slogan.

- **HeroSection.jsx**  
  Section principale de la page d’accueil avec image et message clé.

- **SloganSection.jsx**  
  Section dédiée à l’affichage du slogan du projet.

- **ProductCard.jsx**  
  Carte produit affichant l’image, le nom, le prix et l’action panier.

- **ProductImageCarousel.jsx**  
  Carousel d’images pour les pages détail produit.

- **NewCollection.jsx**  
  Section mettant en avant les nouveaux produits.

- **Promotion.jsx**  
  Section promotionnelle ou informative.

- **YouMightLike.jsx**  
  Suggestions de produits similaires.

- **Toast.jsx**  
  Composant d’alertes et notifications (succès, erreur, info).

- **LoadingSpinner.jsx**  
  Indicateur de chargement lors des requêtes ou transitions.

- **ScrollToTop.jsx**  
  Gestion automatique du scroll lors du changement de page.

- **BackToTopButton.jsx**  
  Bouton permettant de revenir rapidement en haut de la page.

---

#### 🔹 Composants Dashboard Admin
- **AdminSidebar.jsx**  
  Barre latérale de navigation du dashboard admin.

- **AdminStats.jsx**  
  Statistiques générales (commandes, produits, revenus).

- **AdminOrders.jsx**  
  Gestion et affichage des commandes clients.

- **AdminProducts.jsx**  
  Gestion des produits (ajout, modification, suppression).

- **ProductForm.jsx**  
  Formulaire utilisé par l’admin pour gérer les produits.

- **SeedProducts.jsx**  
  Script/composant permettant d’initialiser la base de données avec des produits.

---

### 📁 src/pages
Contient les pages principales du site.

- **Home.jsx**  
  Page d’accueil avec Hero, collections et promotions.

- **ProductsPage.jsx**  
  Liste complète des produits avec filtres, recherche et tri.

- **ProductPage.jsx**  
  Page détail d’un produit.

- **CartPage.jsx**  
  Page panier avec articles et total.

- **CategoryPage.jsx**  
  Page affichant les produits par catégorie.

- **ContactPage.jsx**  
  Page de contact utilisateur.

- **AdminLogin.jsx**  
  Page de connexion sécurisée pour l’administrateur.

- **DashboardAdmin.jsx**  
  Interface principale de gestion (commandes, produits, statistiques).

---

### 📁 src/lib
Contient la logique métier et les services.

- **firebase.js**  
  Configuration Firebase (Firestore, Auth, Storage).

- **api.js**  
  Fonctions d’accès aux données et appels backend.

- **emailService.js**  
  Gestion de l’envoi des emails aux clients (confirmation de commande).

- **validation.js**  
  Fonctions de validation des formulaires.

- **wilayas.js**  
  Liste des wilayas utilisées pour les adresses et livraisons.

- **data.js**  
  Données produits (mock ou initialisation).

---

### 📁 src/contexts
Gestion de l’état global de l’application.

- **CartContext.jsx**  
  Contexte React pour la gestion du panier (ajout, suppression, total).

---

### 📁 src/assets
Ressources statiques du projet (images, icônes, logos).

---

## 🧠 Organisation du projet
Cette architecture permet :
- Une séparation claire des responsabilités
- Une meilleure maintenabilité
- Une évolutivité facile du projet
- Une compréhension rapide pour les jurys et développeurs




