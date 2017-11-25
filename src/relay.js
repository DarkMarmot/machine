
function Relay(cog, name, remote){


    this.cog = cog;
    this.name = name;
    this.remote = remote;
    this.localData = cog.scope.demand(name);
    this.isAction = name.slice(-1) === '$';
    this.valueBus = null;
    this.nameBus = cog.scope.bus()
        .context(cog.script)
        .meow(remote)
        .msg(this.connect, this).pull();


}

Relay.prototype.connect = function(remoteName){

    if(this.valueBus)
        this.valueBus.destroy();

    if(typeof remoteName !== 'string')
        return; // todo throw warning or error?

    // remoteName must be data name at parent scope!
    const remoteData = this.cog._parent.scope.find(remoteName, true);

    if(this.isAction) {
        this.valueBus = this.cog._parent.scope.bus()
            .addSubscribe(this.localData).write(remoteData);
    } else {
        this.valueBus = this.cog._parent.scope.bus()
            .addSubscribe(this.name, remoteData).write(this.localData).pull();
    }

};

