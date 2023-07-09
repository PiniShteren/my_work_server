const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const multer = require('multer');
const upload = multer();

router.post('/', upload.none(), (req, res) => {
    try {
        const object = req.body;
        User.findById(object.id)
            .then(user => {
                console.log(roles_array);
                if (!user.roles.find((e) => e === object.roles_array)) {
                    User.findOneAndUpdate({ _id: id },
                        { $push: { roles: object.roles_array } }, // הוספת התוכן החדש למערך
                        { new: true })
                        .then(result => {
                            res.send({ success: true, message: 'תפקיד נוסף!', user: result });
                        })
                        .catch(err => {
                            res.send({ success: false, message: 'שגיאה!' });
                        });
                } else {
                    res.send({ success: true, message: 'תפקיד כבר קיים' });
                }
            })
            .catch(err => {
                console.log(err);
                res.send({ success: false, message: 'שגיאה!' });
            });

    } catch (err) {
        // Handle any other error that occurred
        console.log(err);
        res.send({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;
