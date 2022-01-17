const express = require('express');
const router = express.Router();
const userControllers = require('../Controllers/user');


router.put('/changeUserStatus', userControllers.statusChange);
router.post('/addUser', userControllers.createUser)
router.get('/getUserDistance', userControllers.getUserDistance)
router.get('/userLists', userControllers.userList)


module.exports = router;
