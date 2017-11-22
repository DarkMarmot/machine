
Machine.cog({

    display: '<progress name="progress"></progress>',

    relays: [
        {state: 'valueFrom'}
    ],

    buses: [
        '~ valueFrom, props * render',
        'props * log1',
        'valueFrom * log2'
    ],
    //
    // mount: function(){
    //
    //     const config = this.config;
    //     const classes = config.classes || '';
    //     this.dom.progress.setClasses(classes);
    //
    // },

    log1: function(d){
        console.log('props is ', d);
    },

    log2: function(d){
        console.log('v is ', d);
    },

    render: function(msg){

        console.log('prog:', msg);
        const props = msg.props || {};
        const value = msg.valueFrom;
        const classes = props.classes || '';
        this.dom.progress.setClasses(classes);
        const max = msg.props.max || 1;
        this.dom.progress.attrs({
            value: value,
            max: max
        });

    }

});