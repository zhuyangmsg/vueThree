import { isObjce } from './utils.js';
import {effect} from './effect';
function computed(getter){
    let dirty = true;
    let getFun = () => {};
    let setFun =  () => {};
    let value = null;
    if(!isObjce(getter)){
        getFun = getter;
    }else{
        getFun = getter.get;
        setFun = getter.set;
    };
    let effectRun = effect(getFun,{
        lazy:true,
        scheduler:()=>{
            dirty = true;
        }
    })
    console.log("effectRun:",effectRun);
    return {
        get value(){
            if(dirty){
                value = effectRun();
                dirty = false;
            }
            return value;
        },
        set value(value){
            setter(value)
        }
    }
}
export default computed;