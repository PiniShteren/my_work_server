const express = require('express');
const router = express.Router();
const Roles = require('../../models/Roles');
const multer = require('multer');
const upload = multer();

router.post('/', upload.none(), (req, res) => {
    try {
        const object = req.body;
        // Find the user in the database
        if (object?.isDelete) {
            Roles.findByIdAndDelete(object.id)
                .then((response) => {
                    console.log(response);
                    res.send({ success: true, message: 'תפקיד נמחק בהצלחה!!' });
                })
                .catch((error) => {
                    res.send({ success: false, message: 'תפקיד כזה כבר קיים במערכת' });
                })
        } else {
            Roles.findOne({ name: object.name })
                .then(role => {
                    if (role) {
                        // Send the user details in the response
                        res.send({ success: false, message: 'תפקיד כזה כבר קיים במערכת' });
                    } else {
                        // Create a new user in the database
                        Roles.create({
                            name: object.name,
                            department_id: object.department_id,
                            sub_department_id: object.sub_department_id
                        })
                            .then(role => {
                                res.send({
                                    success: true,
                                    message: 'תפקיד נוסף בהצלחה!!',
                                    role: role
                                });
                            })
                            .catch(err => {
                                // Handle any error that occurred during the database query
                                console.log(err);
                                res.send({ success: false, message: 'An error occurred' });
                            });
                    }
                }).catch(err => {
                    // Handle any error that occurred during the database query
                    console.log(err);
                    res.send({ success: false, message: 'An error occurred' });
                });
        }
    } catch (err) {
        // Handle any other error that occurred
        console.log(err);
        res.send({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;
