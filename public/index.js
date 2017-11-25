
Machine.cog({

    mount: function(){
console.log('index mount');
    },

    display:

        '<div>' +
            'Welcome to the Machine' +
        '</div>' +
        '<cog url="LOVELACE"></cog>' +
        '<div class="tabs is-toggle"><ul><slot name="menu"></slot></ul></div>' +
        '<slot name="button"></slot>' +
        '<cog url="BULMA progress.js" config="_progress"></cog>' +
        '<cog url="BULMA anchor.js" config="_anchor"></cog>' +
        '<slot name="icon_label"></slot>' +
        '<slot name="selectable"></slot>' +
        '<cog url="BULMA tabs2.js" config="_menuConfig"></cog>' +
    '<div class="tabs is-toggle"><ul><slot name="chain"></slot></ul></div>',


    aliases: {

        APP: './app',
        JS: './js',
        LOVELACE: 'APP lovelace.js',
        D3: 'JS d3.min.js',
        BULMA: 'APP bulma'

    },

    states: {

        _anchor: function(){ return { label: 'Kitten Happy!'}},
        _progress: function(){ return { valueFrom: '_animalPct'}},

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

                renderer: 'BULMA renderers/icon_label.js',
                items: '_animals',
                clickTo: '$animal',
                activeFrom: 'animal',
                classes: '', //'is-right is-toggle is-boxed is-large',

            }
        },

        _sConfig: function(){ return {

                renderer: 'BULMA renderers/icon_label.js',
                items: '_animals',
                clickTo: '$animal',
                activeFrom: 'animal',
                classes: 'is-right is-toggle is-boxed is-large',

            }
        },

        meowing: function(){
            return {
                label: 'meowowowo',
                icon: 'fa fa-edit'
            };
        }
    },

    buses: [
      // 'others > _animals'
    ],
    wires: {
        animal: 'bunny'
    },


    libs: {
        d3: 'D3'
    },

    chains: {
        chain: {
            url: 'BULMA selectable.js',
            renderer: 'BULMA renderers/icon_label.js',
            source: '_animals',
            clickTo: '$animal',
            activeFrom: 'animal',
            classes: 'is-left is-toggle is-boxed is-large'
        }
    },

    cogs: {
        // babbage: 'LOVELACE',

        // t: {
        //     url: 'BULMA tabs2.js',
        //     config: '_menuConfig'
        // },

        selectable: {
            url: 'BULMA breadcrumb2.js',
            renderer: 'BULMA renderers/icon_label.js',
            items: '_animals',
            clickTo: '$animal',
            activeFrom: 'animal',
            classes: 'is-right is-toggle is-boxed is-large'
        },

        // progress: {
        //     url: 'BULMA progress.js',
        //     valueFrom: '_animalPct'
        // },
        // anchor: {
        //     url: 'BULMA anchor.js',
        //     label: 'Kitten Rage!'
        // },
        icon_label: {
            url: 'BULMA icon_label.js',
            config: 'meowing'
            // icon: 'fa fa-dashboard',
            // label: 'Go Go Bunny Rangers!'
        }
        // button: {url: './lever/cogs/button.js', renderer: './textButtonRenderer.js', label: 'Bunny', value: 'b',
        // clickTo: '$animal', activeFrom: 'animal'}
    }

    // addOne: function(msg) { return msg + 1; }

});