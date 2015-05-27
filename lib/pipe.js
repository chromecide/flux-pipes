function pipe(){
    this.actions = [];
    return this;
}

    pipe.prototype.use = function(fn, cfg){
        if(cfg){
            this.actions.push({fn: fn, cfg: cfg});
        }else{
            this.actions.push(fn);
        }

        return this;
    };

    pipe.prototype.useAtIndex = function(idx, fn, cfg){
        if(cfg){
            this.actions.splice(idx, 0, {fn: fn, cfg: cfg});
        }else{
            this.actions.splice(idx, 0, fn);
        }
        return this;
    };

    pipe.prototype.unuse = function(idx){
        this.actions.splice(idx, 1);
        return this;
    };

    pipe.prototype.publish = function(data, cbs){
        var self = this;
        //copy the actions array
        var actions = [];
        console.log(this.actions);
        for(var a=0;a<this.actions.length;a++){
            actions.push(this.actions[a]);
        }
        data._pipe = self;
        
        processActions(self.namedPipes, self.namedActions, actions, data, cbs);
    };

    pipe.prototype.export = function(){
        var self = this;

        return this.actions;
    };

    pipe.prototype.import = function(actionList){
        var self = this;
        this.actions = actionList;
    };

function processActions(namedPipes, namedActions, actions, ctx, cbs){
        
    if(actions.length===0){
        if(cbs && cbs.success){
            cbs.success(ctx);
        }
        return;
    }

    var nextAction = actions.shift();

    try{
        switch((typeof nextAction)){
            case 'function':
                nextAction(ctx, {
                    success: function(rctx){
                        processActions(namedPipes, namedActions, actions, rctx, cbs);
                    },
                    error: function(err){
                        if(cbs && cbs.error){
                            cbs.error(err);
                        }
                    }
                });
                break;
            case 'string':
                if(namedActions[nextAction]){
                    namedActions[nextAction].fn(ctx, {
                        success: function(rctx){
                            processActions(namedPipes, namedActions, actions, rctx, cbs);
                        },
                        error: function(err){
                            if(cbs && cbs.error){
                                cbs.error(err);
                            }
                        }
                    });
                }else{
                    if(cbs && cbs.error){
                        cbs.error(new Error("Named Action not Found: "+nextAction));
                    }
                }
                break;
            case 'object':
                if(nextAction.fn){
                    if((typeof nextAction.fn)=='string'){
                        nextAction.fn = namedActions[nextAction.fn].fn;
                    }
                    
                    if(nextAction.cfg){
                        nextAction.fn.cfg = nextAction.cfg;
                    }
                    
                    nextAction.fn(ctx, {
                        success: function(rctx){
                            processActions(namedPipes, namedActions, actions, rctx, cbs);
                        },
                        error: function(err){
                            if(cbs && cbs.error){
                                cbs.error(err);
                            }
                        }
                    });
                }
                break;
        }
    }catch(err){
        console.log(nextAction);
        console.log(err);
        if(cbs && cbs.error){
            cbs.error(err, ctx);
        }
    }
    
}

module.exports = pipe;