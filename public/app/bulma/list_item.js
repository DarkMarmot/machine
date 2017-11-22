
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

        active: 'props, activeFrom * isMatch',
        clickValue: 'props * toValue',
        renderer: 'props * toRenderer'

    },

    render: function(active){
        this.dom.item.toggleClasses({
            'is-active': active
        });
    },

    toRenderer: function(props){

        return props.item_renderer || 'anchor.js';

    },

    toValue: function(props){

        const value = props.value;
        return props.toggle_value ? !value : value;

    },

    isMatch: function(msg){
        const props = msg.props;
        const localMatch = props.hasOwnProperty('match') ? props.match : props.value;
        return localMatch === msg.activeFrom;

    }

});