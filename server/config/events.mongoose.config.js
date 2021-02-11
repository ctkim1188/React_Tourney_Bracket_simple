const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/eSportsEventsDB', {
    useNewUrlParser: true,
    useUnifiedTopology : true,
})
    .then( () => console.log("database connected"))
    .catch( err => console.log("did NOT connect", err))