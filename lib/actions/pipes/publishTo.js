function pipesPublishTo(ctx, cbs){
    //pass the arguemnts directly to the pipe manager and the next pipe can handle things
    ctx._pipes.publish(this.cfg.target, ctx, cbs);
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