define([
    'backbone',
    'hbs!templates/participants/pagination.html',
    'pubsub',
    'i18n!nls/messages'
], function(Backbone, paginationTemplate, Pubsub, messages) {

    return Backbone.View.extend({

        template: paginationTemplate,

        events: {
            'click a': 'changePage'
        },

        viewType: 'pagination',

        initialize: function() {

            Pubsub.on(App.Events.PAGE_UP_CALLED, this.previousPage, this);
            Pubsub.on(App.Events.PAGE_DOWN_CALLED, this.nextPage, this);

            this.collection.on('sync', this.refreshView, this);
        },

        refreshView: function() {
            this.render({info: this.collection.info(),
                firstPage: this.collection.paginator_ui.firstPage,
                previous: this.collection.previous,
                next: this.collection.next,
                messages: messages});
        },

        changePage: function(event) {
            event.stopPropagation();
            event.preventDefault();

            var target = event.currentTarget;
            var pattern = 'page=';
            var href = this.$(target).attr('href');
            var pageId = href.substring(href.indexOf(pattern) + pattern.length);
            if (pageId.indexOf('&') >= 0) {
                pageId = pageId.substring(0, pageId.indexOf('&'));
            }

            Pubsub.trigger(App.Events.NEW_PAGE, pageId);

        },

        previousPage: function(event) {

            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }

            if (this.collection.previous) {
                Pubsub.trigger(App.Events.NEW_PAGE, this.collection.previous);
            }
        },

        nextPage: function(event) {

            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }

            if (this.collection.next) {
                Pubsub.trigger(App.Events.NEW_PAGE, this.collection.next);
            }
        }

    });
});