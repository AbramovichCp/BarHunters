const db = require('../config/db.config');
const Place = db.places;
const Event = db.events;
const Host = db.nameHost;

exports.getPlaces = (req, res) => {
  Place.findAll({}).then(places => {
    const resObj = places.map(place => {
      return Object.assign(
        {},
        {
          place_name: place.place_name,
          place_address: place.place_address,
          place_capacity: place.place_capacity,
          place_photo: Host + place.place_photo,
          place_contact: place.place_contact,
          place_coords: place.place_coords,
          place_id: place.place_id,
          place_type: place.place_type
        }
      );
    });
    res.status(200).json(resObj);
  });
};

exports.getPlacesShortInfo = (req, res) => {
  Place.findAll({
    order: [['place_id', 'ASC']],
  }).then(places => {
    const resObj = places.map(place => {
      return Object.assign(
        {},
        {
          place_id: place.place_id,
          place_name: place.place_name,
          place_address: place.place_address,
          place_photo: Host + place.place_photo,
        }
      );
    });
    res.json(resObj);
  });
};

exports.getPlaceById = (req, res) => {
  Place.findById(req.params.id, {
  }).then(place => {
    const resObj = Object.assign({}, {
      place_name: place.place_name,
      place_address: place.place_address,
      place_photo: Host + place.place_photo,
      place_coords: place.place_coords,
      place_id: place.place_id,
    });
    res.json(resObj);
  });
};

exports.getPlacesByIdName = (req, res) => {
  Place.findAll({
      attributes: ['place_id', 'place_name']
  })
      .then(places => {
          res.json(places);
      })
      .catch(err => {
          res.status(500).json({ msg: 'error', details: err });
      });
};
exports.addPlaces = (req, res) => {
  let id;
  Place.max('place_id').then(maxId => {
    id = maxId + 1;
  })
  .then(() => {
    // console.log(`from controller ${JSON.stringify(req.file.filename)}`);
    // const fileName = JSON.stringify(req.file.filename);
    // var short = fileName.slice(0,1);
    Place.create({
      place_id: id,
      place_name: req.body.place_name,
      place_address: req.body.place_address,
      place_capacity: req.body.place_capacity,
      place_contact: req.body.place_contact,
      place_coords: req.body.place_coords,
      place_photo: 'bartka.jpg',
      place_type: 'bar'
    },{
      tableName: 'places',
      timestamp: false
    });
  })
  .catch(err => console.log(`Err addPlace ${err}`));
}

exports.deletePlace = (req, res) => {
  console.log(req.params);
  Place.destroy({
    where: {
      place_id: req.params.id
    }
  }
  )
  .catch(err => {
   res.status(404).json(res,err);
  })
}
