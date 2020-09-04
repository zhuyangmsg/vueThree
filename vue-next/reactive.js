import { isObjce ,hasOwn } from './utils.js';
import { track, trigger } from './effect';
function reactive(targetObj) {
    if (isObjce(targetObj)) {
        let reactiveTarget = effect(targetObj);
        return reactiveTarget;
    } else {
        return targetObj
    }
}
function effect(targetObj) {
    var obj = new Proxy(targetObj, {
        get: function (target, propKey, receiver) {
            console.log(`getting ${propKey}!`);
            let getValue = Reflect.get(target, propKey, receiver);
            track(target,"get",propKey);
            return isObjce(getValue)?reactive(getValue):getValue;
        },
        set: function (target, propKey, value, receiver) {
            let oldValue = target[propKey];
            let setValue = Reflect.set(target, propKey, value, receiver);
            if(!hasOwn(target,propKey)){
                console.log("更新添加");
                trigger(target,"add",propKey);
            }else if(oldValue!=value){
                console.log("更新修改");
                trigger(target,"set",propKey);
            }
            return setValue;
        }
    });
    return obj;
}
export default reactive;