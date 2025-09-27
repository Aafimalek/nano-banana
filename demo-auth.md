# Authentication Demo

## How to Test the Authentication Flow

### 1. Start the Development Server
```bash
# Start the frontend
npm run dev

# In another terminal, start the backend
cd server
npm start
```

### 2. Test the Authentication Flow

1. **Visit the Homepage**
   - Go to `http://localhost:3000`
   - You should see the main navbar with "Sign in with Google" button

2. **Sign In Process**
   - Click "Sign in with Google"
   - You'll be redirected to Google OAuth
   - After successful authentication, you'll be redirected to `/auth/success`
   - The AuthCallback page will verify your token and redirect to `/chat`

3. **Chat Page Features**
   - **Tool Navigation**: Use the rounded navbar to switch between tools:
     - Text Behind Image
     - Diagram
     - Isometry
     - Replace Outfit
   - **Profile Dropdown**: Click on your profile picture to see:
     - Profile information
     - Generated images gallery (mock data for now)

4. **Authentication States**
   - **Not Authenticated**: Shows "Sign in with Google" button
   - **Authenticated**: Shows "Go to Chat" button and profile info
   - **Protected Route**: `/chat` redirects to home if not authenticated

### 3. Test Error Handling

1. **Authentication Error**
   - Visit `http://localhost:3000/auth/error`
   - You should see the error page with helpful information

2. **Protected Route Access**
   - Try to visit `http://localhost:3000/chat` without being authenticated
   - You should be redirected to the home page

### 4. Test Logout

1. **From Chat Page**
   - Click on your profile picture
   - Click "Sign Out" in the dropdown
   - You should be logged out and redirected

2. **From Main Navbar**
   - When authenticated, click "Sign Out" in the main navbar
   - You should be logged out

## Expected Behavior

### Before Authentication
- Navbar shows "Sign in with Google"
- Tools page shows "Login to Access" buttons
- `/chat` route redirects to home

### After Authentication
- Navbar shows "Go to Chat" and profile info
- Tools page shows "Go to Chat" buttons
- `/chat` route is accessible
- Profile dropdown shows user info and image gallery

### Error Scenarios
- Failed authentication shows error page
- Network errors are handled gracefully
- Invalid tokens are cleared and user is logged out

## Troubleshooting

### Common Issues
1. **CORS Errors**: Make sure the backend server is running on port 5000
2. **Google OAuth Issues**: Check Google OAuth configuration in server
3. **Token Issues**: Clear localStorage and try again
4. **Redirect Issues**: Check that FRONTEND_URL is set correctly in server

### Debug Steps
1. Check browser console for errors
2. Check network tab for failed requests
3. Verify server logs for authentication issues
4. Clear browser cookies and localStorage if needed
