const db = require('../config/db.config');
//import model tables
const Artists = db.artists;
/* find Artists*/
exports.getArtists = (req, res) => {
    Artists.findAll({
            attributes: ['artist_id', 'artist_name']
        })
        .then(artists => {
            res.json(artists);
        })
        .catch(err => {
            res.status(500).json({
                msg: 'error',
                details: err
            });
        });
};