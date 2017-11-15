let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//user schema definition
let UserSchema = mongoose.Schema({
    'userid': Number,
    'name': String,
    'email': String,
    'reminder': [
        {
            'reminderid': Number,
            'title': String,
            'description': String,
            'created': String
        }
    ]
});

// // Sets the createdAt parameter equal to the current time
// BookSchema.pre('save', next => {
//   now = new Date();
//   if(!this.createdAt) {
//     this.createdAt = now;
//   }
//   next();
// });

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('user', UserSchema);