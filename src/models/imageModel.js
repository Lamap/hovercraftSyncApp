var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    name: String,
    googleId: String,
    shared: Boolean,
    originalSize: {
        width: Number,
        height: Number
    },
    tags: [String]
});
var Image = mongoose.model('images', imageSchema);

module.exports = Image;