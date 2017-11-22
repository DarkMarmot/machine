
Machine.cog({

    // relays: action: activeTo, state: activeFrom, wire: active
    // action: doClick ..
    //
    display: '<slot name="renderer"></slot>',

    relays: [
        {action: 'clickTo', state: 'activeFrom'}
    ],

    actions: {
        doClick: '| props, activeFrom * toClickValue > $clickTo',
    },

    gears: {
        renderer: {url: 'renderer', doClick: '$doClick', active: 'active', config: 'props'}
    },

    calcs: {

        active: 'props, activeFrom * isActive',
        renderer: 'props * toRenderer'

    },

    toRenderer: function(props){

        return props.renderer || './renderers/anchor.js';

    },

    toClickValue: function(msg){

        const props = msg.props;
        const currentValue = msg.activeFrom;
        const clickValue = props.value;

        return props.toggle ? !currentValue : clickValue;

    },

    isActive: function(msg){

        const props = msg.props;
        const currentValue = msg.activeFrom;

        if(props.toggle)
            return !!currentValue;

        const matchValue = props.hasOwnProperty('match') ? props.match : props.value;
        return matchValue === currentValue;

    }


});