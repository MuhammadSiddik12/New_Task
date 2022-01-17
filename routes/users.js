const express = require('express');
const router = express.Router();
const userControllers = require('../Controllers/user');
const auth = require('../middleware/token')


router.put('/changeUserStatus', auth, userControllers.statusChange);
router.post('/addUser', userControllers.createUser)
router.get('/getUserDistance', auth, userControllers.getUserDistance)
router.post('/userLists', auth, userControllers.userList)


module.exports = router;
