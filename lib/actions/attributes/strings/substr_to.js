function attributeSubStringToTo(ctx, cbs){
    if(this.cfg.source && this.cfg.target){
        var value = ctx[this.cfg.source].toString();
        ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, value.substr(this.cfg.start||0, this.cfg.end||1));
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}


attributeSubStringToTo.flux_pipe = {
    name: 'Attributes:Strings:SubStringTo',
    description: 'Copies the substring of the value of one Context Attribute to another.  If the source attribute does not exist, nothing is copied and the action continues with a success. The default start is 0 and the default length is 1.',
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
            name: 'start',
            description: 'The index of the string to start at'
        },
        {
            name: 'length',
            description: 'The number of characters to copy'
        }
    ]
};

module.exports = attributeSubStringToTo;