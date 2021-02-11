const models = require('../models/events.models');
const bcrypt = require('bcryptjs');


//controller for events

module.exports.displayEvents = (req, res) => {
    models.Events.find()
        .then(allEvents => res.json(allEvents))
        .catch(err => res.json(err, {message: "there is an error"}))
}

module.exports.createEvent = (req, res) => {
    if(req.body.inviteStatus === true && req.body.inviteCode){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.inviteCode, salt, (err, hash) => {
                req.body.inviteCode = hash
                models.Events.create(req.body)
                    .then(newEvent => res.json({event : newEvent}))
                    .catch(err => res.status(400).json({error: err, message: "did not create"}))
            })
        })
    }
    else if(req.body.inviteStatus === true && !req.body.inviteCode){
        return res.status(400).json({message : "invite code is needed for non public events"})
    }
    else if (req.body.inviteStatus === false && req.body.inviteCode){
        return res.status(400).json({message : "cannot create an invite code if event is public"})
    }

    else{
        models.Events.create(req.body)
            .then(newEvent => res.json({event : newEvent}))
            .catch(err => res.status(400).json({error: err, message: "did not create"}))
    }
}

module.exports.displayOneEvent = (req, res) => {
    models.Events.findOne({_id : req.params.id})
        .then(oneEvent => res.json(oneEvent))
        .catch(err => res.json(err, {message : "event does not exist"}))
}

module.exports.deleteEvent = (req, res) => {
    models.Events.deleteOne({_id : req.params.id})
    .then(delEvent => res.json(delEvent))
    .catch(err => res.json(err, {message : "did not delete"}))
}

module.exports.updateEvent = (req, res) => {

    const event = models.Events.findOne({_id : req.params.id}).then(result => res.json(result)).catch(err => res.json(err))
    console.log(event)

    if(event.inviteStatus === true && req.body.inviteCode){
        console.log('eventTrue reqCode')
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.inviteCode, salt, (err, hash) => {
                req.body.inviteCode = hash
                models.Events.findOneAndUpdate( { _id : req.params.id}, req.body, {runValidators : true, new : true, context : 'query'})
                    .then(updatedEvent => res.json ( updatedEvent ))
                    .catch(err => res.status(400).json(err))
            })
        })
    }

    else if (req.body.inviteStatus === true && req.body.inviteCode){
        console.log('reqTrue reqCode')
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.inviteCode, salt, (err, hash) => {
                req.body.inviteCode = hash
                models.Events.findOneAndUpdate( { _id : req.params.id}, req.body, {runValidators : true, new : true, context : 'query'})
                    .then(updatedEvent => res.json ( updatedEvent ))
                    .catch(err => res.status(400).json(err))
            })
        })
    }

    else if(req.body.inviteStatus === true && !req.body.inviteCode){
        console.log('reqTrue reqCodeFalse')
        return res.status(400).json({message : "invite code is needed for non public events"})
    }
    else if (req.body.inviteStatus === false && req.body.inviteCode){
        console.log('reqFalse reqCode')
        return res.status(400).json({message : "cannot create an invite code if event is public"})
    }

    else{
        console.log('everything else')
        models.Events.findOneAndUpdate( { _id : req.params.id}, req.body, {runValidators : true, new : true, context : 'query'})
            .then(updatedEvent => res.json ( updatedEvent ))
            .catch(err => res.status(400).json(err))
    }

}



//controllers for Users

module.exports.displayUsers = (req, res) => {
    models.Users.find()
    .then(allUsers => res.json(allUsers))
    .catch(err => res.json(err, {message: "something went wrong"}))
}

module.exports.createUser = (req, res) => {
    if(req.body.password.length < 5 ){
        return res.status(400).json({message: "password must be at least 5 characters"})
    }
    else{
        //hashes the password before entering user into the database
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                req.body.password = hash;
                console.log(req.body)
                models.Users.create(req.body)
                    .then(newUser => res.json({user : newUser}))
                    .catch(err => res.status(400).json({error: err, message: "did not create"}))
            })
        })
    }
}

module.exports.updateUser = (req, res) => {

    if(req.body.password){
        if(req.body.password.length < 5){
            return res.status(400).json({message : "password must be at least 5 characters"})
        }
        else{
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    req.body.password = hash;
                    console.log(req.body)
                    models.Users.findOneAndUpdate({_id : req.params.id}, req.body, {runValidators : true, new : true, context : 'query'})
                        .then(updatedUser => res.json ( updatedUser ))
                        .catch(err => res.status(400).json(err))
                })
            })
        }
    }
    else{
        models.Users.findOneAndUpdate({_id : req.params.id}, req.body, {runValidators : true, new : true, context : 'query'})
            .then(updatedUser => res.json ( updatedUser ))
            .catch(err => res.status(400).json(err))
    }
}

module.exports.deleteUser = (req, res) => {
    models.Users.deleteOne({ _id : req.params.id})
        .then(delUser => res.json(delUser))
        .catch(err => res.json(err, {message : "did not delete"}))
}

module.exports.getOneUser = (req, res) => {
    models.Users.findOne({ _id : req.params.id })
        .then(oneUser => res.json(oneUser))
        .catch(err => res.status(400).json(err))
}
