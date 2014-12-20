var pipe = require(__dirname+'/pipe.js');
var namedActions = {};
var namedPipes = {};

pipe.prototype.namedActions = namedActions;
pipe.prototype.namedPipes = namedPipes;

module.exports = {
    pipe: pipe,
    actions: {
        register: function(name, cfg, fn, cbs){
            if((typeof cfg=='function')){
                cbs = fn;
                fn = cfg;
                cfg = null;
            }

            namedActions[name] = {
                fn: fn,
                cfg: cfg || {}
            };

            if(cbs && cbs.success){
                cbs.success(fn);
            }
        }
    },
    pipes:{
        register: function(name, fn, cbs){
            namedPipes[name] = fn;
            if(cbs && cbs.success){
                cbs.success(fn);
            }
        },
        publish: function(name, ctx, cbs){

            if(namedPipes[name]){
                ctx._pipes = this;
                namedPipes[name].publish(ctx, cbs);
            }else{
                if(cbs && cbs.error){
                    cbs.error(new Exception("Named Pipe not Found"));
                }
            }
        }
    }
};


