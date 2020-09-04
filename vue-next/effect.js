function effect(fn,option={}){
    let effect = createEffect(fn,option);
    if(!option.lazy){
        effect();
    }
    return effect;
}
let storeEffect = [];
let uid = 0;
function createEffect(fn,option={}){
    let effect = function(){
        if (!storeEffect.includes(effect)) {
            try{
                storeEffect.push(effect);
                return fn();
            }finally{
                storeEffect.pop();
            }
        }
    };
    effect.scheduler = option.scheduler || null;
    effect.id = uid++;
    return effect;
}
/** 
 * WeakMap的key值可以是对象，更方便用户处理
 * tranck存储的格式： WeakMap { object : map { key : set [effect] } }
*/
let targetMap = new WeakMap();
function track(target,type,key){
    let effect = storeEffect[storeEffect.length-1];
    if(effect){
        let depsmap = targetMap.get(target);
        if(!depsmap){
            targetMap.set(target,depsmap = new Map());
        }
        let depset = depsmap.get(key);
        if(!depset){
            depsmap.set(key,depset = new Set());
        }
        if(!depset.has(effect)){
            depset.add(effect);
        }
    }
}
function trigger(target,type,key){
    console.log("targetMap:",targetMap);
    let depsmap = targetMap.get(target);
    if(!depsmap){
        return false;
    }
    let depset = depsmap.get(key);
    if(depset){
        depset.forEach(effect=>{
            if(effect.scheduler){
                effect.scheduler();
            }else{
                effect();
            };
        });
    }
}
export { effect, track, trigger };