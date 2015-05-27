function attributeArraysAppendTo(ctx, cbs){
    if(this.cfg.source && this.cfg.target){
        var value = ctx._fp.util.getObjectValueByString(ctx, this.cfg.source);
        var currentArr = ctx._fp.util.getObjectValueByString(this.cfg.target);
        if(!Array.isArray(currentArr)){
            currentArr = [currentArr];
        }
        currentArr.push(value);
        ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, currentArr);
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

attributeArraysAppendTo.flux_pipe = {
    name: 'Attributes:Arrays:AppendTo',
    description: 'Appends the source value to the target array.  If the source value is not an array, it will be turned into an array.',
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

module.exports = attributeArraysAppendTo;