import PathResolver from './pathResolver.js';
import ScriptLoader from './scriptLoader.js';
import ScriptMonitor from './scriptMonitor.js';
import Cog from './cog.js';

let Machine = {};
const NOOP = function(){};
const TRUE = function(){ return true;};

Machine.init = function init(slot, url){

    url = PathResolver.resolveUrl(null, url);
    return new Cog(url, slot);

};

const defaultMethods = ['prep','init','mount','start','unmount','destroy'];
const defaultArrays = ['alias', 'traits', 'states', 'actions', 'buses', 'books', 'relays'];
const defaultHashes = ['els', 'cogs', 'chains', 'gears', 'methods', 'events'];



function createWhiteList(v){

    if(typeof v === 'function') // custom acceptance function
        return v;

    if(Array.isArray(v)) {
        return function (x) {
            return v.indexOf(x) !== -1;
        }
    }

    return TRUE;
}

function prepCogDefs(data){

    if(!data)
        return data;

    for(const name in data){

        const val = data[name];
        const def = val && typeof val === 'string' ? {url: val} : val;
        data[name] = def;

    }

    return data;

}

function prepGearDefs(data){

    if(!data)
        return data;

    for(const name in data){

        const val = data[name];
        const def = val && typeof val === 'string' ? {url: val} : val;
        data[name] = def;

    }

    return data;

}

// function prepDataDefs(data, asActions){
//
//     if(!data)
//         return data;
//
//     for(const name in data){
//
//         const val = data[name];
//         const empty = !val;
//         let def;
//
//         if(typeof val === 'function'){
//             def = {value: val};
//         } else if(typeof val === 'object'){
//             def = val;
//         } else if(empty) {
//             def = {};
//         } else {
//             def = {value: function(){ return val;}}
//         }
//
//         def.hasValue = def.hasOwnProperty('value');
//         def.hasAccept = def.hasOwnProperty('accept');
//         def.value = def.hasValue && def.value;
//         def.accept = def.hasAccept ? createWhiteList(def.hasAccept) : NOOP;
//         def.name = (asActions && name[0] !== '$') ? '$' + name : name;
//
//         data[name] = def;
//
//     }
//
//     return data;
//
// }


function prepStateDefs(data){

    if(!data)
        return data;

    for(const name in data){

        const val = data[name];
        const empty = !val;
        let def;

        if(typeof val === 'function'){
            def = {value: val};
        } else if(typeof val === 'object'){
            def = val;
        } else if(empty) {
            def = {};
        } else {
            def = {value: function(){ return val;}}
        }

        def.hasValue = def.hasOwnProperty('value');
        def.hasAccept = def.hasOwnProperty('accept');
        def.value = def.hasValue && def.value;
        def.accept = def.hasAccept ? createWhiteList(def.hasAccept) : NOOP;
        def.name = name;

        data[name] = def;

    }

    return data;

}


function prepWireDefs(data){

    if(!data)
        return data;

    for(const name in data){

        const val = data[name];

        let def;
        let stateName = name[0] !== '$' ? name : name.substr(1);
        const empty = !val;

        if(typeof val === 'function'){
            def = {value: val};
        } else if(typeof val === 'object'){
            def = val;
        } else if(empty) {
            def = {};
        } else {
            def = {value: function(){ return val;}}
        }

        def.hasValue = def.hasOwnProperty('value');
        def.hasAccept = def.hasOwnProperty('accept');
        def.accept = def.hasAccept ? createWhiteList(def.hasAccept) : NOOP;

        def.actionName = '$' + stateName;
        def.stateName = stateName;
        def.transform = def.transform || '';

        data[name] = def;

    }

    return data;

}

function splitCalcDefs(def){

    if(!def.calcs)
        return;

    const calcs = def.calcs;

    for(const stateName in calcs){
        def.states[stateName] = ''; // empty state
        const meow = calcs[stateName] + ' > ' + stateName;
        def.buses.push(meow);
    }

}

function prepActionDefs(data){

    if(!data)
        return data;

    for(const name in data){

        const val = data[name];
        let def;

        if(typeof val === 'object'){
            def = val;
        } else {
            def = {to: val}
        }

        def.hasAccept = def.hasOwnProperty('accept');
        def.accept = def.hasAccept ? createWhiteList(def.hasAccept) : NOOP;
        def.name = name[0] !== '$' ? '$' + name : name;
        def.to = def.to || '';
        data[name] = def;

    }

    return data;

}


Machine.cog = function cog(def){


    def.id = 0;
    def.api = null;
    def.config = null;
    def.type = 'cog';


    for(let i = 0; i < defaultHashes.length; i++){
        const name = defaultHashes[i];
        def[name] = def[name] || {};
    }

    for(let i = 0; i < defaultArrays.length; i++){
        const name = defaultArrays[i];
        def[name] = def[name] || [];
    }

    for(let i = 0; i < defaultMethods.length; i++){
        const name = defaultMethods[i];
        def[name] = def[name] || NOOP;
    }

    splitCalcDefs(def);

    def.cogs = prepCogDefs(def.cogs);
    def.gears = prepCogDefs(def.gears);
    def.states = prepStateDefs(def.states);
    def.wires  = prepWireDefs(def.wires);
    def.actions  = prepActionDefs(def.actions);

    ScriptLoader.currentScript = def;

};


Machine.trait = function trait(def){

    def.type = 'trait';
    def.config = null;
    def.cog = null; // becomes cog script instance
    def.trait = null;

    for(let i = 0; i < defaultMethods.length; i++){
        const name = defaultMethods[i];
        def[name] = def[name] || NOOP;
    }

    ScriptLoader.currentScript = def;

};

Machine.book = function book(def){

    def.type = 'book';
    ScriptLoader.currentScript = def;

};

Machine.loadScript = function(path){
    ScriptLoader.load(path);
};

Machine.getScriptMonitor = function(paths, readyCallback){
    return new ScriptMonitor(paths, readyCallback);
};


export default Machine;
