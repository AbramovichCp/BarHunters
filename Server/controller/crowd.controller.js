const db = require('../config/db.config');
const createEvent = require('../controller/createEvent.controller');
const id = createEvent.id;
const Crowd = db.crowds;

exports.addIdCrowd = (req, res) => {
    console.log('hhhhhhhhhhhhhhh', req);
    console.log('done---------------------------------------------------------------------------------------------------------------------------------------', id);
   /* Crowd.create({
        event_id: id,
        subscribers: []
    }).then(john => {
        console.log(john.get({
            plain: true
        }))
    })*/
};
