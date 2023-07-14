const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'rahasia'; // Replace with your own secret key

// Middleware to parse JSON bodies
app.use(express.json());

// Login route
app.post('/login', (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;
  
    // Replace this with your authentication logic
    // For example, you can check the credentials against a database
    if (username === 'admin' && password === 'password') {
      // If authentication is successful, generate a JWT
      const token = jwt.sign({ username }, secretKey);
  
      // Redirect the user to the main page with the token as a query parameter
      res.redirect(`/main?token=${token}`);
    } else {
      // If authentication fails, return an error response
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
  

// Example protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

// Middleware for authenticating the JWT token
function authenticateToken(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // If no token is found, return an error response
    return res.status(401).json({ error: 'Authentication token required' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      // If the token verification fails, return an error response
      return res.status(403).json({ error: 'Invalid token' });
    }

    // Store the user object in the request for further use
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  });
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
