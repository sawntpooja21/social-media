// const express = require('express');
const { app } = require('.');

// const router = express.Router();

app.post('/user', async (req, res) => {
    try {
        // const { user_id, name, email, password, role_id } = req.body;
        const user = new UserModel(req.body)
        const response = await user.save();
        res.send({ message: 'data added successfully', data: response });
    }
    catch (error) {
        return error
    }
});

module.exports = router