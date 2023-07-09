const express = require('express');
const router = express.Router();
const SubDepartment = require('../../models/SubDepartment');
const { roleObject, subDepartmentObject } = require('../../functions/createObjectForRes');

router.post('/', (req, res) => {
    try {
        // Find the user in the database
        SubDepartment.find()
            .then((subDepartments) => {
                if (subDepartments.length > 0) {
                    subDepartments = subDepartments.map((subDepartment) => (subDepartmentObject(subDepartment)))
                    res.send({ success: true, message: 'OK', subDepartments: subDepartments });
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
