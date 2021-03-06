
Machine.cog({

    mount: function(){

    },

    display:

        '<div>' +
            'Welcome to the Machine' +
        '</div>' +
        '<slot name="babbage"></slot>' +
        '<div class="tabs is-toggle"><ul><slot name="menu"></slot></ul></div>' +
        '<slot name="button"></slot>' +
        '<slot name="progress"></slot>' +
        '<slot name="anchor"></slot>' +
        '<slot name="icon_label"></slot>' +
        '<slot name="selectable"></slot>' +
        '<slot name="t"></slot>',


    aliases: {

        APP: './app',
        JS: './js',
        LOVELACE: 'APP lovelace.js',
        D3: 'JS d3.min.js',
        BULMA: 'APP bulma'

    },

    states: {
        others: function(){ return [
            {label: 'frog', value: 'x', icon: 'fa fa-home'},
            {label: 'salamander', value: 'y', icon: 'fa fa-cog'},
            {label: 'toad', value: 'b', icon: 'fa fa-space-shuttle'}
        ];},
        animal: '',
        _animalPct: .74,
        _animals: function(){ return [
                {label: 'cat', value: 'c', icon: 'fa fa-home'},
                {label: 'dog', value: 'd', icon: 'fa fa-cog'},
                {label: 'bunny', value: 'b', icon: 'fa fa-space-shuttle'}
            ];},

        _menuConfig: function(){ return {

                item_renderer: 'BULMA icon_label.js',
                source: '_animals',
                clickTo: '$animal',
                activeFrom: 'animal',
                classes: '', //'is-right is-toggle is-boxed is-large',

            }
        },

        _sConfig: function(){ return {

            renderer: 'BULMA renderers/icon_label.js',
            source: '_animals',
            clickTo: '$animal',
            activeFrom: 'animal',
            classes: 'is-right is-toggle is-boxed is-large',

        }
        }
    },

    buses: [
      'others > _animals'
    ],
    wires: {
        animal: 'bunny'
    },


    libs: {
        d3: 'D3'
    },

    // chains: {
    //     menu: {
    //         url: 'BULMA list_item.js',
    //         item_renderer: 'BULMA anchor.js',
    //         source: '_animals',
    //         clickTo: '$animal',
    //         activeFrom: 'animal'
    //     }
    // },

    cogs: {
        babbage: 'LOVELACE',
        // t: {
        //     url: 'BULMA breadcrumb.js',
        //     config: '_menuConfig'
        // },
        selectable: {
            url: 'BULMA tabs2.js',
            config: '_sConfig'
        },
        progress: {
            url: 'BULMA progress.js',
            valueFrom: '_animalPct'
        },
        anchor: {
            url: 'BULMA anchor.js',
            label: 'Kitten Rage!'
        },
        icon_label: {
            url: 'BULMA icon_label.js',
            icon: 'fa fa-dashboard',
            label: 'Go Go Bunny Rangers!'
        }
        // button: {url: './lever/cogs/button.js', renderer: './textButtonRenderer.js', label: 'Bunny', value: 'b',
        // clickTo: '$animal', activeFrom: 'animal'}
    }

    // addOne: function(msg) { return msg + 1; }

});