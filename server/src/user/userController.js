var userService = require('./userService')
// const axios = require('axios')
// const qs = require('qs'); 

// const verifyRecaptcha = async (token) => {
//     const secretKey = '6LfGy5UpAAAAANhCMmrPd90f3w6yUMxnND_S4U0S';
//     const url = 'https://www.google.com/recaptcha/api/siteverify';

//     const config = {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//     };

//     const body = qs.stringify({
//         secret: secretKey,
//         response: token,
//     });

//     try {
//         const response = await axios.post(url, body, config);
//         return response.data.success;
//     } catch (error) {
//         console.error('Error verifying reCAPTCHA:', error);
//         return false;
//     }
// };
const createUserControllerFn = async (req, res) => {
    try {
        // const token = req.body.recaptchaToken;
        // const isRecaptchaValid = await verifyRecaptcha(token);
        // if (!isRecaptchaValid) {
        //     return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
        // }

        const status = await userService.createUserDBService(req.body);
        if (status) {
            res.json({ status: true, message: 'User created successfully' });
        } else {
            res.status(500).json({ status: false, message: 'Error creating user' });
        }
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
    }
};


var loginUserControllerFn = async (req, res) => {
    var result = null;
    
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            // res.setHeader('Set-Cookie', 'cookieName=cookieValue; SameSite=None; Secure');
            res.send({ "status": true, "message": result.msg });
        }
        else {
            res.send({"status": false, "message": error.msg });
        }
    }
    catch(error) {
        console.log(error);
        // res.status(500).send('Internal Server Error');
        res.send({ "status": false, "message": error.msg });
    }
} 

var getUserByEmailControllerFn = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userService.getUserByEmail(email);
        if (user) {
            res.send({ "status": true, "user": user });
        } else {
            res.send({ "status": false, "message": "User not found" });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

var getUserByIdControllerFn = async function(req, res) {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

var getAllUsersControllerFn = async function(req, res) {
    try {
        const users = await userService.getAllUsers();

        if (users.length === 0) {
            // If no users found, return an empty array
            res.status(200).json([]);
        } else {
            // If users found, return them
            res.status(200).json(users);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createUserControllerFn, 
    loginUserControllerFn, 
    getUserByEmailControllerFn, 
    getUserByIdControllerFn,
    getAllUsersControllerFn
};