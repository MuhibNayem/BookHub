# Product Listing Application

## Prerequisites

- Node.js
- Docker (optional)

## Setup

### Backend

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the application:
   ```bash
   npm run build
   ```
4. Start the dev server:

   ```bash
   npm run dev
   ```

- #### Note:

  `npm run dev` will migrate the database with necessary tables and values. if you want to migrate forcefully again then run :

  ```bash
  npm run dev -- --force-migrations
  ```

5. Start the server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

### Docker

1. Spin up docker first.

2. Build and run the containers:

   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - App URL : `http://localhost:3000`
