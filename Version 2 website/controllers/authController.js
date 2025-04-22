import bcrypt from 'bcryptjs';
import passport from 'passport';
import db from '../models/db.js';

// Display login form
export const getLogin = (req, res) => {
    res.render('login', {
        user: req.user || null,
        registered: req.query.registered,
        error: req.query.error
    });
};

// Validation functions
const isValidPassword = (password) => {
    return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/g.test(password);
};

const isValidName = (name) => {
    // Only allow letters and spaces in the name
    return /^[A-Za-z\s]+$/g.test(name);
};

// Process login form
export const postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login?error=true'
    })(req, res, next);
};

// Display registration form
export const getRegister = (req, res) => {
    res.render('register', {
        user: req.user || null,
        query: req.query
    });
};

export const postRegister = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Name validation
        if (!isValidName(name)) {
            return res.redirect('/register?error=invalidName');
        }

        // Password validation
        if (password !== confirmPassword) {
            return res.redirect('/register?error=passwordMismatch');
        }
        
        if (!isValidPassword(password)) {
            return res.redirect('/register?error=invalidPassword');
        }

        // Check if user already exists
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.redirect('/register?error=emailExists');
        }
    // In your registration route
        if (password.length > 256) {
            return res.redirect('/register?error=passwordTooLong');
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        // Redirect to login
        res.redirect('/login?registered=true');
    } catch (error) {
        console.error('Registration error:', error);
        res.redirect('/register?error=serverError');
    }
};

// Logout
export const logout = (req, res) => {
    req.logout((err) => {
        if (err) console.error(err);
        res.redirect('/');
    });
};