const Router = require('express').Router;
const routes = new Router();

const SecurityManager = require('./app/middlewares/security_manager');

const prefix = process.env.DATABASE_TYPE === 'mongo_db' ? 'md' : 'ds'; 

const SharedController = require( `./app/controllers/${prefix}_shared_controller`);
const DoneController = require(`./app/controllers/${prefix}_done_controller`);

/**
 * R O U T E S     H T M L
 */
routes.get( '/', ( req, res ) => res.sendFile( __dirname + '/public/index.html' ) );


/**
 * R O U T E S     A P I
 */
routes.post('/api/share/:id/', SecurityManager.hasPermission, SecurityManager.checkId, SharedController.share);
routes.get( '/api/share/:id/', SecurityManager.hasPermission, SecurityManager.checkId, SharedController.obtain);
routes.get( '/api/share/',     SecurityManager.hasPermission, SharedController.all);

routes.post('/api/done/:id/', SecurityManager.hasPermission, SecurityManager.checkId, DoneController.done);
routes.get( '/api/done/:id/', SecurityManager.hasPermission, SecurityManager.checkId, DoneController.obtain);

routes.delete('/api/remove/:id/', SecurityManager.hasPermission, SecurityManager.checkId, SharedController.remove);


/**
 * R O U T E S     D E F A U L T
 */
routes.get( '/*', ( req, res ) => res.sendStatus( 404 ) );

module.exports = routes;