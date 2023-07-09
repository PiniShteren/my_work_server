const express = require('express');
const router = express.Router();
const Department = require('../../models/Department');
const { roleObject, departmentObject } = require('../../functions/createObjectForRes');

router.post('/', (req, res) => {
    try {
        // Find the user in the database
        Department.find()
            .then((departments) => {
                if (departments.length > 0) {
                    departments = departments.map((department) => (departmentObject(department)))
                    res.send({ success: true, message: 'OK', departments: departments });
                } else {
                    res.send({ success: true, message: 'אין תפקידים/קטגוריות' });
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
