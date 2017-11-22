
Machine.cog({

    display: '<a name="anchor"><span class="icon"><i name="icon"></i></span><span name="label"></span></a>',

    buses: [
        'props * render'
    ],

    render: function(props){

        this.dom.label.text(props.label);
        this.dom.icon.setClasses(props.icon || '');

    }
});