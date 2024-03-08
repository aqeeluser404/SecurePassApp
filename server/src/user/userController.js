var userService = require('./userService')

var createUserControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        var status = await userService.createUserDBService(req.body);
        console.log(status);
        if (status) {
            res.send({ "status": true, "message": "User created successfully" });
        }
        else {
            res.send({ "status": false, "message": "Error creating user" });
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

var loginUserControllerFn = async (req, res) => {
    var result = null;
    
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
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

module.exports = {
    createUserControllerFn, 
    loginUserControllerFn, 
    getUserByEmailControllerFn, 
    getUserByIdControllerFn
};