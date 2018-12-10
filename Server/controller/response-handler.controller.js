
module.exports = (status, message, res, req) => {
  res.status(status).send({
    message: message,
    accessToken: req ? req.body.authorization : ''
  });
};