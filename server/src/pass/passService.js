const passModel = require('./passModel');
const userModel = require('../user/userModel');
const key = '123456789trytryrtryr';
const encryptor = require('simple-encryptor')(key);


// CREATE PASS SERVICE
module.exports.createPassDBService = async (passDetails, userId) => {
    try {
        // Encrypt the details
        const encryptedAccountName = encryptor.encrypt(passDetails.accountName);
        const encryptedUsername = encryptor.encrypt(passDetails.userName);
        const encryptedPassword = encryptor.encrypt(passDetails.password);

        // Create a new pass document with encrypted password
        const newPass = new passModel({
            accountName: encryptedAccountName,
            userName: encryptedUsername,
            password: encryptedPassword,
            user: userId
        });
        
        // save to mongo
        const savedPass = await newPass.save();
        
        // add pass to user array
        await userModel.findByIdAndUpdate(
            userId,
            { $push: { pass: savedPass._id } },
            { new: true, useFindAndModify: false }
        );

        return true; 
    } catch (error) {
        console.error('Error creating password entry:', error);
        throw new Error('Failed to create password entry');
    }
};


// READ PASS (BY ID) SERVICE
module.exports.getPassById = (passId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pass = await passModel.findOne({ _id: passId, user: userId });
            
            if (!pass) {
                reject(new Error('Password entry not found'));
            }

            const decryptedPass = {
                _id: pass._id, 
                accountName: encryptor.decrypt(pass.accountName),
                userName: encryptor.decrypt(pass.userName),
                password: encryptor.decrypt(pass.password)
            }
            resolve(decryptedPass);

        } catch (error) {
            console.error('Error fetching password entry:', error);
            reject(new Error('Failed to fetch password entry'));
        }
    });
};

// DELETE PASS SERVICE
module.exports.deletePassById = (passId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedPass = await passModel.findByIdAndDelete(passId);
            
            if (!deletedPass) {
                throw new Error('Password entry not found');
            }

            // Find the user by ID and remove the pass ID from the user's pass array
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            user.pass.pull(passId); // Remove passId from pass array
            await user.save();

            resolve(true) ; // Indicate successful deletion
        } catch (error) {
            console.error('Error deleting password entry:', error);
            reject(new Error('Failed to delete password entry'));
        }
    });
};

// UPDATE PASS SERVICE
module.exports.updatePassById = async (passId, passDetails, userId) => {
    try {
        // Find the password entry by its ID and associated user ID
        const pass = await passModel.findOne({ _id: passId, user: userId });
        
        if (!pass) {
            throw new Error('Password entry not found');
        }

        // Decrypt to update details
        const decryptedPass = {
            accountName: encryptor.decrypt(pass.accountName),
            userName: encryptor.decrypt(pass.userName),
            password: encryptor.decrypt(pass.password),
        };
        
        // Update details
        decryptedPass.accountName = passDetails.accountName;
        decryptedPass.userName = passDetails.userName;
        decryptedPass.password = passDetails.password;

        // Encrypt updated pass details
        pass.accountName = encryptor.encrypt(decryptedPass.accountName);
        pass.userName = encryptor.encrypt(decryptedPass.userName);
        pass.password = encryptor.encrypt(decryptedPass.password);

        // Save the updated password entry
        await pass.save();

        return true;
    } catch (error) {
        console.error('Error updating password entry:', error);
        throw new Error('Failed to update password entry');
    }
};
