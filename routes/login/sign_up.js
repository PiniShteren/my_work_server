const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const multer = require('multer');
const upload = multer();
const { createSessionKey } = require('../../session');
const { addFile } = require('../../B2Bucket/bucket');
const { userObject } = require('../../functions/createObjectForRes');

router.post('/', upload.none(), (req, res) => {
    // Extract details from req.body
    try {
        const object = req.body;
        // check if user exist 
        User.findOne({
            $or: [
                { email: object.email },
                { phone_number: object.phone_number }
            ]
        }).then(async (user) => {
            if (user) {
                res.send({ message: "User already exists", success: true, data: userObject(user) });
            } else {
                // Create a new user
                let sessionKey = createSessionKey();
                const currentDate = new Date();

                let link = "none";
                await addFile("", req.file)
                    .then((updateLink) => { link = updateLink })
                    .catch((err) => {console.log(err);});

                const newUser = new User({
                    first_name: object.first_name,
                    last_name: object.last_name,
                    password: object.password, // Remember to hash the password before storing
                    email: object.email,
                    profile_image: { link },
                    phone_number: object.phone_number,
                    permission: object.permission,
                    sessionKey: sessionKey,
                    id_number: object.id_number,
                    sessionAddedAt: currentDate
                });

                // Save the user
                newUser.save()
                    .then((response) => {
                        res.send({ message: "User created", success: true, user: userObject(response) });
                    })
                    .catch(err => {
                        console.log(err);
                        res.send({ message: "Error", success: false })
                    });
            }
        })
            .catch(err => console.log(err));
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;
