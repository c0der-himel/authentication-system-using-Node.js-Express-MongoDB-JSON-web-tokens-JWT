const { Router } = require('express');
const {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
} = require('../controllers/authControllers');

const router = Router();

router.get('/signup', signupGet);
router.post('/signup', signupPost);
router.get('/login', loginGet);
router.post('/login', loginPost);

module.exports = router;
