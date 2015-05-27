function attributesNumbersDecrement(ctx, cbs){
    if(this.cfg.source && this.cfg.target){
        var value = ctx._fp.util.getObjectValueByString(ctx, this.cfg.source);
        value++;
        ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, value);
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}


attributesNumbersDecrement.flux_pipe = {
    name: 'Attributes : Numbers : Decrement',
    description: 'Decrements the target value.',
    configs:[
        {
            name: 'target',
            description: 'Target Attribute'
        }
    ]
};

module.exports = attributesNumbersDecrement;