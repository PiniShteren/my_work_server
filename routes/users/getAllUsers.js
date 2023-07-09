const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const multer = require('multer');
const { isSessionExpired } = require('../../session');
const { usersObject } = require('../../functions/createObjectForRes');
const upload = multer();

router.post('/', upload.none(), (req, res) => {
    try {
        const { session } = req.body;
        // Find the user in the database
        User.findOne({ sessionKey: session })
            .then(user => {
                if (+user?.permission < 5) {
                    // check the session 
                    let flag = isSessionExpired(user.sessionAddedAt);
                    if (!flag) {
                        User.find()
                            .then(users => {
                                users = users.map(user => (usersObject(user)))
                                res.send({ success: true, message: 'Ok', users: users });
                            }).
                            catch(err => {
                                // Handle any error that occurred during the database query
                                console.log(err);
                                res.send({ success: false, message: 'An error occurred' });
                            });
                    } else {
                        res.send({ success: false, message: 'Please Login.' });
                    }
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
