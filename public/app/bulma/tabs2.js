
Machine.cog({

    display: '<div name="tabs"><ul><slot name="list_items"></ul></slot></div>',

    relays: [
        {state: 'source'}
    ],

    chains: {

        list_items: {
            url: 'BULMA selectable.js',
            config: 'config', // inherit this config
            source: 'source' // use the relayed source for privately declared data sources
        }

    },

    mount: function(){

        const config = this.config;
        const classes = 'tabs ' + (config.classes || '');
        this.dom.tabs.setClasses(classes);

    }

});