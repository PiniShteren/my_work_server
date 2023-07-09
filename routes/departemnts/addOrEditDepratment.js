const express = require('express');
const router = express.Router();
const Department = require('../../models/Department');
const multer = require('multer');
const { departmentObject } = require('../../functions/createObjectForRes');
const SubDepartment = require('../../models/SubDepartment');
const Roles = require('../../models/Roles');
const upload = multer();

router.post('/', upload.none(), (req, res) => {
    try {
        const object = req.body;
        // Find the user in the database
        if (object?.isDelete) {
            Roles.deleteMany({ department_id: object.id })
                .then((err, result) => {
                    SubDepartment.deleteMany({ department_id: object?.id })
                        .then((err, result) => {
                            Department.findByIdAndDelete(object.id)
                                .then((response) => {
                                    res.send({ success: true, message: 'מחיקה בוצעה בהצלחה!!' });
                                })
                                .catch((error) => {
                                    res.send({ success: false, message: 'מחיקה נכשלה!!' });
                                });
                        }).catch((error) => {
                            res.send({ success: false, message: 'מחיקה נכשלה!!' });
                        });;
                }).catch((error) => {
                    res.send({ success: false, message: 'מחיקה נכשלה!!' });
                });;
        } else {
            if (object?.id) {
                Department.findByIdAndUpdate(object.id, { name: object?.name }, { new: true })
                    .then(department => {
                        if (department) {
                            res.send({
                                success: true,
                                message: 'מחלקה נוספה בהצלחה!!',
                                department: departmentObject(department)
                            });
                        } else {
                            res.send({ success: false, message: 'An error occurred' });
                        }
                    }).catch(err => {
                        // Handle any error that occurred during the database query
                        console.log(err);
                        res.send({ success: false, message: 'An error occurred' });
                    });
            } else {
                Department.findOne({ name: object.name })
                    .then(role => {
                        if (role) {
                            // Send the user details in the response
                            res.send({ success: false, message: 'מחלקה כזו כבר קיימת במערכת' });
                        } else {
                            // Create a new user in the database
                            Department.create({
                                name: object.name,
                                descrption: object.description
                            })
                                .then(department => {
                                    res.send({
                                        success: true,
                                        message: 'מחלקה נוספה בהצלחה!!',
                                        department: departmentObject(department)
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
        }
    } catch (err) {
        // Handle any other error that occurred
        console.log(err);
        res.send({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;
