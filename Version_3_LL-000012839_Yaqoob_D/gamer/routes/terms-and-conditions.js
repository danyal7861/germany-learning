// Route to serve the terms and conditions page
app.get('/terms', (req, res) => {
    res.render('terms', { 
        title: 'Terms and Conditions',
        query: req.query
    });
});