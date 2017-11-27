
Machine.cog({

    display: '<div name="tabs"><ul>' +
    '<chain url="BULMA list_item.js" config="props" source="items"></chain>' +
    '</ul></div>',

    relays: {
        items: '.items'
    },

    buses: [
        '.classes * render'
    ],

    render: function(classes){

        this.dom.tabs.setClasses('tabs ' + (classes || ''));

    }

});