const {Router} = require('express');
const router = Router();

const {signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get} = require('../controllers/auth.controller');

// /connect
router.get('/signup',signup_get);
router.post('/signup/:role',signup_post);
router.get('/login',login_get);
router.post('/login',login_post);
router.get('/logout',logout_get);

module.exports = router;