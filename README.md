# Pokédex - Backend (Node.js + Express) & Frontend (React)

Bienvenue dans le projet Pokédex ! Ce projet est une application web permettant de rechercher, ajouter et gérer des Pokémon. Le backend est développé en **Node.js** avec **Express**, et le frontend utilise **React**.

---

## 🚀 Setup du projet

### 1️⃣ Cloner le dépôt GitHub

```bash
git clone <URL_DU_REPO>
cd <NOM_DU_REPO>
```

### 2️⃣ Installation des dépendances

Le projet est divisé en **deux dossiers** :
- **Frontend** (React)
- **Backend** (Node.js + Express + MongoDB)

Installez les dépendances dans chaque dossier :

```bash
cd front
npm install
cd ../back
npm install
```

### 3️⃣ Configuration des fichiers `.env`


#### 🔹 Backend

Renommez le fichier **`.env.example`** en **`.env`** dans le dossier `back` :

```bash
mv back/.env.example back/.env
```

Puis, ajoutez votre **token secret** pour le chiffrement des JWT :

```env
TOKEN_SECRET=VOTRE_TOKEN
```

Pour générer une clé secrète, exécutez la commande suivante dans le terminal :

```bash
cd back
node keygen.js
```

Une fois la clé générée, copiez-la dans le fichier `.env` à la place de `VOTRE_TOKEN`.

---

#### 🔹 Frontend

Renommez également **`.env.example`** en **`.env`** dans le dossier `front` :

```bash
mv front/.env.example front/.env
```

Ajoutez ensuite les URLs de votre application et du serveur :

```env
VITE_URL_APP=URL_DE_VOTRE_APPLICATION
VITE_SERVER_URL_APP=URL_DE_VOTRE_BACKEND
```

Cela permet d'assurer la bonne communication entre le frontend et le backend.

### Lancer l'application

- **Frontend** :
  ```bash
  cd front
  npm run dev
  ```
- **Backend** :
  ```bash
  cd back
  npm start
  ```

Le backend inclut une **base de données MongoDB**. Vous pouvez soit utiliser votre propre instance MongoDB, soit utiliser **docker-compose** en lançant :

```bash
docker-compose up -d
```

---

## Création de la SECRET KEY
Pour chiffrer le mot de passe, vous aurez besoin d'une clé secrète. Rendez-vous dans le fichier keygen.js et exécutez :
```bash
node keygen.js
```
Une clé sera générée et devra rester secrète. Copiez-la dans le fichier props.env.example, puis renommer le fichier props.env

## 📌 Peuplement de la base de données

Avant de commencer, assurez-vous d'avoir mis à jour votre **Bearer Token** dans le fichier de peuplement.

Ensuite, exécutez le script suivant pour peupler la base de données avec les Pokémon :

```bash
cd back
node peuplement.js
```

---

## API - Routes disponibles

### 📍 Routes Pokémon (`/pkmn`)

| Méthode | Route           | Description                |
|---------|-----------------|----------------------------|
| `GET`   | `/pkmn/search`  | Recherche de Pokémon       |
| `GET`   | `/pkmn/:id_or_name` | Récupère un Pokémon par ID ou nom |
| `POST`  | `/pkmn`         | Ajoute un Pokémon          |
| `PUT`   | `/pkmn/:id`     | Met à jour un Pokémon      |
| `DELETE`| `/pkmn/:id`     | Supprime un Pokémon        |

### 🌍 Routes Région (`/pkmn/region`)

| Méthode | Route           | Description                |
|---------|-----------------|----------------------------|
| `PUT`   | `/pkmn/region`  | Ajoute une région          |
| `DELETE`| `/pkmn/region/:id` | Supprime une région      |

### 🧑 Routes Dresseur (`/trainer`)

| Méthode | Route           | Description                |
|---------|-----------------|----------------------------|
| `POST`  | `/`             | Crée un dresseur           |
| `GET`   | `/`             | Récupère un dresseur       |
| `PUT`   | `/`             | Met à jour un dresseur     |
| `DELETE`| `/`             | Supprime un dresseur       |
| `POST`  | `/mark`         | Marque un Pokémon capturé  |

### 🔐 Routes Authentification (`/auth`)

| Méthode | Route           | Description                |
|---------|-----------------|----------------------------|
| `POST`  | `/register`     | Inscription                |
| `POST`  | `/login`        | Connexion                  |

### Routes Types de Pokémon (`/pkmn/types`)

| Méthode | Route           | Description                |
|---------|-----------------|----------------------------|
| `GET`   | `/pkmn/types`   | Liste des types de Pokémon |

---

## 🛠 Collection Postman

Une **collection Postman** est incluse dans le dossier `/docs/Pokedex.postman_collection.json`. Vous pouvez l'importer dans Postman pour tester facilement les routes de l'API.
