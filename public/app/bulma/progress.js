
Machine.cog({

    display: '<progress name="progress"></progress>',

    relays: [
        {state: 'valueFrom'}
    ],

    buses: [
        'valueFrom & config * render'
    ],

    mount: function(){

        const config = this.config;
        const classes = config.classes || '';
        this.dom.progress.setClasses(classes);

    },

    render: function(msg){

        const value = msg.valueFrom;
        const max = msg.config.max || 1;
        this.dom.progress.attrs({
            value: value,
            max: max
        });

    }

});