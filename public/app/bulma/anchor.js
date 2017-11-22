
Machine.cog({

    display: '<a name="anchor"></a>',

    buses: [
        'props * render'
    ],

    render: function(props){

        this.dom.anchor.text(props.label);

    }

});