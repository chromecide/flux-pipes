function attributeRemove(ctx, cbs){
    if(this.cfg.target){
        delete ctx[this.cfg.target];
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}


attributeRemove.flux_pipe = {
    name: 'Attributes : Removes',
    description: 'Removes an attribute from the Context',
    configs:[
        {
            name: 'target',
            description: 'Target Attribute'
        }
    ]
};

module.exports = attributeRemove;