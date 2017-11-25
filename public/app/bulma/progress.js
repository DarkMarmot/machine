
Machine.cog({

    display: '<progress name="progress"></progress>',

    relays2:
        {valueFrom: '.valueFrom'}
    ,

    buses: [
        '~ valueFrom, props * render',
    ],

    render: function(msg){

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