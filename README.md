# Golden Ball Auction Frontend

This repository contains the frontend of the Golden Ball Auction Web Application, built using React + Vite. It includes a complete user interface for authentication, auction browsing, bidding, and managing user sessions, all connected to a hosted backend.

## Features

- User Authentication (Login, Register, Protected Routes)
- View All Auction Products
- View Product Details
- Place Bids on Products
- JWT Authorization with Bearer Tokens
- Chakra UI for a responsive interface
- Axios API Client with Interceptors
- React Router DOM for page navigation
- LocalStorage session persistence

## Technologies Used

- React 19
- Vite
- Chakra UI
- Axios
- React Router DOM
- Framer Motion
- ESLint

## API Configuration

The frontend connects to the backend using Axios.
You can configure the backend URL via an environment variable:

```
VITE_API_URL=https://auction-web-application.vercel.app/api
```

If the variable is not provided, a default URL is used.

## Project Structure

```
src/
 ├── components/        # UI components
 ├── pages/             # Screens (Login, Register, Auctions, etc.)
 ├── context/           # Auth and global state
 ├── api/               # Axios API client
 ├── hooks/             # Custom hooks
 └── App.jsx            # Main app entry point
```

## Running the Project Locally

Install all dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Local URL:

```
http://localhost:5173
```

## Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment (Vercel)

This frontend is optimized for hosting on Vercel.

Steps:

1. Push this repository to GitHub
2. Go to Vercel and import the repository
3. Add this environment variable under Project Settings → Environment Variables:

   ```
   VITE_API_URL=https://auction-web-application.vercel.app/api
   ```

4. Deploy

Vercel will automatically build and serve your React app

## Notes

- Make sure your backend's CORS configuration includes your Vercel frontend URL.
- The Axios client automatically attaches the JWT token from LocalStorage.
- You may expand this project with TypeScript, testing, or additional security layers.

If you want, I can also generate:

- A short GitHub repository description
- A polished project banner
- A screenshots/demo section

Just ask.
