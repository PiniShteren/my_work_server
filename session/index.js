const User = require('../models/User');
module.exports = {
    createSessionKey: function () {
        const length = 25;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            key += characters.charAt(randomIndex);
        }
        return key;
    },
    saveSessionKey: function (userId, sessionKey) {
        const currentDate = new Date();

        User.findByIdAndUpdate(
            userId,
            {
                sessionKey: sessionKey,
                sessionAddedAt: currentDate
            },
            { new: true } // בשביל לקבל את המשתמש המעודכן בחזרה
        )
            .then(updatedUser => {
                if (updatedUser) {
                    // המשתמש המעודכן עם המפתח והתאריך מוחזר בתשובה
                } else {
                    console.log('User not found');
                }
            })
            .catch(error => {
                console.log('Error while adding session key and date:', error);
            });
    },
    isSessionExpired: function (createdAt) {
        if (createdAt) {
            const now = new Date().getTime();
            const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            const sessionExpirationDate = new Date(createdAt.getTime() + twentyFourHours).getTime();
            return now > sessionExpirationDate;
        } else {
            return true;
        }
    }
}
