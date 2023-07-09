const express = require('express');
const router = express.Router();
const SubDepartment = require('../../models/SubDepartment');
const multer = require('multer');
const { subDepartmentObject } = require('../../functions/createObjectForRes');
const upload = multer();

router.post('/', upload.none(), (req, res) => {
    try {
        const object = req.body;
        // Find the user in the database
        if (object?.isDelete) {
            SubDepartment.findByIdAndDelete(object.id)
                .then((response) => {
                    res.send({ success: true, message: 'תת מחלקה נמחקה בהצלחה!!' });
                })
                .catch((error) => {
                    res.send({ success: false, message: 'תת מחלקה כזה כבר קיים במערכת' });
                })
        } else {
            if (object?.id) {

            } else {
                if (object?.department_id !== null) {
                    SubDepartment.findOne({ name: object.name })
                        .then(subDepartment => {
                            if (subDepartment) {
                                // Send the user details in the response
                                res.send({ success: false, message: 'תת מחלקה כזה כבר קיים במערכת' });
                            } else {
                                // Create a new user in the database
                                SubDepartment.create({
                                    name: object.name,
                                    description: object.description,
                                    department_id: object.department_id,
                                })
                                    .then(subDepartment => {
                                        res.send({
                                            success: true,
                                            message: 'תת מחלקה נוסף בהצלחה!!',
                                            subDepartment: subDepartmentObject(subDepartment)
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
                } else {
                    res.send({ success: false, message: 'An error occurred' });
                }
            }
        }
    } catch (err) {
        // Handle any other error that occurred
        console.log(err);
        res.send({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;

