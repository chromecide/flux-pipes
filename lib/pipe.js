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

    pipe.prototype.publish = function(data, cbs){
        var self = this;
        //copy the actions array
        var actions = [];
        for(var a=0;a<this.actions.length;a++){
            actions.push(this.actions[a]);
        }
        data._pipe = self;
        processActions(self.namedPipes, self.namedActions, actions, data, cbs);
    };

function processActions(namedPipes, namedActions, actions, ctx, cbs){
        
    if(actions.length===0){
        if(cbs && cbs.success){
            cbs.success(ctx);
        }else{
            console.log('------------');
            console.log('No Final Function');
        }
        return;
    }

    var nextAction = actions.shift();
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
                    cbs.error(new Error("Named Action not Found"));
                }
            }
            break;
        case 'object':
            if(nextAction.fn){
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
}

module.exports = pipe;