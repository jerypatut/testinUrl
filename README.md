## 📄 API Documentation

The API documentation is available as a static HTML file generated from Postman.

- File: `index.html`
- How to view: Open the file in your browser.

# 📌 URL Shortener Service

This URL Shortener is built with **Node.js (Express.js)** + **TypeScript** + **Prisma ORM** + **PostgreSQL** and is designed to run within **Docker** or locally.

## ✨ Key Features

* Shortening long URLs into unique tokens.
* Automatic redirection from the short URL to the original URL.
* Click count statistics for each short URL.
* Retrieving a short token using the original URL.

---

## 🚀 Tech Stack

* **Node.js v20 (slim image)**
* **Express.js v5**
* **TypeScript**
* **PostgreSQL 16**
* **Prisma ORM**
* **Docker & Docker Compose**

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:ganapatihakasa@localhost:5432/ganapatihakasa_dev?schema=public
PORT=3000
```

---

## 🐳 Running with Docker Compose

Ensure you have **Docker** and **Docker Compose v3.8+** installed.

**Build and run the containers:**

```bash
docker compose up --build
```

**Run in detached (background) mode:**

```bash
docker compose up -d
```

This starts two services:

* **app** → The Node.js (Express) application.
* **postgres\_dev** → The PostgreSQL 16 database.

---

## 💻 Running Locally (Without Docker)

**Install dependencies:**

```bash
npm install
```

**Generate Prisma client:**

```bash
npx prisma generate
```

**Run the development server:**

```bash
npm run dev
```

---

## 🔥 API Endpoints

### 1. **POST /shorten**

Creates a short URL from a long URL.

**Request Body:**

```json
{
  "url": "https://example.com"
}
```

**Success (201 Created):**

```json
{
  "shortToken": "abc123"
}
```

**Error Handling:**

* `400` → URL empty.
* `422` → Invalid URL format.
* `405` → Method not allowed.

---

### 2. **GET /stats/\:shortToken**

Returns click statistics and original URL metadata.

**Success (200 OK):**

```json
{
  "originalUrl": "https://example.com",
  "shortToken": "abc123",
  "clicks": 10
}
```

**Error Handling:**

* `404` → Token not found.

---

### 3. **GET /get-token?url=<originalUrl>**

Gets the short token from an original URL.

**Success (200 OK):**

```json
{
  "shortToken": "abc123"
}
```

**Error Handling:**

* `400` → Missing `url` query param.
* `404` → URL not in database.

---

### 4. **GET /\:shortToken**

Redirects to the original URL.

**Action:** `302 Found` redirect.

**Error Handling:**

* `404` → Token not found.

📌 *Note:* This route is defined last to avoid conflicts.

---

## 📌 API Test Cases

| Folder         | Request Name                      | Method | Endpoint            | Scenario                     |
| -------------- | --------------------------------- | ------ | ------------------- | ---------------------------- |
| Shorten URL    | Create Short URL                  | POST   | /shorten            | Valid URL → 201 + shortToken |
| Shorten URL    | Create Short URL – Empty Body     | POST   | /shorten            | Empty body → 400             |
| Shorten URL    | Create Short URL – Invalid Format | POST   | /shorten            | Invalid URL → 422            |
| Shorten URL    | Create Short URL – Idempotent     | POST   | /shorten            | Same URL twice → same token  |
| Redirect       | Redirect to Original URL          | GET    | /\:shortToken       | Valid token → 302            |
| Redirect       | Redirect – Token Not Found        | GET    | /\:shortToken       | Unknown token → 404          |
| Stats          | Get Stats                         | GET    | /stats/\:shortToken | Valid token → 200            |
| Stats          | Get Stats – Token Not Found       | GET    | /stats/\:shortToken | Unknown token → 404          |
| Get Token      | Get Short Token by URL            | GET    | /get-token          | URL exists → 200             |
| Get Token      | Get Token – URL Not Found         | GET    | /get-token          | URL not in DB → 404          |
| Get Token      | Get Token – Missing Param         | GET    | /get-token          | Missing query param → 400    |
| Error Handling | Wrong Method                      | PUT    | /shorten            | Disallowed method → 405      |
| Error Handling | Invalid Path                      | GET    | /random-path        | Path not exist → 404         |

---


## 🛠️ Development Commands

**Run development server:**

```bash
npm run dev
```

**Build TypeScript to JavaScript:**

```bash
npm run build
```

**Run production server:**

```bash
npm start
```

---

## 🗄️ Database Migration (Prisma)

### **Migrating in Docker**

1. Start containers:

```bash
docker compose up --build
```

2. Open a shell inside the running app container:

```bash
docker exec -it url_shortener_app sh
```

3. Run migration:

```bash
npx prisma migrate dev --name init
```

**Database Connection (DBeaver):**

* Host: `localhost`
* Port: `5432`
* Database: `ganapatihakasa_dev`
* Username: `postgres`
* Password: `ganapatihakasa`

---

### **Migrating Locally**

```bash
npx prisma migrate dev --name init
```

(Optional) Open Prisma Studio:

```bash
npx prisma studio
```

---

### **Migrating in Production**

⚠️ Do **NOT** use `prisma migrate dev` in production!

```bash
npx prisma migrate deploy
```

Ensure `.env` contains your production `DATABASE_URL`.

---

## 👨‍💻 Author

Developed by **\[Your Name]** 🚀
