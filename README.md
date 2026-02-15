# clone-tabnews

This project is a learning and study clone inspired by TabNews, created to practice and deepen understanding of Next.js and React fundamentals, following lessons from **[curso.dev](https://curso.dev)**. It is designed to help learners grasp essential concepts and best practices for building modern web applications.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v13+)
- **Frontend Library**: [React](https://reactjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Infrastructure**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Migrations**: [node-pg-migrate](https://salsita.github.io/node-pg-migrate/)
- **Testing**: [Jest](https://jestjs.io/)
- **Code Quality**: [Prettier](https://prettier.io/)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Make sure you have a compatible version installed (see `.nvmrc` for the recommended version).
- **npm**: Comes with Node.js.
- **Docker**: Required to run the database services.

### Installation

Clone this [repository](https://github.com/yurivilela1704/clone-tabnews.git) and install dependencies:

```bash
git clone https://github.com/yurivilela1704/clone-tabnews.git
cd clone-tabnews
npm install
```

### Running the Application (Development)

Start the infrastructure services and the Next.js development server:

```bash
npm run dev
```

The app should be running at [http://localhost:3000](http://localhost:3000).

### 🛠️ Database Migrations

Migrations are managed via `node-pg-migrate`.

- **Create a new migration**: `npm run migration:create -- <migration-name>`
- **Run migrations**: `npm run migration:up`
- **Rollback migrations**: `npm run migration:down`

---

## 🧪 Testing

The project uses Jest for integration testing.

- **Run tests once**: `npm run test`
- **Run tests in watch mode**: `npm run test:watch`

---

## 🔌 API Endpoints

The project includes several internal API endpoints for system health and management:

- **GET `/api/v1/status`**: Returns the current status of the application and its database dependencies.
- **GET/POST `/api/v1/migrations`**: Manages and reports on database migrations.

---

## 🎨 UI & UX

The project includes a landing page (`/`) that displays:
- Real-time system status fetched from the internal API.
- A link to the developer's personal website ([yurivilela.com.br](https://www.yurivilela.com.br)).

---

## 📁 Project Structure

- `pages/`: Contains Next.js pages and API routes.
- `infra/`: Database configuration, connection pooling, and migrations.
- `test/`: Integration tests for the API.
- `package.json`: Project dependencies and scripts.
- `.nvmrc`: Specifies the Node version for development.

---

## 🎓 Learning Purpose

This project is intended for educational use, as a hands-on way to solidify the concepts learned through **[curso.dev](https://curso.dev)**.

---

Feel free to fork and experiment further!
