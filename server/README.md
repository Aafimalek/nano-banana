# Nano Banana Server

This is the backend server for the Nano Banana application, handling image generation and user authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install additional dependencies for image generation:
```bash
npm install @google/genai multer
```

3. Set up environment variables in `.env`:
```
API_KEY=your_google_gemini_api_key
SESSION_SECRET=your_session_secret
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Image Generation (All require authentication)

- `POST /api/image/text-image` - Generate text behind image
- `POST /api/image/diagram` - Generate educational diagrams
- `POST /api/image/isometry` - Generate isometric illustrations
- `POST /api/image/outfit-replace` - Replace outfits in images
- `POST /api/image/mockup` - Generate product mockups
- `POST /api/image/brand-asset` - Generate brand marketing assets
- `POST /api/image/story-illustration` - Generate storybook illustrations

### Authentication

- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Subscriptions

- `GET /api/subscription/plans` - Get available subscription plans
- `POST /api/subscription/subscribe` - Subscribe to a plan
- `GET /api/subscription/status` - Get subscription status

## Features

- **Server-side Image Generation**: All AI image generation is handled on the server
- **Authentication**: Google OAuth integration
- **Rate Limiting**: API rate limiting to prevent abuse
- **File Upload**: Multer for handling image uploads
- **Database**: MongoDB for user and subscription data
- **Security**: Helmet for security headers, CORS configuration

## Architecture

The server uses:
- Express.js for the web framework
- Google Gemini AI for image generation
- MongoDB for data persistence
- Passport.js for authentication
- Multer for file uploads
- Rate limiting middleware for API protection