const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
const users = db.users;
const subscribers = db.subscribers;
const events = db.events;
const Places = db.places;
const Host = db.nameHost;
const resHandler = require('./response-handler.controller');
const successMsg = require('../common/response-messages').successMsg;
const errorMsg = require('../common/response-messages').errorMsg;
const infoMsg = require('../common/response-messages').infoMsg;


module.exports.subscribeToEvent = (req, res) => {
  const payload = jwt.decode(req.headers.authorization);

  subscribeAsync(payload.sub, req)
    .then(() => {
      resHandler(200, successMsg.subscribed, res, req);
    })
    .catch(err => {
      resHandler(401, err.message, res);
    });
};


async function subscribeAsync(user_id, req) {
  const foundSub = await subscribers.findOne({
    where: { event_id: req.body.event_id, user_id: user_id },
    attributes: ['event_id', 'user_id']
  });

  if (foundSub) { throw new Error(infoMsg.subscribed); }

  const id = await subscribers.max('subscribe_id') ? await subscribers.max('subscribe_id') + 1 : 1;

  const createdSub = subscribers.create(
    {subscribe_id: id, event_id: req.body.event_id, user_id: user_id}
  );

  return createdSub;
};


module.exports.unsubscribeFromEvent = (req, res) => {
  const payload = jwt.decode(req.headers.authorization);

  unsubscribeAsync(payload.sub, req)
    .then(() => {
      resHandler(200, successMsg.unsubscribed, res, req);
    })
    .catch(err => {
      resHandler(401, err.message, res);
    });

};


async function unsubscribeAsync(user_id, req) {

  const foundSub = await subscribers.findOne({
    where: {event_id: req.body.event_id, user_id: user_id} 
  });

  if (!foundSub) { throw new Error(infoMsg.unsubscribed); }

  const destroyed = await subscribers.destroy({
    where: {event_id: req.body.event_id, user_id: user_id}
  });

};



module.exports.getUserEvents = (req, res) => {

    const payload = jwt.decode(req.headers.authorization);

    subscribers.findAll({
            where: { user_id: payload.sub },
            attributes: ['event_id'],
            raw: true
        })
        .then(eventsId => {
            eventsId = eventsId.map(eventIdObj => {
                return eventIdObj.event_id;
            });

            return events.findAll({
                where: {
                    event_id: eventsId
                },
                order: [
                    ['event_date', 'ASC']
                ],
                include: [{
                    model: Places,
                }, ],
            });

        })
        .then(events => {

            const resObj = events.map(event => {
                return Object.assign({}, {
                    event_id: event.event_id,
                    event_title: event.event_title,
                    event_poster: Host + event.event_poster,
                    manager_id: event.manager_id,
                    artists: event.artists,
                    event_about: event.event_about,
                    event_date: event.event_date,
                    place_id: event.places.map(place => {
                        return {
                            place_address: place.place_address,
                            place_name: place.place_name
                        }
                    }),
                });
            });

            res.status(200).send({ userEvents: resObj, accessToken: req.headers.authorization });

        })
        .catch(err => {
            resHandler(401, err.message, res);
        });

};


module.exports.getPersonalInfo = (req, res) => {

    const payload = jwt.decode(req.headers.authorization);

    users.findOne({ where: { user_id: payload.sub } })
        .then(user => {

            res.status(200).send({
                personalInfo: {
                    user_name: user.user_name,
                    user_phone: user.user_phone,
                    user_email: user.user_email
                }// ,accessToken: req.headers.authorization
            });

        })
        .catch(err => {
            resHandler(403, err.message, res);
        });

};


module.exports.editPersonalInfo = (req, res) => {

    const payload = jwt.decode(req.headers.authorization);
    users.update({
            user_name: req.body.username,
            user_phone: req.body.phone
        }, {
            where: { user_id: payload.sub }
        })
        .then(() => {
            resHandler(200, '', res, req);
        })
        .catch(err => {
            resHandler(403, err.message, res);
        });

};