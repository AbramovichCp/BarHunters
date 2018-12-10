const db = require('../config/db.config');
const sequelize = db.sequelize;
const todayDate = Date.now();
const Event = db.events;
const Place = db.places;
const Host = db.nameHost;
const Op = db.Op;
const fs = require('fs-extra');
const Image = require('../controller/image.controller.js');

//Table models
const Events = db.events;
const Places = db.places;

//get all events, odered by event date
exports.getSortedAllEvents = (req, res) => {
    const perPage = 10;
    let totalPages;
    let totalEvents;
    let page = parseInt(req.params.page, 10);
    let offset = page === 1 ? 0 : (page - 1) * perPage;

    Events.count()
        .then(total => {
            totalEvents = total;
            totalPages = Math.ceil(totalEvents / perPage);
        })
        .then(
            Events.findAll({
                include: [{
                    model: Places,
                },],
                offset: offset,
                limit: perPage,
                order: [
                    ['event_date', 'DESC']
                ],
            }).then(events => {
                const resObj = events.map(event => {
                    return Object.assign({}, {
                        event_id: event.event_id,
                        event_title: event.event_title,
                        event_poster: Host + event.event_poster,
                        event_about: event.event_about,
                        event_date: event.event_date,
                        place_id: event.places.map(place => {
                            return Object.assign({}, {
                                place_id: place.place_id,
                                place_name: place.place_name,
                                place_address: place.place_address,
                                place_photo: Host + place.place_photo,
                            });
                        }),
                    });
                });
                res.json({
                    response: resObj,
                    page: page,
                    totalPages: totalPages,
                    totalEvents: totalEvents,
                });
            })
        );
};

exports.findAll = (req, res) => {
    Event.findAll({
        include: [{
            model: Place,
        },],
    }).then(events => {
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
                    return Object.assign({}, {
                        place_id: place.place_id,
                        place_name: place.place_name,
                        place_address: place.place_address,
                        place_capacity: place.place_capacity,
                        place_photo: place.place_photo,
                        place_contact: place.place_contact,
                        place_coords: place.place_coords,
                    });
                }),
            });
        });
        res.json(resObj);
    });
};

exports.findUpcomingEvents = (req, res) => {
    Event.findAll({
        limit: 7,
        where: {
            event_date: {
                gte: todayDate,
            },
        },
        order: [
            ['event_date', 'ASC']
        ],
        include: [{
            model: Place,
        },],
    }).then(events => {
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
                    return Object.assign({}, {
                        place_id: place.place_id,
                        place_name: place.place_name,
                        place_address: place.place_address,
                        place_capacity: place.place_capacity,
                        place_photo: place.place_photo,
                        place_contact: place.place_contact,
                        place_coords: place.place_coords,
                    });
                }),
            });
        });
        res.json(resObj);
    });
};

exports.findPremiumEvents = (req, res) => {
    Event.findAll({
        where: {
            premium: true,
            event_date: {
                gte: todayDate,
            },
        },
        order: [
            ['event_date', 'ASC']
        ],
        include: [{
            model: Place,
        },],
    }).then(events => {
        const resObj = events.map(event => {
            return Object.assign({}, {
                event_id: event.event_id,
                event_title: event.event_title,
                event_poster: Host + event.event_poster,
                event_date: event.event_date,
                place_id: event.places.map(place => {
                    return Object.assign({}, {
                        place_id: place.place_id,
                        place_name: place.place_name,
                        place_address: place.place_address,
                    });
                }),
            });
        });
        res.json(resObj);
    });
};

exports.findEventById = (req, res) => {
    let allArtistsByEventId;
    sequelize
        .query(
            'select artists.* from artists\
          join events on artists.artist_id = ANY(events.artists)\
          where event_id = $id', {
                bind: {
                    id: req.params.id,
                },
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then(artists => {
            allArtistsByEventId = artists;
            Event.findById(req.params.id, {
                include: [{
                    model: Place,
                },],
            }).then(event => {
                const resObj = Object.assign({}, {
                    event_id: event.event_id,
                    event_title: event.event_title,
                    event_poster: Host + event.event_poster,
                    event_about: event.event_about,
                    event_date: event.event_date,
                    manager_id: event.manager_id,
                    artists: allArtistsByEventId,
                    place_id: event.places.map(place => {
                        return Object.assign({}, {
                            place_id: place.place_id,
                            place_name: place.place_name,
                            place_address: place.place_address,
                        });
                    }),
                });
                res.json(resObj);
            });
        });
};

exports.getEventsByPlaceId = (req, res) => {
    const { id } = req.params;
    Event.findAll({
        where: {
            place_id: id,
        },
        order: [
            ['event_date', 'DESC']
        ],
    }).then(events => {
        const resObj = events.map(event => {
            return Object.assign({}, {
                event_id: event.event_id,
                event_title: event.event_title,
                event_date: event.event_date,
                place_id: event.place_id,
            });
        });
        res.json(resObj);
    });
};


exports.getEventsForDelete = (req, res) => {
    const token = req.params.token;
    Event.findAll({
        where: {
            event_title: {
                $ilike: '%' + token + '%'
            }
        }
    }).then(events => {
        res.json(events);
    })
        .catch(err => {
            res.status(500).json({ msg: 'error', details: err });
        });
};

exports.deleteEvent = (req, res) => {

    //truncate: false

    const token = req.body.tokenName;

    Event.find({
        where: { event_title: token }
    }).then((event) => {
        const posterPath = event.event_poster;
        Image.deletePoster(posterPath);
        return event.destroy();
    })
        .catch(err => {
            res.status(500).json({ msg: 'error', details: err });
        });
};

exports.getEventsForEdit = (req, res) => {

    const token = req.params.token;
    Event.findAll({
        where: { place_id: token }
    }).then((events) => {
        res.json(events);
    })
        .catch(err => {
            res.status(500).json({ msg: 'error', details: err });
        });
};
exports.search = (req, res) => {
    let searchQuery = JSON.parse(req.params.searchQuery);
    let placesIDs, dates;
    if (searchQuery.searchPlaces !== '') {
        placesIDs = searchQuery.searchPlaces.split(',').map(el => {
            let n = Number(el);
            return n === 0 ? n : n || el;
        });
    }

    let eventName = searchQuery.searchEvent;
    if (searchQuery.searchDates !== '') {
        dates = searchQuery.searchDates.split(',');
    } else {
        dates = 0;
    }

    let whereStatement = {};
    if (placesIDs !== undefined) {
        whereStatement.place_id = placesIDs;
    }
    if (dates) {
        whereStatement.event_date = {
            [Op.gt]: dates[0],
            [Op.lt]: dates[1]
        };
    }
    if (eventName !== '') {
        if (eventName.includes(' ')) {
            let eventNameArray = eventName.split(' ');
            for (let i = 0; i < eventNameArray.length; i++) {
                whereStatement.event_title = {
                    [Op.or]: [{
                        [Op.iLike]: `%${eventNameArray[i]}%`
                    },
                    {
                        [Op.iLike]: `${eventNameArray[i]}%`
                    },
                    {
                        [Op.iLike]: `%${eventNameArray[i]}`
                    },
                    ],
                };
            }
        } else {
            whereStatement.event_title = {
                [Op.or]: [{
                    [Op.iLike]: `%${eventName}%`
                },
                {
                    [Op.iLike]: `${eventName}%`
                },
                {
                    [Op.iLike]: `%${eventName}`
                },
                ],
            };
        }
    }
    Event.findAll({
        where: whereStatement,
        order: [
            ['event_date', 'DESC']
        ],
        include: [{
            model: Place,
        },],
    }).then(events => {
        const resObj = events.map(event => {
            return Object.assign({}, {
                event_id: event.event_id,
                event_title: event.event_title,
                event_poster: Host + event.event_poster,
                event_date: event.event_date,
                place_id: event.places.map(place => {
                    return Object.assign({}, {
                        place_id: place.place_id,
                        place_name: place.place_name,
                        place_address: place.place_address,
                    });
                }),
            });
        });
        res.json(resObj);
    });
};