function attributeCopyIndexTo(ctx, cbs){
    if(this.cfg.source && this.cfg.target){
        var idx;

        if(this.cfg.target_index){
            idx = ctx._fp.util.getObjectValueByString(ctx, this.cfg.target_index);
        }else{
            idx = this.cfg.index || 0;
        }

        var value = ctx._fp.util.getObjectValueByString(ctx, this.cfg.source);
        
        ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, value[idx]);
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

attributeCopyIndexTo.flux_pipe = {
    name: 'Attributes:Arrays:CopyIndexTo',
    description: 'Copies the value of one Context Attribute to another.  If the source attribute does not exist, nothing is copied and the action continues with a success.',
    configs:[
        {
            name: 'source',
            description: 'Source Attribute'
        },
        {
            name: 'target',
            description: 'Target Attribute'
        },
        {
            name: 'index',
            description: 'The index of the Source Array'
        },
        {
            name: 'target_index',
            description: 'Optional.  The source value to use as the index param'
        }
    ]
};

module.exports = attributeCopyIndexTo;