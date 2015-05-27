function attributeSet(ctx, cbs){
    console.log('SETTING ATTRIBUTE: '+this.cfg.target);
    if(this.cfg.target){
        var value = this.cfg.value || null;
        if(this.cfg.source){
            value = ctx.getObjectValueByString(ctx, this.cfg.source);
        }
        ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, value);
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}


attributeSet.flux_pipe = {
    name: 'Attributes:Set',
    description: 'Sets the value of the attribute to the supplied value',
    configs:[
        {
            name: 'target',
            description: 'Target Attribute'
        },
        {
            name: 'value',
            description: 'Target Value'
        },
        {
            name: 'source',
            description: 'The source attribute to use for the value(optional)'
        }
    ]
};

module.exports = attributeSet;