var fPipes = require(__dirname+'/lib/flux-pipes.js');
var attrCopyTo = require(__dirname+'/lib/actions/attributes/copy_to.js');
var attrRemove = require(__dirname+'/lib/actions/attributes/remove.js');
var pipePublishTo = require(__dirname+'/lib/actions/pipes/publishTo.js');

/*console.log(attrCopyTo);

function logger(ctx, cbs){
    console.log(ctx);
    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

function loggerFormatted(ctx, cbs){
    console.log('----------------------------');
    console.log(ctx);
    console.log('----------------------------');
    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}


var myPipe = new fPipes.pipe();
fPipes.actions.register('logger', {test: 'config'}, logger);
fPipes.actions.register('logger_formatted', {lang: 'en-au'}, loggerFormatted);
fPipes.actions.register('CopyIDToUserID', {source: 'id', target:'user_id'}, attrCopyTo);
fPipes.actions.register('RemoveID', {target:'id'}, attrRemove);
fPipes.actions.register('PublishToNextPipe', {target: 'nextPipe'}, pipePublishTo);

myPipe.use('CopyIDToUserID');
myPipe.use('logger');
myPipe.use('RemoveID');
myPipe.use('logger');
myPipe.use('PublishToNextPipe');
//myPipe.publish({hello: 'world'});

var nextPipe = new fPipes.pipe();
nextPipe.use('logger_formatted');

fPipes.pipes.register('nextPipe', nextPipe);
fPipes.pipes.register('mine', myPipe);
fPipes.pipes.publish('mine', {id:'marsattack'});
*/
module.exports = fPipes;