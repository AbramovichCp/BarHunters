
const errorMessages = {
  general: 'Oops something went wrong, please try again!',
  alreadyReg: 'The email address you have been entered is already registered!',
  userNotFound: 'User was not found!',
  incorrectCred: 'The email address or password is incorrect!'
};

const successMessages = {
  
  unsubscribed: 'You have been successfully unsubscribed!',
  subscribed: 'You have been successfully subscribed!',
  registered: 'Your account was successfully registered. Please check your Email to activate the account.', 
  verified: 'Your account has been successfully verified!',
  pwReset: 'Your password has been successfully changed!'
};

const infoMessages = {
  pwForgot: 'Check your email for a password reset link!',
  subscribed: 'You are already subscribed!',
  unsubscibed: 'You are already unsubscribed!'
};

module.exports.successMsg = successMessages;
module.exports.errorMsg = errorMessages;
module.exports.infoMsg = infoMessages;