var publishTo = require(__dirname+'/publishTo.js');

function pipeFilter(ctx, cbs){
    var self = this;
    var conditions = this.cfg.conditions;
    var isValid = false;

    validateConditions(ctx, conditions, {
        success: function(successCtx){
            publishTo.cfg = self.cfg;
            publishTo.call(publishTo, successCtx, cbs);
        },
        error: function(err){
            if(cbs && cbs.success){
                cbs.success(ctx);
            }
        }
    });
    
}

function validateConditions(ctx, conditionObj, cbs){
    if(Array.isArray(conditionObj)){ //OR conditions

    }else{ //AND conditions
        var valid = true;
        for(var ctxAttr in conditionObj){
            var conditionValue = conditionObj[ctxAttr];
            var attrValue = getObjectValueByString(ctx, ctxAttr);
            if((conditionValue instanceof RegExp)){
                valid = conditionValue.test(attrValue);
                if(!valid){
                    continue;
                }
            }else{
                if((typeof conditionValue)=='object'){
                    for(var op in conditionValue){
                        switch(op){
                            case 'eq':
                                valid = (attrValue==conditionValue[op]);
                                break;
                            case 'neq':
                                valid = (attrValue!=conditionValue[op]);
                                break;
                            case 'gt':
                                valid = (attrValue > conditionValue[op]);
                                break;
                            case 'lt':
                                valid = (attrValue < conditionValue[op]);
                                break;
                            case 'gte':
                                valid = (attrValue >= conditionValue[op]);
                                break;
                            case 'lte':
                                valid = (attrValue <= conditionValue[op]);
                                break;
                            case 'contains':
                                var cString = conditionValue[op];
                                cString = cString.replace('%', '.*');
                                var reg = new RegExp(cString, 'i');
                                valid = reg.test(attrValue);
                                break;
                            case 'not_contains':
                                var c2String = conditionValue[op];
                                c2String = c2String.replace('%', '.*');
                                var reg2 = new RegExp(c2String, 'i');
                                valid = !(reg2.test(attrValue));
                                break;
                            default:
                                console.log('NO OPERATOR FOR: '+op);
                                valid = false;
                                break;
                        }

                        if(!valid){
                            continue;
                        }
                    }
                }else{
                    if(attrValue != conditionValue){
                        valid = false;
                        continue;
                    }
                }
            }
        }

        if(valid){
            if(cbs && cbs.success){
                cbs.success(ctx);
            }
        }else{
            if(cbs && cbs.error){
                cbs.error('NOT VALID');
            }
        }

    }
}

function getObjectValueByString(obj, keyStr){
    if(keyStr.indexOf('.')>-1){
        var attrParts = keyStr.split('.');
        var attr = attrParts.shift();

        var subObj = obj[attr];
        return getObjectValueByString(subObj, attrParts.join('.'));
    }else{
        return obj[keyStr];
    }
}

pipeFilter.flux_pipe = {
    name: 'Pipes : Filter',
    description: 'Only Continues processing if the filter passes',
    configs:[
        {
            name: 'conditions',
            description: 'This action will publish to ctx.target if the conditions pass and then return, otherwise will return immediately'
        }
    ]
};

module.exports = pipeFilter;