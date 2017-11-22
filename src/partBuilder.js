
const PartBuilder = {};


PartBuilder.defineProps = function(def, data){

    const scope = this.scope;

    const localConfigData = this.config = scope.demand('config');
    this.source = scope.demand('__source');
    if(data)
        this.source.write(data);
    this.props = scope.demand('props');

    const defConfig = def.config;

    if(typeof defConfig === 'string'){ // subscribe to named config, overriding def
        const namedConfigData = this.parent.scope.find(defConfig, true);
        scope.bus()
            .context(this)
            .addSubscribe('config', namedConfigData)
            .msg(this.extendDefToConfig)
            .write(localConfigData).pull();
    } else {
        const rawConfigData = (typeof defConfig === 'function')
            ? defConfig.call(null) : defConfig;
        const mergedConfigData = this.extendDefToConfig(rawConfigData);
        localConfigData.write(mergedConfigData);
    }

    scope.bus().context(this)
        .meow('~ config, __source * extendConfigAndSourceToProps > props')
        .pull();

};

PartBuilder.subscribeToParentSource = function(config){

    if(this.parentSourceBus)
        this.parentSourceBus.destroy();

    const localSourceData = this.source;

    if(!config.source){ // no source defined
        localSourceData.write(undefined);
        return;
    }

    if(typeof config.source === 'function'){
        const f = config.source;
        localSourceData.write(f.call(this.script));
        return;
    }

    if(typeof config.source === 'string'){

        const parentSourceName = config.source;
        const parentSourceData = this.parent.scope.find(parentSourceName, true);

        this.parentSourceBus = this.scope.bus().context(this)
            .addSubscribe(parentSourceName, parentSourceData)
            .write(localSourceData)
            .pull();

        return;

    }


    throw new Error('invalid source -- must be string or function');

};

const urlOrConfigHash = {url: true, config: true};



// override def sans url and config with config hash
PartBuilder.extendDefToConfig = function(config){

    const def = this.def;
    const result = {};

    for(const k in def){
        if(!urlOrConfigHash.hasOwnProperty(k)){
            result[k] = def[k];
        }
    }

    for(const k in config){
        result[k] = config[k];
    }

    return result;

};



// override config sans source and config with config hash
PartBuilder.extendConfigAndSourceToProps = function(msg){

    const source = msg.__source;
    const config = msg.config;
    const result = {};

    // const parentIsChain = this.parent && this.parent.type === 'chain';
    for(const k in config){
        if(k !== 'source'){
            result[k] = config[k];
        }
    }

    if(source && typeof source === 'object') {
        for (const k in source) {
            result[k] = source[k];
        }
    }

    return result;

};

PartBuilder.buildConfig = function buildConfig(def){

    if(!def && !this.parent) // empty root config
        def = {};

    let baseConfig = {};

    if(def){

        const defConfig = def.config;
        if(defConfig){

            let inheritConfig;

            if(typeof defConfig === 'string'){
                inheritConfig = this.parent.scope.find(defConfig).read();
            } else if (typeof defConfig === 'object'){
                inheritConfig = defConfig;
            }

            for(const name in inheritConfig){
                baseConfig[name] = inheritConfig[name];
            }

        }

        for(const name in def){
            if(name !== 'config')
                baseConfig[name] = def[name];
        }

        this.scope.demand('config').write(baseConfig);

    }

    this.config = this.scope.find('config').read();

};



PartBuilder.output = function output(name, value){

    const d = this.scope.find(name);
    d.write(value);

};

PartBuilder.buildStates = function buildStates(){

    const script = this.script;
    const scope  = this.scope;
    const states = script.states;

    for(const name in states){

        const def = states[name];
        const state = scope.demand(name);

        if(def.hasValue) {

            const value = typeof def.value === 'function'
                ? def.value.call(script)
                : def.value;

            state.write(value, true);
        }

    }

    for(const name in states){

        const state = scope.grab(name);
        state.refresh();

    }

};


PartBuilder.buildWires = function buildWires(){

    const wires = this.script.wires;
    const scope = this.scope;
    const script = this.script;

    // todo add initial state values

    for(const name in wires) {

        const def = wires[name];
        const state = scope.demand(def.stateName);
        const action = scope.demand(def.actionName);

        if(def.hasValue) {

            const value = typeof def.value === 'function'
                ? def.value.call(script)
                : def.value;

            state.write(value, true);
        }

        const meow = def.actionName + def.transform + ' > ' + def.stateName; // todo assert def has cmd at start
        scope.bus().context(script).meow(meow);

    }

    for(const name in wires){

        const def = wires[name];
        const state = scope.grab(def.stateName);
        state.refresh();

    }

};


PartBuilder.buildRelays = function buildRelays(){

    const scope = this.scope;
    const relays = this.script.relays;
    const len = relays.length;

    for(let i = 0; i < len; ++i){

        const def = relays[i];

        const actionProp = def.action;
        const stateProp = def.state;

        let actionName = null;
        let stateName = null;

        if(actionProp)
            actionName = (actionProp[0] !== '$') ? '$' + actionProp : actionProp;

        if(stateProp)
            stateName = (stateProp[0] === '$') ? stateProp.substr(1) : stateProp;

        if(actionName)
            scope.demand(actionName);

        if(stateName)
            scope.demand(stateName);

    }

    this.scope.bus().context(this).meow('props * connectRelays').pull();

};

PartBuilder.connectRelays = function connectRelays(props){

    const scope = this.scope;
    const relays = this.script.relays;
    const len = relays.length;

    // need to track and destroy on change

    for(let i = 0; i < len; ++i){

        const def = relays[i];

        const actionProp = def.action;
        const stateProp = def.state;

        let actionName = null;
        let stateName = null;

        if(actionProp)
            actionName = (actionProp[0] !== '$') ? '$' + actionProp : actionProp;

        if(stateProp)
            stateName = (stateProp[0] === '$') ? stateProp.substr(1) : stateProp;

        const remoteActionName = actionProp && props[actionProp];
        const remoteStateName = stateProp && props[stateProp];

        let remoteAction = remoteActionName ? scope._parent.find(remoteActionName, true) : null;
        let remoteState = remoteStateName ? scope._parent.find(remoteStateName, true) : null;

        let localAction = actionName ? scope.demand(actionName) : null;
        let localState = stateName ? scope.demand(stateName) : null;

        if(actionName && !stateName && remoteAction){ // only action goes out relay
            scope.bus().addSubscribe(actionName, localAction).write(remoteAction);
        }

        if(stateName && !actionName && remoteState){ // only state comes in relay
            scope.bus().addSubscribe(remoteStateName, remoteState).write(localState).pull();
        }

        if(actionName && stateName){ // defines both
            if(remoteAction && remoteState){ // wire action and state (wire together above)
                scope.bus().addSubscribe(actionName, localAction).write(remoteAction);
                scope.bus().addSubscribe(remoteStateName, remoteState).write(localState).pull();
            } else if (remoteAction && !remoteState){
                // todo assert relay has action sans state
                throw new Error('relay has action without state');
            } else if (remoteState && !remoteAction){
                // assert relay has state sans action
                throw new Error('relay has state without action');
            } else { // neither configured, wire locally
                // warning -- relay disconnected
                scope.bus().addSubscribe(actionName, localAction).write(localState);
            }
        }


    }

};


PartBuilder.buildActions = function buildActions(){

    const actions = this.script.actions;
    const scope = this.scope;

    for(const name in actions){

        const def = actions[name]; // name in hash might not have leading $
        this.scope.demand(def.name); // name in def always has leading $

        if(def.to){
            const meow = def.name + def.to; // todo assert def has cmd at start
            scope.bus().context(this.script).meow(meow);
        }
    }

};




export default PartBuilder;
