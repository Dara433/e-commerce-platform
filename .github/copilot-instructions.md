# Copilot Instructions for E-Commerce API

## Project Overview
This is a Node.js/Express REST API for an e-commerce platform with automated CI/CD via GitHub Actions. The application is containerized with Docker and currently uses in-memory data structures (no database).

**Key Entry Points:**
- `index.js` - Express server setup, routes registration, PORT 3000
- `api/routes/` - Three main endpoints: `/products`, `/login`, `/orders`
- Tests use Jest + Supertest (`index.test.js`)

## Architecture & Data Flow

### Route Pattern (Controllers & Routes)
Routes are defined directly in `api/routes/` files without a separate controller layer:
- Each route file creates an Express Router with inline request handlers
- Data stored in-memory arrays (e.g., `products`, `users`, `orders`)
- Routes export via `module.exports = router`

**Example Flow:**
1. Request to `GET /products` → matched by `app.use('/products', productRoutes)` in `index.js`
2. Handler retrieves in-memory `products` array and responds with JSON
3. `POST /products` adds new item to array (no persistence)

### Modules Structure
- `api/controllers/` - Empty (controllers logic is inline in routes)
- `api/models/` - Empty (no database or schema definitions yet)
- **This is a candidate for refactoring** - consider extracting route handlers to controllers when complexity grows

## Development Workflows

### Running Locally
```bash
npm install       # Install dependencies (express, body-parser, jest, supertest)
node index.js     # Start server on http://localhost:3000
```

### Testing
```bash
npm test          # Run Jest test suite (index.test.js)
                  # Tests verify all three routes respond with 200 status
```

### CI/CD Pipeline
- **Trigger:** Pushes to `main` branch or PRs against `main`
- **Steps:** Checkout → Node.js setup → Cache deps → Install → Test → Build → Docker login → Build/push image
- **Environment:** Docker secrets needed: `DOCKER_USERNAME`, `DOCKER_PASSWORD`
- **Docker:** Multi-stage uses `node:22-alpine`, exposes port 3000, runs `node index.js`

## Project-Specific Conventions

### Naming & Patterns
- Route files use PascalCase: `OrderPage.js`, `Login.js` (inconsistent with `products.js` - consider normalizing)
- Authentication uses basic username/password matching (mock data in `Login.js`)
- Order/Product data structure: `{ id, name/user, price/items, ... }`

### Dependencies
- **Runtime:** `express@^5.1.0`, `body-parser@^2.2.0`
- **Dev:** `jest@^30.0.4`, `supertest@^6.3.4`
- **No database** - all data is in-memory; add persistence layer as project grows

## Common Tasks

| Task | Command |
|------|---------|
| Start dev server | `node index.js` |
| Run tests | `npm test` |
| Add new route | Create file in `api/routes/`, import & register in `index.js` with `app.use()` |
| Add new dependency | `npm install <package-name>` |
| Check logs | `node nohup.out` (background process logs) |

## Known Limitations & Future Improvements
- No persistent database (in-memory only)
- Authentication is hardcoded mock users - consider JWT/passport for production
- Controllers/models directories unused - refactor handlers as codebase grows
- File naming inconsistency (PascalCase vs lowercase)
- No error handling middleware or validation

## Critical Integration Points
- All routes must be registered in `index.js` with `app.use(path, router)`
- `body-parser.json()` required for POST request parsing
- Port configurable via `process.env.PORT` (defaults to 3000)
