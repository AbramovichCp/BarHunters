const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const users = db.users;
const sessions = db.sessions;
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const resHandler = require('./response-handler.controller');
const errorMsg = require('../common/response-messages').errorMsg;

module.exports.signIn = (req, res) => {
  let userId, userRole;

  users.findOne({ where: {user_email: req.body.email} })
    .then(user => {
      if (!user) { throw new Error(errorMsg.userNotFound); }
      if (!user.is_verified) { throw new Error(errorMsg.userNotFound); }
      userId = user.user_id;
      userRole = user.role;
      return bcrypt.compare(req.body.password, user.user_password);
    })
    .then(compareRes => {
      if (!compareRes) { throw new Error(errorMsg.incorrectCred); }

      return users.update({
        verification_token: null,
        token_expiry: null
      }, {
         where: {
           user_email: req.body.email
         }
      });

    })
    .then(() => {
      return createSession(userId);
    })
    .then(session => { 
      session.user_role = userRole;
      const accessToken = getAccessToken(session);
      
      res.status(200).send({accessToken: accessToken});
    })
    .catch(err => {
      resHandler(401, err.message, res);
    });

};


function getAccessToken(session) {

  const accessToken = jwt.sign({ 
    sub: session.user_id, 
    jti: session.refresh_token,
    role: session.user_role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }, env.secretAccessToken, { algorithm: 'HS384' });

  return accessToken;

};

module.exports.getAccessToken = getAccessToken;

async function createSession(user_id) {
  const id = await sessions.max('session_id') ? await sessions.max('session_id') + 1 : 1;
  const expires_at = new Date();
  expires_at.setDate(expires_at.getDate() + 30);

  const createdSession = await sessions.create({
    session_id: id,
    user_id: user_id,
    refresh_token: bcrypt.genSaltSync(10),
    expired_at: expires_at
  });
  
  return createdSession.get({ plain: true });
};

module.exports.createSession = createSession;
