define([
    'backbone',
    'hbs!templates/header.html',
    'views/deletions/menu',
    'views/search/menu',
    'views/participants/menu',
    'pubsub',
    'i18n!nls/messages'
], function(Backbone, headerTemplate, DeletionsMenuView, SearchMenuView, ParticipantsMenuView, Pubsub, messages) {

    return Backbone.View.extend({

        events: {
            'click div': 'menuClicked',
            'click .navbar-search .dropdown-menu li a': 'toggleSearchOption'
        },

        searchOptions: {
            participants: true,
            teams: true,
            tournaments: true
        },

        template: headerTemplate,

        attributes: {
            class: 'navbar navbar-inverse navbar-fixed-top'
        },

        initialize: function() {
            Pubsub.on(App.Events.HOME_CALLED, this.backToGeneralHome, this);
            Pubsub.on(App.Events.PARTICIPANTS_HOME_CALLED, this.moveToParticipantHome, this);
            Pubsub.on(App.Events.TEAMS_HOME_CALLED, this.moveToTeamsHome, this);
            Pubsub.on(App.Events.GT_HOME_CALLED, this.moveToGTHome, this);
            Pubsub.on(App.Events.FIND_CALLED, this.focusOnSearch, this);
            Pubsub.on(App.Events.VIEW_CHANGED, this.onViewChanged, this);

            this.render({messages: messages});

            new DeletionsMenuView({root: this.$('.element-menu.delete-menu')});
            new SearchMenuView({root: this.$('.search-menu')});
        },

        selectMenuItem: function(menuItem) {
            this.$('.nav li').removeClass('active');
            if (menuItem) {
                this.$('.' + menuItem).addClass('active');
            }
        },

        setMenu: function(MenuView) {
            this.menuView = new MenuView({root: this.$('.actions-menu')});
        },

        clearMenu: function() {
            this.$('.actions-menu').html('&nbsp;');
        },

        menuClicked: function() {
            Pubsub.trigger(App.Events.REMOVE_ALERT);
        },

        toggleSearchOption: function(event) {
            event.stopPropagation();
            event.preventDefault();
            var $target = this.$(event.currentTarget);
            var $checkbox = $target.find('.search-include');
            this.toggleCheckBox($checkbox);
            this.searchOptions[$target.attr('id')] = !this.searchOptions[$target.attr('id')];
        },

        toggleCheckBox: function($checkbox) {
            $checkbox.toggleClass('icon-checked');
            $checkbox.toggleClass('icon-unchecked');
        },

        backToGeneralHome: function() {
            Backbone.history.navigate('/', true);
        },

        moveToParticipantHome: function() {
            Backbone.history.navigate('/participants', true);
        },

        moveToTeamsHome: function() {
            Backbone.history.navigate('/teams', true);
        },

        moveToGTHome: function() {
            Backbone.history.navigate('/games', true);
        },

        focusOnSearch: function(event) {
            event.stopPropagation();
            event.preventDefault();
            this.$('#searchText').focus();
        },

        /**
         * Handles main view changed by re-rendering this menu
         *
         * @param elemType type of the element managed by the main view
         * @param viewType main view type
         */
        onViewChanged: function(elemType, viewType) {

            if (this.menuElemType != elemType) {
                this.menuElemType = elemType;
                this.clearMenu();
            }

            switch (elemType) {
                case 'participant':
                    this.setMenu(ParticipantsMenuView);
                    this.selectMenuItem('element-menu');
                    break;
                case 'deletions':
                    this.selectMenuItem('delete-menu');
            }

            if (this.menuView) {
                this.menuView.onViewChanged(elemType, viewType);
            }
        }

    });
});