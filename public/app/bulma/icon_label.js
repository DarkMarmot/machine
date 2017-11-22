
Machine.cog({

    display: '<a name="anchor"><span class="icon"><i name="icon"></i></span><span name="label"></span></a>',

    buses: [
        'props * render',
        'config * render2'
    ],

    log: function(){

      const s = this.cog.scope;
      console.log('and',s.find('source'));

    },

    render: function(props){

        this.dom.label.text(props.label);
        this.dom.icon.setClasses(props.icon || '');

    },

    render2: function(props){

        this.dom.label.text(props.label);
        this.dom.icon.setClasses(props.icon || '');

    }

});