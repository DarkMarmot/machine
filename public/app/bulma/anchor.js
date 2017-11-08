
Machine.cog({

    display: '<a name="anchor"></a>',

    buses: [
        'settings * render'
    ],

    render: function(settings){
        this.dom.anchor.text(settings.label);
    }

});