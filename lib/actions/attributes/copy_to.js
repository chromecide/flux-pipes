
function attributeCopyTo(ctx, cbs){
    if(this.cfg.source && this.cfg.target){
        var value = ctx._fp.util.getObjectValueByString(ctx, this.cfg.source);
        ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, value);
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}


attributeCopyTo.flux_pipe = {
    name: 'Attributes : Copy To',
    description: 'Copies the value of one Context Attribute to another.  If the source attribute does not exist, nothing is copied and the action continues with a success.',
    configs:[
        {
            name: 'source',
            description: 'Source Attribute'
        },
        {
            name: 'target',
            description: 'Target Attribute'
        }
    ]
};

module.exports = attributeCopyTo;