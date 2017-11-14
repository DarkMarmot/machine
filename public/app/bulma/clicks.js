
Machine.trait({

    // clicks

    relays: [
        {state: 'clickValue'},
        {action: 'clickTo'},
        {target: 'clickElement'}
    ],

    events: {
        clickElement: '@ click * preventDefault | clickValue > $clickTo',
    }

});