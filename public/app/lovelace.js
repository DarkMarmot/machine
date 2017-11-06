
Machine.cog({

    mount: function () {
        console.log('lovelace d3', this);
    },

    display:

        '<div style="padding: 10px; font-size: 12px; opacity: .5;">' +
            'Ada has arrived... <span style="font-size: 24px; opacity: 0;">It\'s alright we told you what to dream.</span>' +
        '</div>',

    libs: {
        d3: 'D3'
    }

});