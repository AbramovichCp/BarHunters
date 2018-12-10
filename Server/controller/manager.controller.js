const db = require('../config/db.config');
const userAction = require('../controller/user-action.controller');
const Manager = db.manager;

// exports.addManager = (req,res) => {
//     let id;
//     Manager.max('manager_id').then(maxId => {
//         id = maxId +1
//     })
//     .then(() => {
//         Manager.create({
//             manager_id: id,
//             manager_mail: req.body.manager_mail,
//             manager_password: req.body.manager_password,
//             manager_name: req.body.manager_name,
//             manager_phone: req.body.manager_phone,
//             places: req.body.places
//             }, {
//               tableName: 'managers',
//               timestamps: false
//         })
//     })
//     .then((param) => {
//         console.log(param);
//     });
// }
module.exports.addManager = (req, res) => {
    console.log('Fron SERVER ', req.body);
    userAction.findOrCreateUser(req, true, 'manager')
    .then((result) => {
        console.log(result + '');
    })
}

exports.getManagersIdPlaces = (req, res) => {
    Manager.findAll({
        attributes: ['manager_id', 'places']
    })
        .then(artists => {
            res.json(artists);
        })
        .catch(err => {
            res.status(500).json({ msg: 'error', details: err });
        });
};

