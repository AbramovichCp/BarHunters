const { check, validationResult } = require('express-validator/check');

let validationErrorHandler = (req, res, next) => {

  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return msg;
  };

  const result = validationResult(req).formatWith(errorFormatter);

  if (!result.isEmpty()) {
   return res.status(200).send({errors: result.mapped()});
  } 
  next();

};


module.exports.validateFormData = (method) => {

  let validators = [
    check('email')
      .isEmail()
      .isLength({min: 5}).withMessage('Invalid email'),
    check('username')
      .isLength({ min: 3 })
      .isAlphanumeric().withMessage('Invalid username'),
    check('phone')
      .isLength({ min: 7 }),
    check('password')
      .isLength({ min: 5 }).withMessage('Ivalid pw')
      .custom((value, {req}) => {
        if (value !== req.body.confirmPassword) {
          return false;
        } else {
          return value;
        }
      }).withMessage('Passwords don\'t match.')
  ];

  switch (method) {
    case 'userRegistration':
      return [].concat(validators, validationErrorHandler);
      break;
    case 'userSignIn':
      return [].concat(validators[0], validationErrorHandler);
      break;
    case 'resetPassword':
      return [].concat(validators[3], validationErrorHandler);
      break;
  };

};