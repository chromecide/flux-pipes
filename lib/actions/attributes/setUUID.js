function attributeSetUUID(ctx, cbs){
    if(this.cfg.target){
        var value = ctx._fp.util.uuid();
        ctx._fp.util.setObjectValueString(ctx, this.cfg.target, value);
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}


attributeSetUUID.flux_pipe = {
    name: 'Attributes : Set UUID',
    description: 'Sets the value of the attribute to a new UUID',
    configs:[
        {
            name: 'target',
            description: 'Target Attribute'
        }
    ]
};

module.exports = attributeSetUUID;