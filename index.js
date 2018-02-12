var driveHandler = require('./src/utils/googleDriveHandler');
var mongoHandler = require('./src/utils/dbSync');
var folderId = "1FBnqHs957_WKzFbOsfV086P7rAJOR-Vu";

driveHandler.listFolder(folderId, onDriveListed);

function onDriveListed(err, result) {
    mongoHandler.sync(result, function(result) {
        console.log(result);
        process.exit()
    });
}
