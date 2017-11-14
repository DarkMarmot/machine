
Machine.cog({

    // relays: action: activeTo, state: activeFrom, wire: active
    // action: doClick ..
    //
    display: '<slot name="renderer"></slot>',

    relays: [
        {action: 'clickTo', state: 'activeFrom'}
    ],

    actions: {
        doClick: '| settings, activeFrom * toClickValue > $clickTo',
    },

    gears: {
        renderer: {url: 'renderer', doClick: '$doClick', active: 'active'}
    },

    calcs: {

        active: 'settings, activeFrom * isActive',
        settings: '{ config, source | config, source * toSettings',
        renderer: 'settings.renderer'

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

        settings.renderer = settings.renderer || './renderers/anchor.js';

        return settings;

    },

    toClickValue: function(msg){

        const settings = msg.settings;
        const currentValue = msg.activeFrom;
        const clickValue = settings.value;

        return settings.toggle ? !currentValue : clickValue;

    },

    isActive: function(msg){

        const settings = msg.settings;
        const currentValue = msg.activeFrom;

        if(settings.toggle)
            return !!currentValue;

        const matchValue = settings.hasOwnProperty('match') ? settings.match : settings.value;
        return matchValue === currentValue;

    }


});