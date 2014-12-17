function pipe(){
    this.actions = [];
    return this;
}

    pipe.prototype.use = function(fn){
        this.actions.push(fn);

        return this;
    };

    pipe.prototype.publish = function(data, cbs){
        //copy the actions array
        var actions = [];
        for(var a=0;a<this.actions.length;a++){
            actions.push(this.actions[a]);
        }

        processActions(actions, data, cbs);
    };

function processActions(actions, ctx, cbs){
        var self = this;
        if(actions.length===0){
            if(cbs && cbs.success){
                cbs.success(ctx);
            }
            return;
        }

        var nextAction = actions.shift();

        nextAction(ctx, {
            success: function(rctx){
                processActions(actions, rctx, cbs);
            },
            error: function(err){
                if(cbs && cbs.error){
                    cbs.error(err);
                }
            }
        });
    }


module.exports = pipe;