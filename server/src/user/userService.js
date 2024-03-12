const userModel = require('./userModel');
const key = '123456789trytryrtryr';
const encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        const userModelData = new userModel();

        userModelData.firstName = userDetails.firstname;
        userModelData.lastName = userDetails.lastname;
        userModelData.email = userDetails.email;
        userModelData.password = userDetails.password;

        // Encrypting the password
        const encryptedPassword = encryptor.encrypt(userDetails.password);
        userModelData.password = encryptedPassword;

        userModelData.save()
            .then((result) => {
                resolve(true);
            })
            .catch((error) => {
                reject(false);
            });
    });
}

module.exports.loginuserDBService = (userDetails) => {
    return new Promise(function myFn(resolve, reject) {
        userModel.findOne({ email: userDetails.email })
            .then(result => {
                if (result) {
                    var decrypted = encryptor.decrypt(result.password);

                    if (decrypted == userDetails.password) {
                        resolve({ status: true, msg: "User Validated Successfully" });
                    } else {
                        reject({ status: false, msg: "User Validation Failed" });
                    }
                } else {
                    reject({ status: false, msg: "Invalid User Details" });
                }
            })
            .catch(error => {
                reject({ status: false, msg: "Error retrieving user details" });
            });
    });
};

module.exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    resolve(user);
                } else {
                    reject({ status: false, msg: "User not found" });
                }
            })
            .catch(error => {
                reject({ status: false, msg: "Error retrieving user details" });
            });
    });
};


module.exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        userModel.findById(userId)
            .then(user => {
                if (user) {
                    resolve(user);
                } else {
                    reject({ status: false, msg: "User not found" });
                }
            })
            .catch(error => {
                reject({ status: false, msg: "Error retrieving user details" });
            });
    });
};

module.exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        userModel.find()
            .then(user => {
                resolve(user);
            })
            .catch(error => {
                reject({ status: false, msg: "Error retrieving users" });
            });
    });
};


