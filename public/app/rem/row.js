
Machine.cog({

    display: '<tr name="row">' +
        // '<td name="cell"></td>' +
    '<chain url="REM cell.js" source="columns"></chain>' +
        '</tr>'
    ,

    // chains: {
    //     cell: {url: 'REM cell.js', source: 'columns'}
    // },

    calcs: {
        record: 'props',
    }

});