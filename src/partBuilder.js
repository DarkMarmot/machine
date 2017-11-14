
const PartBuilder = {};


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
    const config = this.config || this.scope.find('config').read();
    const relays = this.script.relays;
    const len = relays.length;

    for(let i = 0; i < len; ++i){

        const def = relays[i];

        const actionProp = def.action || def.wire;
        const stateProp = def.state || def.wire;

        let actionName = null;
        let stateName = null;

        if(actionProp)
            actionName = (actionProp[0] !== '$') ? '$' + actionProp : actionProp;

        if(stateProp)
            stateName = (stateProp[0] === '$') ? stateProp.substr(1) : stateProp;

        // todo -- make $ prefix correct on these too, put in separate function
        const remoteActionName = actionProp && config[actionProp];
        const remoteStateName = stateProp && config[stateProp];

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
