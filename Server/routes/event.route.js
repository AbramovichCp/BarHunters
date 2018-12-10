module.exports = function (app) {
  const events = require('../controller/event.controller.js');
  const places = require('../controller/place.controller.js');
  const manager = require('../controller/manager.controller.js');
  const artists = require('../controller/artists.controller.js');
  const userAction = require('../controller/user-action.controller.js');
  const createEvent = require('../controller/createUpdateEvent.controller.js');
  const auth = require('../controller/auth.controller');
  const upload = require('../middlewares/uploadImg');

  const userAccount = require('../controller/user-account.controller');
  const validation = require('../middlewares/validation.middlewares.js');
  const verifyToken = require('../middlewares/token-verify.middleware');


  app.get('/api/all-events/:page', events.getSortedAllEvents);

  app.get('/api/events/upcoming-events', events.findUpcomingEvents);

  app.get('/api/events/top', events.findPremiumEvents);

  app.get('/api/events/:id', events.findEventById);

  app.get('/api/places/short-info', places.getPlacesShortInfo);

  app.get('/api/places', places.getPlaces);


  app.get('/api/places/:id', places.getPlaceById);

  app.post('/api/add-manager', manager.addManager);

  app.get('/api/getArtists', artists.getArtists);

  app.get('/api/getPlacesByIdName', places.getPlacesByIdName);

  app.get('/api/getManagersIdPlaces', manager.getManagersIdPlaces);

  app.post('/api/uploadImg', createEvent.uploadImg);

  app.post('/api/createEvent', createEvent.createEvent);

  app.get('/api/places/:id/events', events.getEventsByPlaceId);

  app.get('/api/getEventsForDelete/:token', events.getEventsForDelete);

  app.post('/api/deleteEvent', events.deleteEvent);

  app.post('/api/updateEvent', createEvent.updateEvent);

  app.get('/api/getEventsForEdit/:token', events.getEventsForEdit);

  app.get('/api/events/search/:searchQuery', events.search);



  app.post('/api/register', validation.validateFormData('userRegistration'), userAction.userRegistration);

  app.post('/api/confirm-email', userAction.confirmEmail);

  app.post('/api/forgot-password', userAction.forgotPassword);

  app.post('/api/reset-password', validation.validateFormData('resetPassword'), userAction.resetPassword);

  app.post('/api/signIn', auth.signIn);

  app.post('/api/subscribe-to-event', verifyToken, userAccount.subscribeToEvent);

  app.post('/api/unsubscribe-from-event', verifyToken, userAccount.unsubscribeFromEvent);

  app.get('/api/user-events', verifyToken, userAccount.getUserEvents);

  app.post('/api/add-places', upload.single('image'), places.addPlaces);

  app.get('/api/personal-info', userAccount.getPersonalInfo);

  app.post('/api/edit-personal-info', verifyToken, userAccount.editPersonalInfo);

  // app.post('/api/check-access-token', verifyToken, auth.checkToken);

  app.delete('/api/delete-place/:id', places.deletePlace);
};

