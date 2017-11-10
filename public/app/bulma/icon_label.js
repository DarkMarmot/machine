
Machine.cog({

    display: '<a><span class="icon"><i name="icon"></i></span><span name="label"></span></a>',

    buses: [
        '{ source, config | source, config * render'
    ],

    render: function(msg){

        const settings = msg.source || msg.config || {};
        this.dom.label.text(settings.label);
        this.dom.icon.setClasses(settings.icon || '');

    }

});