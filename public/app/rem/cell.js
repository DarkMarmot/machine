
Machine.cog({

    display: '<td name="cell">' +
        '<div name="content"></div>' +
        '</td>'
    ,

    gears: {
        content: {url: 'renderer', config: 'column'}
    },

    calcs: {
        column: 'props',
        renderer: 'props.renderer',
    }

});