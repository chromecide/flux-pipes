function pipesPublishTo(ctx, cbs){
    //pass the arguemnts directly to the pipe manager and the next pipe can handle things
    if(Array.isArray(this.cfg.target)){
        processAndWaitForAll(this.cfg, ctx, cbs);
    }else{
        ctx._pipes.publish(this.cfg.target, ctx, cbs);
    }
}


function processAndWaitForAll(cfg, ctx, cbs){

    var numLaunched = cfg.target.length;
    var numReturned = 0;
    var errors = [];

    function successReturn(retCtx){
        numReturned++;
        if(numReturned==numLaunched){
            if(cbs.success){
                cbs.success(ctx);
            }
        }
    }

    function errorReturn(err){
        numReturned++;
        if(numReturned==numLaunched){
            if(!cfg.continueOnError){
                if(cbs.error){
                    cbs.error(ctx);
                }
            }
        }
    }

    for(var i=0;i<cfg.target.length;i++){
        ctx._pipes.publish(cfg.target[i], ctx, {
            success: successReturn,
            error: errorReturn
        });
    }
}

pipesPublishTo.flux_pipe = {
    name: 'Pipes : Publish To',
    description: 'Publishes the Context to a new Named Pipe',
    configs:[
        {
            name: 'target',
            description: 'Target Pipe Name'
        }
    ]
};

module.exports = pipesPublishTo;