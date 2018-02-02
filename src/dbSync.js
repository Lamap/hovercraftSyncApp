var mongoose = require('mongoose');
var Image = require('./models/imageModel');
var Tag = require('./models/tagModel');
var Q = require('q');
var Image = require('./models/imageModel');
var mongoKey = require('./mongoKey');

function syncDb(files) {
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
                return console.error('Failed to get image list from MongoDb');
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
        function saveNextImage(index) {
            if (!newImageSaves[index]) {
                console.log((newImageSaves.length - failedSaves.length)
                    + ' image of ' + newImageSaves.length + ' hase been added to Db');
                return process.exit();
            }
            newImageSaves[index].save(function(err) {
                if (err) {
                    failedSaves.push({
                        model: newImageSaves,
                        err: err
                    });
                }
                console.log('image saved '+ (index + 1) + ' from ' + newImageSaves.length);
                saveNextImage(index + 1);
            });
        }

        saveNextImage(0);
    }

    function markNonExistingImages() {
        //TODO
        return nonExistingImageIds = images.filter(function (image) {
           return !filesById[image.googleId];
        });
    }
}

module.exports = syncDb;