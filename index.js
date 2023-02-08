const express = require('express');
const app = express();

const dbConnect = require('./db');
const { UserModel } = require('./schema/user');
const { userPostModel } = require('./schema/user_post');
const { userRoleModel } = require('./schema/user_role');
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//db connection
dbConnect();

const PORT = 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server listening on PORT', PORT)
    }
})

//create user
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

//add role
app.post('/addRole', async (req, res) => {
    try {
        const role = new userRoleModel(req.body)
        const response = await role.save();
        res.send({ message: 'data added successfully', data: response });
    } catch (error) {
        return error
    }
})

//create post
app.post('/:user_id/post', async (req, res) => {

    try {

        console.log(req.params.user_id);
        if (req.body.previous_message === '') {
            delete req.body.previous_message;
        }
        const postDetails = {
            user_id: req.params.user_id,
            ...req.body
        }
        const post = new userPostModel(req.body)
        const response = await post.save();
        res.send({ message: 'data added successfully', data: response });

    } catch (error) {
        return error;
    }
})

//delete post (set to active => 0)
app.delete('/post/:post_id', async (req, res) => {
    try {

        const post_id = req.params.post_id;
        const response = await userPostModel.findOneAndUpdate({ post_id: post_id }, { is_active: 0 });
        res.send({ message: 'data updated successfully', data: response });
    } catch (error) {
        return error;
    }
})

//Get All post
app.get('/post/:user_id', async (req, res) => {

    try {

        console.log(req.params.user_id);
        const response = await userPostModel.find({ user_id: req.params.user_id, is_active: 1 });
        res.send({ message: 'data fetched successfully', data: response });

    } catch (error) {
        return error;
    }
})

// edit post
app.put('/post/:post_id', async (req, res) => {

    try {
        const post_id = req.params.post_id;
        const userPost = await userPostModel.findOne({ post_id: post_id });
        if (post_message !== undefined) {
            req.body.previous_message = userPost.post_message
        }
        const response = await userPostModel.findOneAndUpdate({ post_id: post_id }, req.body);
        res.send({ message: 'data updated successfully', data: response });

    } catch (error) {
        return error;
    }
})

//get User information
app.get('/user/:user_id', async (req, res) => {

    try {
        const user_id = req.params.user_id;
        const response = await aggregate.lookup({ from: 'users', localField: 'user_id', foreignField: '_id', as: 'users' });

        res.send({ message: 'data updated successfully', data: response });

    } catch (error) {
        return error;
    }
})

module.exports = app;