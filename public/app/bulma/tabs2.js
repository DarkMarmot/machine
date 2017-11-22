
Machine.cog({

    display: '<div name="tabs"><ul><slot name="list_items"></ul></slot></div>',

    relays: [
        {state: 'items'}
    ],

    buses: [
        'props * render'
    ],

    chains: {

        list_items: {
            url: 'BULMA selectable.js',
            config: 'props', // inherit this parent props
            source: 'items' // use the relayed source for privately declared data sources
        }

    },

    render: function(props){

        const classes = 'tabs ' + (props.classes || '');
        this.dom.tabs.setClasses(classes);

    }

});