
Machine.cog({

    display: '<a name="anchor"></a>',


    buses: [
        'settings, active * render'
    ],

    render: function(msg){

        const active = msg.active;
        const settings = msg.settings;

        this.dom.anchor.text(settings.label);
        this.dom.item.toggleClasses({
            'is-active': active
        });

    }

});