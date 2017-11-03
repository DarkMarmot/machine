
Machine.cog({

    display:

        '<div>' +
            'Welcome to the Machine' +
        '</div>' +
        '<slot name="babbage"></slot>',

    aliases: {
        APP_ROOT: './app',
        LOVELACE: 'APP_ROOT lovelace.js'
    },

    cogs: {
        babbage: 'LOVELACE'
    }

});