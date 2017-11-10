
Machine.cog({

    display: '<a name="anchor"></a>',

    buses: [
        '{ source, config | source, config * render'
    ],

    render: function(msg){

        const settings = msg.source || msg.config || {};
        this.dom.anchor.text(settings.label);

    }

});