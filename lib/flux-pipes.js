var pipe = require(__dirname+'/pipe.js');
var common = require(__dirname+'/functions.js');

var namedActions = {
    'CTX:ToConsole': {
        fn: function(ctx, cbs){
            var val = ctx;
            if(this.cfg && this.cfg.source){
                val = ctx.getObjectValueByString(ctx, this.cfg.source);
            }
            console.log(val);
            if(cbs && cbs.success){
                cbs.success(ctx);
            }
        }
    }
};

var namedPipes = {};

pipe.prototype.namedActions = namedActions;
pipe.prototype.namedPipes = namedPipes;

var flux_pipes = module.exports = {
    pipe: pipe,
    actions: {
        get: function(name, cbs){
            if(!name){
                return namedActions;
            }else{
                return namedActions[name];
            }
        },
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
        },
        pipes: {
            filterTo: require(__dirname+'/actions/pipes/filter.js'),
            getPipeList: require(__dirname+'/actions/pipes/getPipeList.js'),
            publishTo: require(__dirname+'/actions/pipes/publishTo.js')
        },
        attributes: {
            arrays:{
                appendTo: require(__dirname+'/actions/attributes/arrays/appendTo.js'),
                copyIndexTo: require(__dirname+'/actions/attributes/arrays/copyIndexTo.js')
            },
            numbers:{
                increment: require(__dirname+'/actions/attributes/numbers/increment'),
                decrement: require(__dirname+'/actions/attributes/numbers/decrement')
            },
            objects:{
                keysToArray: require(__dirname+'/actions/attributes/objects/keysToArray.js')
            },
            strings:{
                appendTo: require(__dirname+'/actions/attributes/strings/appendTo.js'),
                asStringTo: require(__dirname+'/actions/attributes/strings/as_string_to.js'),
                subStringTo: require(__dirname+'/actions/attributes/strings/substr_to.js'),
                SplitTo: require(__dirname+'/actions/attributes/strings/SplitTo.js')
            },
            copyTo: require(__dirname+'/actions/attributes/copy_to.js'),
            remove: require(__dirname+'/actions/attributes/remove.js'),
            set: require(__dirname+'/actions/attributes/set.js'),
            setUUID: require(__dirname+'/actions/attributes/setUUID.js')
        },
        packages: {
            createNew: require(__dirname+'/actions/packages/CreateNew.js')
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
            if(!ctx){
                ctx = {};
            }
            if(namedPipes[name]){
                ctx.getObjectValueByString = common.getObjectValueByString;
                ctx.setObjectValueByString = common.setObjectValueByString;

                ctx._pipes = this;
                ctx._fp = flux_pipes;
                namedPipes[name].publish(ctx, cbs);
            }else{
                if(cbs && cbs.error){
                    cbs.error(new Error("Named Pipe not Found: "+name));
                }
            }
        },
        get: function(name){
            if(!name){
                return namedPipes;
            }else{
                return namedPipes[name];
            }
        }
    },
    init: function(){
        this.actions.register('FluxPipes:Packages:CreateNew', this.actions.packages.CreateNew);
        
        this.actions.register('FluxPipes:Pipes:FilterTo', this.actions.pipes.filterTo);
        this.actions.register('FluxPipes:Pipes:GetPipeList', this.actions.pipes.getPipeList);
        this.actions.register('FluxPipes:Pipes:PublishTo', this.actions.pipes.publishTo);
        
        this.actions.register('FluxPipes:Attributes:copyTo', this.actions.attributes.copyTo);
        this.actions.register('FluxPipes:Attributes:remove', this.actions.attributes.remove);
        this.actions.register('FluxPipes:Attributes:setUUID', this.actions.attributes.setUUID);
        this.actions.register('FluxPipes:Attributes:Set', this.actions.attributes.set);

        this.actions.register('FluxPipes:Attributes:Arrays:AppendTo', this.actions.attributes.arrays.appendTo);
        this.actions.register('FluxPipes:Attributes:Arrays:CopyIndexTo', this.actions.attributes.arrays.copyIndexTo);

        this.actions.register('FluxPipes:Attributes:Numbers:Increment', this.actions.attributes.numbers.increment);
        this.actions.register('FluxPipes:Attributes:Numbers:Decrement', this.actions.attributes.numbers.decrement);

        this.actions.register('FluxPipes:Attributes:Objects:KeysToArray', this.actions.attributes.objects.keysToArray);

        this.actions.register('FluxPipes:Attributes:Strings:AppendTo', this.actions.attributes.strings.appendTo);
        this.actions.register('FluxPipes:Attributes:Strings:AsStringTo', this.actions.attributes.strings.asStringTo);
        this.actions.register('FluxPipes:Attributes:Strings:SubStringTo', this.actions.attributes.strings.subStringTo);
        this.actions.register('FluxPipes:Attributes:Strings:SplitTo', this.actions.attributes.strings.SplitTo);
    },
    util: common
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getValueByString(obj, attrName){

}

function setValueByString(obj, attrName, value){

}
