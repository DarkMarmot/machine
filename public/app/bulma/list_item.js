
Machine.cog({

    mount: function(){
        const s = this.cog.scope;
      console.log('s', s.find('source'));
    },
    display: '<li name="item"><slot name="renderer"></slot></li>',


    relays: [
        {action: 'clickTo', state: 'activeFrom'}
    ],

    events: {
        item: '@ click * preventDefault | clickValue > $clickTo',
    },

    buses: [
        'active * render'
    ],

    gears: {
        renderer: {url: 'renderer', source: 'settings'}
    },

    calcs: {

        active: 'settings, activeFrom * isMatch',
        settings: '{ config, source | config, source * toSettings',
        clickValue: 'settings * toValue',
        renderer: 'settings.item_renderer'

    },

    render: function(active){
        this.dom.item.toggleClasses({
            'is-active': active
        });
    },

    toSettings: function(msg){

        const config = msg.config;
        const source = msg.source || {};
        const settings = {};

        for(const k in config){
            settings[k] = config[k];
        }

        for(const k in source){
            settings[k] = source[k];
        }

        settings.item_renderer = settings.item_renderer || 'anchor.js';

        return settings;

    },

    toValue: function(settings){

        const value = settings.value;
        return settings.toggle_value ? !value : value;

    },

    isMatch: function(msg){

        const settings = msg.settings;
        const localMatch = settings.hasOwnProperty('match') ? settings.match : settings.value;
        return localMatch === msg.activeFrom;

    }

});