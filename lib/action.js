module.exports = function(ctx, cbs){
    var err = false;
    // ...do something,
    // ctx.myObject = {hello: 'world'}; //future actions will be able to access "myObject"
    
    if(err){
        if(cbs && cbs.error){
            cbs.error(err);
        }
    }else{
        if(cbs && cbs.success){
            cbs.success(ctx);
        }
    }
};