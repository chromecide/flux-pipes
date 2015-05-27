function objectsKeysToArray(ctx, cbs){

    var obj = ctx._fp.util.getObjectValueByString(ctx, this.cfg.source);
    var keyArr = [];

    for(var key in obj){
        keyArr.push(key);
    }
    
    ctx._fp.util.setObjectValueByString(ctx, this.cfg.target, keyArr);
    
    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

objectsKeysToArray.flux_pipe = {
    name: 'FluxPipes:Attributes:Objects:KeysToArray',
    description: 'Creates an array from the keys of the source object and copies the array to the target attribute',
    configs:[
        {
            name: 'target',
            description: 'Target Attribute'
        }
    ]
};

module.exports = objectsKeysToArray;