function attributeStringsAppendTo(ctx, cbs){

    if(this.cfg.target){
        var value = ' ';

        if(this.cfg.source){
            value = ctx._fp.util.getObjectValueByString(ctx, this.cfg.source);
        }else{
            if(this.cfg.value){
                value = this.cfg.value;
            }
        }

        var currentValue = ctx._fp.util.getObjectValueByString(ctx, this.cfg.target) || '';
        

        ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, currentValue+value);
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

attributeStringsAppendTo.flux_pipe = {
    name: 'Attributes:Strings:AppendTo',
    description: 'Adds the source value to the end of the target string.',
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

module.exports = attributeStringsAppendTo;