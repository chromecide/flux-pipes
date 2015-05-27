var fPipes = require(__dirname+'/lib/flux-pipes.js');
fPipes.init();
var fs = require("fs");
var bDoREPL = false;

if(!module.parent){
    //defaults
    var cwd = process.cwd();
    var pipeCfg = false;
    if(fs.existsSync(cwd+"/fluxpipe.cfg")){
        pipeCfg = JSON.parse(fs.readFileSync(cwd+"/fluxpipe.cfg"));
        if(pipeCfg && pipeCfg.requires && pipeCfg.requires.length>0){
            for(var i=0;i<pipeCfg.requires.length;i++){
                var curModule = require(pipeCfg.requires[i]);
                curModule.init(fPipes);
            }
        }

        if(pipeCfg && pipeCfg.actions){
            for(var actionName in pipeCfg.actions){
                var fn;
                var itemCfg = null;
                if((typeof pipeCfg.actions[actionName])=="object"){
                    var actionCfg = pipeCfg.actions[actionName];
                    eval("fn = "+actionCfg.fn+";");
                    if(actionCfg.cfg){
                        itemCfg = actionCfg.cfg;
                    }
                }else{
                    eval("fn = "+pipeCfg.actions[actionName]+";");
                }
                fPipes.actions.register(actionName, fn, itemCfg);
            }
        }

        if(pipeCfg && pipeCfg.pipes){
            for(var pipeName in pipeCfg.pipes){
                var pipeActions = pipeCfg.pipes[pipeName].actions;
                var defCfg = pipeName.cfg||null;

                var tPipe = new fPipes.pipe();
                tPipe.import(pipeActions);
                fPipes.pipes.register(pipeName, tPipe, defCfg);
            }
        }
    }

    if(process.argv.length>2){
        //load the supplied config file
        for(var i=0;i<process.argv.length;i++){
            if(process.argv[i]=="--repl"){
                bDoREPL = true;
            }
        }
    }

    if(pipeCfg && !bDoREPL){
        runApp(pipeCfg);
    }else{
        runREPL(pipeCfg);
    }
}else{
    module.exports = fPipes;
}

function runApp(cfg){
    console.log("RUNNING PIPE: "+cfg.name);
    if(cfg.entry){
        fPipes.pipes.publish(cfg.entry.target, cfg.entry.ctx);
    }
}

function runREPL(cfg){
    console.log("RUNNING REPL");
    var repl = require("repl");

    var replServer = repl.start({
      prompt: "fp : ",
    });
    var replMode = "MAIN";

    var activePipe = null;
    replServer.context.pipes = fPipes.pipes;
    replServer.context.actions = fPipes.actions;

    replServer.context.newPackage = function(name, description, author){
        var path = process.cwd()+"/"+name;
        if(!fs.statSync(path).isDirectory()){
            fs.mkdirSync(path);
        }
    };

    replServer.context.registerAction = function(name, fn, defcfg){
        if(!cfg.actions){
            cfg.actions = {};
        }
        var fnCfg = {};
        if(defcfg){
            fnCfg.fn = fn.toString();
            fn.cfg = defcfg;
        }else{
            fnCfg = fn.toString();
        }

        cfg.actions[name] = fnCfg;
    };

    replServer.context.registerPipe = function(name, p, defCfg){
        if(!cfg.pipes){
            cfg.pipes = {};
        }

        var pCfg = p.export();
        var rCfg = {
            actions: pCfg,
            cfg: defCfg
        };
        cfg.pipes[name] = rCfg;
    };

    replServer.context.FluxPipes = {
        pipe: fPipes.pipe,
        pipeSearch: function(searchTerm){
            var pipeList = fPipes.pipes.get();
            var iCount=0;
            var i;
            var onlyItem;
            for(i in pipeList){
                
                if(i.indexOf(searchTerm)>-1){
                    iCount++;
                    onlyItem=i;
                    console.log(i);
                }
            }

            if(iCount==1){
                return onlyItem;
            }
        },
        actionSearch: function(searchTerm){
            var actionList = fPipes.actions.get();
            var iCount=0;
            var i;
            var onlyItem;
            for(i in actionList){
                
                if(i.indexOf(searchTerm)>-1){
                    iCount++;
                    onlyItem=i;
                    console.log(i);
                }
            }
            if(iCount==1){
                return onlyItem;
            }
        },
        info: function(){
            console.log(cfg);
        },
        setName: function(name){
            cfg.name = name;
        },
        setEntryPipe: function(pipeName, pipeCfg){
            cfg.entry = {
                target: pipeName
            };

            if(pipeCfg){
                cfg.entry.ctx = pipeCfg;
            }
        },
        save: function(){
            var path = process.cwd()+"/fluxpipe.cfg";

            fs.writeFileSync(path, JSON.stringify(cfg));
        },
        require: function(moduleName){
            var newModule = require(moduleName);
            if(newModule){
                if(!cfg.requires){
                    cfg.requires = [];
                }
                cfg.requires.push(moduleName);
                newModule.init(fPipes);
            }
        },
        publish: function(targetPipe, ctx, cbs){
            if(!targetPipe){
                if(cfg.entry){
                    targetPipe = cfg.entry.target;
                    if(cfg.entry.ctx){
                        ctx = cfg.entry.ctx;
                    }
                }
            }else{
                fPipes.pipes.publish(targetPipe, ctx, cbs);
            }
        }
    };
}