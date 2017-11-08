
Machine.cog({

    display: '<div name="tabs" class="tabs is-toggle"><ul><slot name="list_items"></ul></slot></div>',

    relays: [
        {state: 'source'}
    ],

    chains: {
        list_items: {
            url: 'BULMA list_item.js',
            config: 'config',
            source: 'source'
        }
    }

});