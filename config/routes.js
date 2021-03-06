/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

    '/': {
      controller: 'Login',
      action: 'render_login'
    },

    '/register': {
      controller: 'Login',
      action: 'render_register'
    },

    '/subscription': {
      controller: 'Authentication',
      action: 'render_subscription'
    },

    '/channel1': {
      controller: 'Authentication',
      action: 'render_channel1'
    },

    '/channel2': {
      controller: 'Authentication',
      action: 'render_channel2'
    },

    '/logout': {
      controller: 'Login',
      action: 'logout'
    },

    '/login': {
      controller: 'Login',
      action: 'render_login'
    },

    '/news': {
      controller: 'Authentication',
      action: 'render_news'
    },

    '/profile': {
      controller:'Authentication',
      action: 'render_profile'
    },

    '/home': {
      controller:'Authentication',
      action: 'render_homepage'
    },

    '/recover': {
      controller:'Login',
      action: 'render_recover'
    },

    '/contact': {
        controller:'Authentication',
        action: 'render_contact'
    },

    '/baseball': {
        controller:'reddit',
        action: 'render_baseball'
    },

    '/basketball': {
        controller:'reddit',
        action: 'render_basketball'
    },

    '/hockey': {
        controller:'reddit',
        action: 'render_hockey'
    },

    '/invite': {
        controller:'Authentication',
        action: 'render_invite'
    },



  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
