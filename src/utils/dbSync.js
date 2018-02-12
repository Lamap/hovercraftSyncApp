var mongoose = require('mongoose');
var Image = require('../models/imageModel');
var mongoKey = require('../mongoKey');
var mongoHelper = require('./mongoHelper');

function syncDb(files, callback) {
    mongoose.connect(mongoKey);
    var db = mongoose.connection;

    db.on('error', function (err) {
       console.error('MongodBb Error: ', err);
    });
    db.once('open', function() {
        console.log('Connected to mongodDb');
        listImages();
    });

    var images = [];
    var imagesById = {};
    var failedSaves = [];
    var filesById = {};

    function listImages() {

        Image.find({}, function (err, result) {
            if (err) {
                return callback('Failed to get image list from MongoDb');
            }
            images = result;
            images.map(function (image) {
                imagesById[image.googleId] = image;
            });
            addImages();
        });
    }
    function addImages() {
        var newImageSaves = [];
        files.map(function (file) {
           filesById[file.id] = file;
           if (!imagesById[file.id]) {
               var newImage = Image({
                   googleId: file.id,
                   name: file.name,
                   shared: file.shared
               });
               newImageSaves.push(newImage);
           }
        });
        mongoHelper.sequenceSave(newImageSaves, function (fails) {
            console.log(getNonExistingImages());
            callback(newImageSaves.length + ' new images, fails:', fails.length);
        })
    }

    function getNonExistingImages() {
        //TODO
        return nonExistingImageIds = images.filter(function (image) {
           return !filesById[image.googleId];
        });
    }
}

module.exports = {sync: syncDb};