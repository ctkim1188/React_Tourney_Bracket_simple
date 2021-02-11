const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueVal = require('mongoose-unique-validator');


const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, "your event must have a name"],
        minlength: [3, "event name must be at least 3 characters long"]
    },

    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],

    organizers:[{
        type: Schema.Types.ObjectID,
        ref: 'Users'
    }],

    eventDate: {
        type: Date,
        min: [Date.now() + 3*24*60*60*1000, "event must be created at least 3 days prior to its date"],
        required: [true, "your event must have at least a tentative date"]
    },

    lockedDate:{
        type: Boolean,
        default: false,
    },

    inviteStatus:{
        type: Boolean,
        default: false
    },

    inviteCode: {
        type: String,
        default: null,
        required: false,
        minlength: [4, "invite code must be at least 4 characters long"]
    },

    progress: {
        type: String,
        default: "notStarted",
        validate: {
            validator : progress => {
                return progress === "notStarted" || progress === "inProgress" || progress === "Completed" 
            }
        }
    },

    bracket : {
        type: Object,
        default: {}
    },

    tournamentStyle : {
        type : String,
        default : "Single Elimination",
        validator : style => {
            return style === "Single Elimination" || style === "Double Elimination"
        }
    }
}, {timestamps: true})


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "your event must have a name"],
        minlength: [2, "first name must be at least 2 characters long"]
    },

    lastName: {
        type: String,
        required: [true, "your event must have a name"],
        minlength: [2, "last name must be at least 2 characters long"]
    },

    username: {
        type: String,
        required: [true, "your event must have a name"],
        minlength: [5, "usernname must be at least 5 characters long"],
        unique: true,
        uniqueCaseInsensitive: true
    },

    email: {
        type: String,
        required: [true, "you must have an email to create or register for events"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'That is not a valid email address'],
        unique: true,
        uniqueCaseInsensitive: true
    },

    password: {
        type: String,
        required: [true, "your event must have a name"],
        minlength: [5, "password must be at least 5 characters long"]
    },

    eventsPlaying:[{
        type: Schema.Types.ObjectID,
        ref: 'Events'
    }],

    eventsOrganizing:[{
        type: Schema.Types.ObjectID,
        ref: 'Events'
    }],

}, {timestamps: true})

UserSchema.plugin(uniqueVal, {message: "{PATH} {VALUE} already exists"});

var Events = mongoose.model("Events", EventSchema);
var Users = mongoose.model("Users", UserSchema);


module.exports = {
    Users,
    Events
}





