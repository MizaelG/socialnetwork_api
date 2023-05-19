const router = require('express').Router();
const userRoutes = require('./userControllers');
const thoughtRoutes = require('./thoughtControllers');

router.use('./thoughts', thoughtRoutes);
router.use('./users', userRoutes);

module.exports = router;