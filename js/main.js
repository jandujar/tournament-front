// Require.js allows us to configure shortcut alias
// Their usage will become more apparent further along in the tutorial.
require.config({

    shim:{
        'underscore':{
            exports:'_'
        },
        'underscore.string':{
            deps:[
                'underscore'
            ],
            exports:'_s'
        },
        'handlebars':{
            exports:'Handlebars'
        }
    },

    paths:{
        jquery:'libs/jquery',
        underscore:'libs/underscore',
        'underscore.string':"libs/underscore.string",
        backbone:'libs/backbone',
        'backbone.ext':'libs/extensions/backbone.ext',
        'backbone-validation':'libs/backbone-validation-amd',
        'backbone-validation.ext':'libs/extensions/backbone-validation.ext',
        'backbone-paginator':'libs/backbone.paginator',
        'backbone-queryparams':'libs/backbone.queryparams',
        'bootstrap-modal':'libs/bootstrap-modal',
        'bootstrap-dropdown':'libs/bootstrap-dropdown',
        'bootstrap-alert':'libs/bootstrap-alert',
        'bootstrap-tooltip':'libs/bootstrap-tooltip',
        use:"libs/use",
        async:"libs/async",
        pubsub:'libs/pubsub',
        localstorage:"libs/localstorage",
        text:"libs/text",
        i18n:"libs/i18n",
        templates:"/templates",
        handlebars:"libs/handlebars",
        'handlebars.helpers':"libs/extensions/handlebars.helpers",
        keymaster:"libs/keymaster"
    }

});

// namespaces for Singleton views and routers
App = {
    Routers:{},
    Views:{}
};


require([

    // Load our app module and pass it to our definition function
    'app',
    'async',
    'events',
    'config'
    // Some plugins have to be loaded in order due to their non AMD compliance
    // Because these scripts are not "modules" they do not pass any values to the definition function below
], function (App) {

    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});