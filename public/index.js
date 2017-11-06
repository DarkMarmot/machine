
Machine.cog({

    mount: function(){

    },

    display:

        '<div>' +
            'Welcome to the Machine' +
        '</div>' +
        '<slot name="babbage"></slot>',

    aliases: {

        APP_ROOT: './app',
        JS: './js',
        LOVELACE: 'APP_ROOT lovelace.js',
        D3: 'JS d3.min.js'

    },

    states: {
        counter: 5
    },

    actions: {
        incCounter: '| counter * addOne > counter'
    },

    libs: {
        d3: 'D3'
    },

    cogs: {
        babbage: 'LOVELACE'
    },

    addOne: function(msg){
        return msg + 1;
    }

});