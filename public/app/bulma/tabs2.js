
Machine.cog({

    display: '<div name="tabs"><ul>' +
    '<chain url="BULMA selectable.js" config="props" source="items"></chain>' +
    '</ul></div>',

    // relays: [
    //     {state: 'items'}
    // ],

    relays2: {
        items: '.items'
    },

    buses: [
        '.classes * render'
    ],

    render: function(classes){

        this.dom.tabs.setClasses('tabs ' + (classes || ''));

    }

});