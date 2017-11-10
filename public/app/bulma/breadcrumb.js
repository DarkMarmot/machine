
Machine.cog({

    display: '<div name="breadcrumb"><ul><slot name="list_items"></ul></slot></div>',

    relays: [
        {state: 'source'}
    ],

    chains: {
        list_items: {
            url: 'BULMA list_item.js',
            config: 'config', // inherit this config
            source: 'source' // use the relayed source for privately declared data sources
        }
    },

    mount: function(){

        const classes = 'breadcrumb ' + (this.config.classes || '');
        this.dom.breadcrumb.setClasses(classes);

    }

});