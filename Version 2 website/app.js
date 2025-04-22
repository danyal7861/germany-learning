import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import passport from './config/passportConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'rolsa-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));

// Global variables for templates
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.query = req.query;
    res.locals.title = 'Rolsa Technologies';
    next();
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
import authRoutes from './routes/auth.js';
import scheduleRoutes from './routes/schedule.js';
import calculatorRoutes from './routes/calculator.js';
import productsRoutes from './routes/products.js';

app.use('/', authRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/calculator', calculatorRoutes);
app.use('/products', productsRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});