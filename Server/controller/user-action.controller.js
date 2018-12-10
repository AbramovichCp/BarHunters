const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const users = db.users;
const nodemailer = require('nodemailer');
const env = require('../config/env');
const msgConfig = require('../config/email-message.config');
const template = require('../common/get-templates');


module.exports.userRegistration = (req, res) => {

  findOrCreateUser(req, false, 'user')
    .then(userAndIsCreated => {
      let [user, created] = userAndIsCreated;

      if (created || (!created && !user.is_verified)) {
        const url = getVerificationLink('sign-in', user.user_email);
        const emailVerificationTemplate = template.getEmailVerificationTemplate(user.user_name, url);
        const emailMessageConfig = msgConfig.getEmailVerificationConfig(user.user_email, emailVerificationTemplate);
        sendEmail(emailMessageConfig);
        return res.send({ 'message': 'Your account was successfully registered. Please check your Email to activate the account.' });
      }

      if (user.is_verified) {
        return res.send({ 'message': 'User has already been created and verified' });
      }
    });

};


module.exports.confirmEmail = (req, res) => {

  checkVerificationToken(req.body.token)
    .then(() => {

      return users.update({
        is_verified: true,
        verification_token: null,
        token_expiry: null
      }, {
          where: {
            verification_token: req.body.token
          }
        });

    })
    .then(() => {
      res.send({'message': 'Your account has been successfully verified!'});
    })
    .catch(err => {
      res.send({ 'message': err.message });
    });

};



module.exports.forgotPassword = (req, res) => {

  users.findOne({ where: { user_email: req.body.email } })
    .then(user => {
      if (!user) { throw new Error('User wan not found'); }
      if (!user.is_verified) { throw new Error('User is not verified'); }

      const url = getVerificationLink('reset-pw', user.user_email);
      const passResetTemplate = template.getPasswordResetTemplate(user.user_name, url);
      const emailMessageConfig = msgConfig.getPasswordResetConfig(user.user_email, passResetTemplate);
      sendEmail(emailMessageConfig);

      res.send({ 'message': 'Check your email for reset pw link!' });
    })
    .catch(err => {
      res.send({ 'message': err.message });
    });

};

module.exports.resetPassword = (req, res) => {

  let userEmail;

  checkVerificationToken(req.body.token)
    .then(user => {
      userEmail = user.user_email;
      return bcrypt.compare(req.body.password, user.user_password);
    })
    .then(res => {
      if (res) { throw new Error('Its your old password!'); }
      return bcrypt.hash(req.body.password, 10);
    })
    .then(hashedPassword => {

      return users.update({
        user_password: hashedPassword,
        verification_token: null,
        token_expiry: null
      }, {
          where: {
            verification_token: req.body.token
          }
        });

    })
    .then(() => {

      const notificationTemplate = template.getNotificationTemplate();
      const emailMessageConfig = msgConfig.getNotificationConfig(userEmail, notificationTemplate);
      sendEmail(emailMessageConfig);
      res.send({ 'message': 'Your password has been successfully changed!' });

    })
    .catch(err => {
      res.send({ 'message': err.message });
    });

};

/**
 * Checks verification token
 * 
 * @param {String} token 
 */
async function checkVerificationToken(token) {
  const realUser = await users.findOne({ where: { verification_token: token } });
  if (!realUser) { throw new Error('The token was not found in db!'); }
  if ((+realUser.token_expiry - Date.now()) < 0) { throw new Error('Token has been expired'); }

  return realUser;
};





/**
 * Find or create user 
 * 
 * @param {Object} req - Express request object
 */
module.exports.findOrCreateUser = findOrCreateUser;
async function findOrCreateUser(req, verified, role) {

  const id = await users.max('user_id') ? await users.max('user_id') + 1 : 1;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    })
  });
  console.log(hashedPassword);


  let [userResult, created] = await users.findOrCreate({
    where: {
      user_email: req.body.email
    },
    defaults: {
      user_id: id,
      user_name: req.body.username,
      user_email: req.body.email,
      is_verified: verified,
      user_phone: req.body.phone,
      user_password: hashedPassword,
      role: role
    }
  });

  return [userResult.get({ plain: true }), created];

};

function getVerificationLink(type, user_email) {
  const token = bcrypt.genSaltSync(10);
  const expires_in = new Date();
  expires_in.setHours(expires_in.getHours() + 3);
  const url = `http://localhost:4200/#/BarsHunters/${type}?token=${token}`;

  users.update({
    verification_token: token,
    token_expiry: expires_in
  },
    {
      where: {
        user_email: user_email
      }
    });

  return url;

};



function sendEmail(messageConfig) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.emailAdminLogin,
      pass: env.emailAdminPass,
    },
  });

  transporter.sendMail(messageConfig, (error, info) => {
    if (error) { return console.log(error); }
  });

}