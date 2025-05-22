const express  = require('express');
const { handleSignup, handleLogin } = require('../controllers/userAuthentication');


const router = express.Router();

router.post('/register', handleSignup);

router.post('/login', handleLogin);

module.exports = router;