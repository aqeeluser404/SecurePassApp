var passService = require('./passService');

// CREATE PASS
var createPassControllerFn = async (req, res) => {
    try {
        console.log(req.body);
        var status = await passService.createPassDBService(req.body, req.params.userId);
        if (status) {
            res.send({ "status": true, "message": "Pass created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating pass" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

// READ PASS (BY ID and USERID)
var getPassByIdControllerFn = async (req, res) => {
    try {
        const passId = req.params.passId; // changed from req.params.pass._id
        const userId = req.params.userId; // changed from req.params.user._id
        const pass = await passService.getPassById(passId, userId);
        if (pass) {
            res.send({ "status": true, "pass": pass });
        } else {
            res.send({ "status": false, "message": "Pass not found" });
        }
    } catch (error) {
        console.error('Error fetching pass details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// UPDATED PASS
var updatePassByIdControllerFn = async (req, res) => {
    try {
        const passId = req.params.passId;
        const userId = req.params.userId;

        const passDetails = req.body;
        const status = await passService.updatePassById(passId, passDetails, userId);
        if (status) {
            res.send({ "status": true, "message": "Pass updated successfully" });
        } else {
            res.send({ "status": false, "message": "Error updating pass" });
        }
    } catch (error) {
        console.error('Error updating pass:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE PASS
var deletePassByIdControllerFn = async (req, res) => {
    try {
        const passId = req.params.passId;
        const userId = req.params.userId;

        const status = await passService.deletePassById(passId, userId);
        if (status) {
            res.send({ "status": true, "message": "Pass deleted successfully" });
        } else {
            res.send({ "status": false, "message": "Error deleting pass" });
        }
    } catch (error) {
        console.error('Error deleting pass:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createPassControllerFn,
    getPassByIdControllerFn,
    updatePassByIdControllerFn,
    deletePassByIdControllerFn
};