
Machine.cog({

    display: '<li name="item"><a name="anchor"><span class="icon"><i name="icon"></i></span><span name="label"></span></a></li>',

    relays: [
        {action: 'doClick'},
        {state: 'active'}
    ],

    events: {
        item: '@ click * preventDefault > $doClick',
    },

    preventDefault: function(e){
        e.preventDefault();
        return e;
    },

    buses: [
        '.icon, .label, active * render'
    ],

    render: function(msg){

        this.dom.label.text(msg.label);
        this.dom.icon.setClasses(msg.icon || '');
        this.dom.item.toggleClasses({
            'is-active': msg.active
        });
    }

});