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
      controller: 'Authentication',
      action: 'render_login'
    },

    'POST /login': {
      controller: 'Authentication',
      action: 'login'
    },

    'POST /register': {
      controller: 'Authentication',
      action: 'register'
    },

    '/register': {
      controller: 'Authentication',
      action: 'render_register'
    },

    '/login': {
      controller: 'Authentication',
      action: 'render_login'
    },

    '/profile': {
      controller:'Authentication',
      action: 'render_profile'
    },

    '/home': {
      controller:'Authentication',
      action: 'render_homepage'
    },

    'POST /handle_email': {
        controller:'Authentication',
        action: 'handle_email'
    },

    'POST /handle_message': {
        controller:'Authentication',
        action: 'contactinfo'
    },

    '/heat': {
        controller:'Authentication',
        action: 'render_heat'
    },

    '/gs': {
        controller:'Authentication',
        action: 'render_gs'
    },

    '/contact': {
        controller:'Authentication',
        action: 'render_contact'
    },

    'GET /nbagames': {
        controller:'Games',
        action: 'nbagames'
    },

    'GET /mlbgames': {
        controller:'Games',
        action: 'mlbgames'
    }

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
