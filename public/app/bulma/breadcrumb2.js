
Machine.cog({

    display: '<div name="breadcrumb"><ul>' +
    '<chain url="BULMA selectable.js" config="props" source="items"></chain>' +
    '</ul></div>',

    relays: {
        items: '.items'
    },

    buses: [
        '.classes * render'
    ],

    render: function(classes){

        this.dom.breadcrumb.setClasses('breadcrumb ' + (classes || ''));

    }

});