function attributesNumbersIncrement(ctx, cbs){
    if(this.cfg.target){
        var value = ctx._fp.util.getObjectValueByString(ctx, this.cfg.target);
        value++;
        ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, value);
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}


attributesNumbersIncrement.flux_pipe = {
    name: 'Attributes : Numbers : Increment',
    description: 'Increments the target value.',
    configs:[
        {
            name: 'target',
            description: 'Target Attribute'
        }
    ]
};

module.exports = attributesNumbersIncrement;