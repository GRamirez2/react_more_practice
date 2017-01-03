var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ClickSchema = new Schema({

    search: {

        type: String
},

    userCreated: {

        type: Date,
        default: Date.now
    }
});

var Click = mongoose.model("Click", ClickSchema);

module.exports = Click;