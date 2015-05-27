function pipesGetPipeList(ctx, cbs){
    var pipeList = {};

    for(var pipeName in ctx._fp.pipe.prototype.namedPipes){
        pipeList[pipeName] = ctx._fp.pipe.prototype.namedPipes[pipeName];
    }
    
    ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, pipeList);

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

pipesGetPipeList.flux_pipe = {
    name: 'Pipes : Get Pipe List',
    description: 'Copies the current list of registered pipes to the target attribute',
    configs:[
        {
            name: 'target',
            description: 'Target Attribute'
        }
    ]
};

module.exports = pipesGetPipeList;