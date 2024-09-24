const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Mock user (In production, you would fetch this from the database)
const user = {
  username: 'admin',
  passwordHash: '$2b$10$F1o8THwKpTwApmpaEWRYFOKFlPb6ljKsyFikUsziFCmrJvWR3r5W6' // Hashed version of "password"
};

// Route to handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials
  if (username === user.username && await bcrypt.compare(password, user.passwordHash)) {
    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });

    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
