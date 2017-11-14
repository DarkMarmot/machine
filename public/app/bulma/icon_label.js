
Machine.cog({

    display: '<a><span class="icon"><i name="icon"></i></span><span name="label"></span></a>',

    buses: [
        '{ source, config * log | source, config * render'
    ],

    log: function(){
      const s = this.cog.scope;
      console.log('and',s.find('source'));
    },

    render: function(msg){

        const settings = msg.source || msg.config || {};
        this.dom.label.text(settings.label);
        this.dom.icon.setClasses(settings.icon || '');

    }

});