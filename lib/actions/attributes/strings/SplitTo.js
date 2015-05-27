function SplitTo(ctx, cbs){
    if(this.cfg.source && this.cfg.target && this.cfg.delimeter){
        var value = ctx._fp.util.getObjectValueByString(ctx, this.cfg.source);
        ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, value.toString().split(this.cfg.delimeter));
    }

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}


SplitTo.flux_pipe = {
    name: 'Attributes:Strings:AsStringTo',
    description: 'Copies the value of one Context Attribute to another as an array of parts split on the supplied delimeter.',
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
            name: 'delimeter',
            description: 'The delimeter to use when splitting the source string.'
        }
    ]
};

module.exports = SplitTo;