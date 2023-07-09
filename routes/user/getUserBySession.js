const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const multer = require('multer');
const upload = multer();
const { isSessionExpired, saveSessionKey, createSessionKey } = require('../../session');
const { userObject } = require('../../functions/createObjectForRes');

router.post('/', upload.none(), (req, res) => {
    try {
        const { session } = req.body;
        // Find the user in the database
        User.findOne({ sessionKey: session })
            .then(user => {
                if (user) {
                    // check the session 
                    let flag = isSessionExpired(user.sessionAddedAt);
                    if (flag) {
                        sionKey(user.id, createSessionKey());
                    }
                    // Send the user details in the response
                    res.send({ success: true, message: 'Login successful', user: userObject(user) });
                } else {
                    // User not found or incorrect credentials
                    res.send({ success: false, message: 'Please Login.' });
                }
            })
            .catch(err => {
                // Handle any error that occurred during the database query
                console.log(err);
                res.send({ success: false, message: 'An error occurred' });
            });
    } catch (err) {
        // Handle any other error that occurred
        console.log(err);
        res.send({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;
