
Machine.cog({

    display: '<slot name="renderer" ></slot>',

    relays: [
        {action: 'clickTo', state: 'activeFrom'}
    ],

    actions: {
        doClick: '| .value, .toggle, activeFrom * toClickValue > $clickTo',
    },

    gears: {
        renderer: {url: 'renderer', doClick: '$doClick', active: 'active', config: 'props'}
    },

    calcs: {

        // selectorConfig: 'props * extendConfig',
        active: '~ .value, .toggle, activeFrom * isActive',
        renderer: '.renderer * toRenderer'

    },


    toRenderer: function(renderer){

        return renderer || './renderers/anchor.js';

    },

    toClickValue: function(msg){

        const currentValue = msg.activeFrom;
        const clickValue = msg.value;

        return msg.toggle ? !currentValue : clickValue;

    },

    isActive: function(msg){

        const currentValue = msg.activeFrom;

        if(msg.toggle)
            return !!currentValue;

        return msg.value === currentValue;

    }


});