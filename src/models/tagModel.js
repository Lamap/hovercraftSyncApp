var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    name: String
});
var Tag = mongoose.model('tags', tagSchema);

module.exports = Tag;