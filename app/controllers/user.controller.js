const db = require("../models");
const { validationResult } = require('express-validator');
const User = db.users
const Auth = db.auth

exports.createUser = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

    if (!request.body) {
        response.status(400).send({ 'message': 'Request body cannot be null' });
        return
    }

    const newUser = new User({
        username: request.body.username,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        phone: request.body.phone
    })

    newUser.save(newUser).then(data => {
        if (data) {
            const auth = new Auth({
                userid: data.id,
                password: request.body.password
            })
            auth.save(auth);
            response.json(data);
        } else {
            response.status(500).json({
                message: `unable to save data `
            });
        }
    }).catch(error => {
        console.log(error)
    });
}

exports.findUser = (request, response) => {
    const username = request.query.username
    query = username ? { 'username': username } : {}
    User.find(query).then(data => {
        response.json(data);
    }).catch(err => {
        response.status(500).send({
            message: err.message || "Unable to fetch user list"
        })
    });
}

exports.updateUser = (request, response) => {
    const id = request.params.id;
    User.updateOne({ _id: id }, request.body).then(data => {
        if (!data) {
            response.status(404).send({
                message: `Cannot update user with id=${id}`
            });
        } else response.send({ message: "User was updated successfully." });
    }).catch(err => {
        response.status(500).send({
            message: `Error in updating user with id=${id}`
        });
    });
}

exports.deleteUser = (request, response) => {
    const id = request.params.id;
    User.deleteOne({ _id: id }).then(data => {
        if (!data) {
            response.status(404).send({
                message: `Cannot delete user with id=${id}`
            });
        } else {
            response.send({
                message: "User was deleted successfully!"
            });
        }
    }).catch(err => {
        response.status(500).send({
            message: `Could not delete user with id=${id}`
        });
    });
}


exports.login = (request, response) => {
    if (!request.body) {
        response.status(400).send({ 'message': 'Request body cannot be null' });
        return
    }
    username = request.body.username
    password = request.body.password
    User.find({ 'username': username }).then(data => {
        if (data) {
            Auth.find({'userid':data[0].id}).then(data=>{
                if(data){
                    if(data[0].password==password){
                        response.send({'status':'OK','message':'login success'})
                    }else{
                        console.log('not omatched...');
                        response.send({'status':'failed','message':'login failed'})
                    }
                }
            }).catch(err=>{
                response.send({'status':'failed','message':'login failed'})
            });

        }else{
            response.send({'status':'failed','message':'login failed'})
        }
    }).catch(err => {
        response.status(500).send({
            message: `User not found with name=${username}`
        });
    });

}
