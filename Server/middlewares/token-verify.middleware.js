const resHandler = require('../controller/response-handler.controller');
const env = require('../config/env');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
const sessions = db.sessions;
const createSession = require('../controller/auth.controller').createSession;
const getAccessToken = require('../controller/auth.controller').getAccessToken;

module.exports = (req, res, next) => {

    try {

        const decoded = jwt.verify(req.headers.authorization, env.secretAccessToken, { ignoreExpiration: true });
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) { return next(); }
        console.log(decoded);
        refreshToken(decoded, currentTime, req, res, next);

    } catch (err) {
        console.log();
        resHandler(401, err.message, res, req);
    }

};


function refreshToken(decoded, currentTime, req, res, next) {
    let presentSession;

    sessions.findOne({ where: { refresh_token: decoded.jti } })
        .then(currentSession => {
            if (!currentSession) { throw new Error('No refresh token') }
            presentSession = currentSession;

            return sessions.destroy({ where: { refresh_token: decoded.jti } });
        })
        .then(() => {
            if (presentSession.expired_at < currentTime) { throw new Error('Refresh expired'); }

            return createSession(decoded.sub);
        })
        .then(newSession => {
            newSession.user_role = decoded.role;

            return getAccessToken(newSession);
        })
        .then(accessToken => {
            req.headers.authorization = accessToken;
            next();
        })
        .catch(err => {
            resHandler(401, err.message, res, req);
        });
};