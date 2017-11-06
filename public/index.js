
Machine.cog({

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

    libs: {
        d3: 'D3'
    },

    cogs: {
        babbage: 'LOVELACE'
    }

});