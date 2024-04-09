// Initialize Auth0
const auth0 = new auth0.WebAuth({
  domain: dev-751ze6tmt4uejccp.us.auth0.com,
  clientID: KSKjKqmytc2I0GbcYcJai6oROc2A508f,
  redirectUri: https://muonnetwork.github.io/mnetweb/?, // Change this to your actual redirect URI
  responseType: 'token id_token',
  scope: 'openid email'
});

// Function to handle user login
function login() {
  auth0.authorize();
}

// Function to handle user logout
function logout() {
  // Clear any user session
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
}

// Function to handle user authentication callback
function handleAuthentication() {
  auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult);
    } else if (err) {
      console.error('Authentication error:', err);
    }
  });
}

// Function to set user session
function setSession(authResult) {
  const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
}

// Function to check if the user is authenticated
function isAuthenticated() {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
}
