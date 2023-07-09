const express = require('express');
const router = express.Router();
const Roles = require('../../models/Roles');
const { roleObject } = require('../../functions/createObjectForRes');

router.post('/', (req, res) => {
    try {
        // Find the user in the database
        Roles.find()
            .then((roles) => {
                if (roles.length > 0) {
                    roles = roles.map((role) => (roleObject(role)))
                    res.send({ success: true, message: 'OK', roles: roles });
                } else {
                    res.send({ success: true, message: 'אין תפקידים' });
                }
            })
            .catch((err) => {
                res.send({ success: false, message: 'An error occurred' });
            })
    } catch (err) {
        // Handle any other error that occurred
        console.log(err);
        res.send({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;
