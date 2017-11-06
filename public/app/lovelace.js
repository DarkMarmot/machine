
Machine.cog({

    mount: function () {
        console.log('lovelace d3', this);
    },

    display:

        '<div style="padding: 10px; font-size: 12px; opacity: .5;">' +
            'Ada has arrived...' +
        '</div>',

    libs: {
        d3: 'D3'
    },



});