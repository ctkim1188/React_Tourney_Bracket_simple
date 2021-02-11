const EventController = require('../controllers/events.controllers')

module.exports = app => {
    app.get('/api/events', EventController.displayEvents),
    app.post('/api/event/create', EventController.createEvent),
    app.get('/api/event/:id', EventController.displayOneEvent),
    app.delete('/api/event/:id', EventController.deleteEvent),
    app.put('/api/event/:id', EventController.updateEvent),


    app.get('/api/users', EventController.displayUsers),
    app.post('/api/user/create', EventController.createUser),
    app.delete('/api/user/:id', EventController.deleteUser),
    app.put('/api/user/:id', EventController.updateUser),
    app.get('/api/user/:id', EventController.getOneUser)
}

