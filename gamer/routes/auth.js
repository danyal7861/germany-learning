import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Register routes
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Logout route
router.get('/logout', authController.logout);

// About page
router.get('/about', (req, res) => {
  res.render('about', { user: req.user });
});

export default router;