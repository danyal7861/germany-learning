// routes/policies.js
import express from 'express';
const router = express.Router();

router.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy');
});

router.get('/cookie-policy', (req, res) => {
  res.render('cookie-policy');
});

// In your routes/policies.js file
router.get('/terms-of-use', (req, res) => {
  console.log('Terms of use route accessed');
  res.render('terms-of-use');
});
export default router;