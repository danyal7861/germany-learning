import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

// Configure __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// EJS configuration
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/partials')
]);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Rolsa Technologies - Green Energy Solutions'
    });
});

app.get('/calculator', (req, res) => {
    res.render('calculator', {
        title: 'Savings Calculator',
        calculationTypes: ['Solar', 'EV Charging', 'Smart Home']
    });
});

app.get('/schedule', (req, res) => {
    res.render('schedule', {
        title: 'Schedule Consultation',
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        timeSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
    });
});

// Product routes
app.get('/products', (req, res) => {
    res.render('products', { title: 'Our Products' });
});

app.get('/products/solar', (req, res) => {
    res.render('products-solar', { title: 'Solar Solutions' });
});

app.get('/products/smart-home', (req, res) => {
    res.render('products-smart-home', { title: 'Smart Home' });
});

app.get('/products/ev-charging', (req, res) => {
    res.render('ev-charging-station', { title: 'EV Charging' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});