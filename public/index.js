
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
        '<slot name="t"></slot>',


    aliases: {

        APP: './app',
        JS: './js',
        LOVELACE: 'APP lovelace.js',
        D3: 'JS d3.min.js',
        BULMA: 'APP bulma'

    },

    states: {
        animal: '',
        counter: 5,
        _animals: function(){ return [
                {label: 'cat', value: 'c'},
                {label: 'dog', value: 'd'},
                {label: 'bunny', value: 'b'}
            ];},
        _menuConfig: function(){ return {
                renderer: 'BULMA anchor.js',
                source: '_animals',
                clickTo: '$animal',
                activeFrom: 'animal'
            }
        }
    },

    wires: {
        animal: 'bunny'
    },

    actions: {
        incCounter: '| counter * addOne > counter'
    },

    libs: {
        d3: 'D3'
    },

    chains: {
        menu: {
            url: 'BULMA list_item.js',
            renderer: 'BULMA anchor.js',
            source: '_animals',
            clickTo: '$animal',
            activeFrom: 'animal'
        }
    },

    cogs: {
        babbage: 'LOVELACE',
        t: {
            url: 'BULMA tabs.js',
            config: '_menuConfig'
        }
        // button: {url: './lever/cogs/button.js', renderer: './textButtonRenderer.js', label: 'Bunny', value: 'b',
        // clickTo: '$animal', activeFrom: 'animal'}
    }

    // addOne: function(msg) { return msg + 1; }

});