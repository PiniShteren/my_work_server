const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const multer = require('multer');
const { addFile } = require('../../B2Bucket/bucket');
const { usersObject } = require('../../functions/createObjectForRes');
const upload = multer({
    limits: 50 * 1024 * 1024
}).single('profile_image');

router.post('/', upload, async (req, res) => {
    // Extract details from req.body
    try {
        const object = req.body;
        // check if user exist 
        if (object?.id) {
            User.findById(object.id).then(async (user) => {
                if (user) {
                    let link = "none";
                    await addFile("", req.file)
                        .then((updateLink) => { console.log(updateLink); link = updateLink })
                        .catch((err) => { console.log(err); });

                    user.first_name = object?.first_name || user.first_name;
                    user.last_name = object?.last_name || user.last_name;
                    user.email = object?.email || user.email;
                    user.phone_number = object?.phone_number || user.phone_number;
                    user.permission = object?.permission || user.permission;
                    user.id_number = object?.id_number || user.id_number;
                    user.profile_image = link ? { link } : user.profile_image;
                    console.log(object?.id_number);
                    user.save()
                        .then((response) => {
                            res.send({ message: "User updated", success: true, user: usersObject(response) });
                        })
                        .catch(err => {
                            console.log("37" + err);
                            res.send({ message: "Error", success: false });
                        });
                } else {
                    return res.send({ message: "User not exists", success: false });
                }
            })
                .catch(err => console.log(err));
        } else {
            let newUser;
            let link = "none";
            await addFile("", req.file)
                .then((updateLink) => { link = updateLink })
                .catch((err) => { console.log(err); });

            newUser = new User({
                first_name: object?.first_name,
                last_name: object?.last_name,
                email: object?.email,
                profile_image: { link },
                phone_number: object?.phone_number,
                permission: object?.permission,
                id_number: object?.id_number,
                password: object?.password
            });
            // Save the user
            newUser.save()
                .then((response) => {
                    return res.send({ message: "User created", success: true, user: usersObject(response) });
                })
                .catch(err => {
                    console.log(err);
                    return res.send({ message: "Error", success: false });
                });
        }
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;
