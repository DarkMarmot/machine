
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
        '{ source, config, active | source, config, active * render'
    ],

    render: function(msg){

        const settings = msg.source || msg.config || {};
        this.dom.label.text(settings.label);
        this.dom.icon.setClasses(settings.icon || '');
        this.dom.item.toggleClasses({
            'is-active': msg.active
        });
    }

});