
Machine.cog({

    display: '<li name="item"><a name="anchor"><span class="icon"><i name="icon"></i></span><span name="label"></span></a></li>',

    relays: {
        doClick$: '.doClick',
        active: '.active'
    },

    events: {
        item: '@ click * preventDefault > doClick$',
    },

    preventDefault: function(e){
        e.preventDefault();
        return e;
    },

    buses: [
        '.icon, .label * render',
        'active * renderActive'
    ],

    render: function(msg){

        this.dom.label.text(msg.label);
        this.dom.icon.setClasses(msg.icon || '');

    },

    renderActive: function(active){

        this.dom.item.toggleClasses({
            'is-active': active
        });

    }

});