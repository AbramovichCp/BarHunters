const formidable = require('formidable');
const fs = require('fs-extra');
const db = require('../config/db.config');
const Event = db.events;
const Image = require('../controller/image.controller.js');
//upload image
let extraSB = '/';
let imagePathForDb;
exports.uploadImg = (req, res) => {
    //path settings
    let preNewLocation = './public/images/';

    let folderId = null;
    //create new Name
    function newName() {

        let now = new Date();
        let name = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds();
        return name;
    }

    //define the type of the image
    function defineType(fileNameCheckType) {
        return fileNameCheckType.slice(-4);
    }

    //define the type of the image
    function getNewLocation(preNewLocation, locationId) {
        preNewLocation = preNewLocation + locationId + '/';
        return preNewLocation;
    }
    //cutPath of the image
    function cutPath(cutLocation) {
        cutLocation = cutLocation.slice(16);
       
        return cutLocation;
    }
    const form = new formidable.IncomingForm();
    form.on('error', function(err) {
        throw err;
    });


    form.parse(req, function(err, fields, files) {
        folderId = fields.locationId;
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write('received upload:\n\n');
    });


    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        let Path = this.openedFiles[0].path;

        /* The file name of the uploaded file */
        let fileNameCheckType = this.openedFiles[0].name;
        let imgName = newName();
        let receivedType = defineType(fileNameCheckType);
        let fileName = imgName + receivedType;


        /* Location where we want to copy the uploaded file */
        let newLocation = getNewLocation(preNewLocation, folderId);

        /*prepare path for Data base*/

        imagePathForDb = extraSB + cutPath(newLocation) + fileName;
        imagePathForDb = imagePathForDb.toString();

        fs.copy(Path, newLocation + fileName, function(err) {
           
            if (err) {
                console.error(err);
            } else {

            }
        });
    });
};
let id;

exports.createEvent = (req, res) => {
    Event.max('event_id').then(maxId => {
        id = maxId + 1;
    }).then(function() {
        Event.create({
            event_id: id,
            event_title: req.body.eventName,
            place_id: req.body.location,
            event_poster: imagePathForDb,
            manager_id: req.body.managers,
            artists: req.body.artists,
            event_about: req.body.description,
            event_date: req.body.dataPicker,
            premium: req.body.premium,
            subscribers: []
        }).then(john => {
            (john.get({
                plain: true
            }));
        })
    });
};

exports.updateEvent = (req, res) => {
    let oldPosterName;
    let newPosterName = req.body.poster;;
    Event.find(
        { where:
           { event_id: req.body.event_id } 
       }).then((event) => {
         oldPosterName = event.event_poster; 
        let oldEventTitle = event.event_title;
        let oldLocationId = event.place_id;
        let oldManagerId = event.manager_id;
        let oldArtists = event.artists;
        let oldEventDescription = event.event_about;
        let oldEventDate = event.event_date;
        return event.update({ 
            event_id: id,
            event_title: getCheckedData(req.body.eventName, oldEventTitle),
            place_id: getCheckedData(req.body.location, oldLocationId),
            event_poster:  getCheckedData(imagePathForDb, oldPosterName),
            manager_id: getCheckedData(req.body.managers, oldManagerId),
            artists:getCheckedData(req.body.artists, oldArtists),
            event_about:getCheckedData(req.body.description, oldEventDescription),
            event_date: getCheckedData(req.body.dataPicker, oldEventDate),
            premium: req.body.premium,
            subscribers: []
        }, {
            fields: [
                'event_title',
                'place_id',
                 'event_poster', 
                 'manager_id', 
                 'artists', 
                 'event_about',
                  'event_about', 
                  'event_date',
                   'premium',
             'subscribers' 
            ]}).then(() => {
                if(newPosterName) {
                    Image.deletePoster(oldPosterName);
                    imagePathForDb = null;
                }
           })
    })
};

function getCheckedData(newData, oldData ) {
    if(newData) {
        return newData;
    } else {
        return oldData
    }
}
