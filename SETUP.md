# Setup Guide

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Configure the OAuth consent screen
6. Create OAuth client ID (Web application)
7. Copy the Client ID
8. Create a `.env` file in the root directory:
   ```
   VITE_GOOGLE_CLIENT_ID=your-client-id-here
   ```
9. Restart the dev server

## API Setup

The authentication service is configured to work with a backend API. Update the `VITE_API_BASE_URL` in `.env` if your backend is hosted elsewhere.

For development, the service includes mock responses that simulate API calls.

## Features

- ✅ Responsive design (mobile + desktop)
- ✅ Phone number login with OTP
- ✅ Google OAuth login
- ✅ OTP verification
- ✅ Error handling
- ✅ Loading states

