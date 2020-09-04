import { isObjce } from './utils.js';
import reactive  from "./reactive.js";
function ref(value){
    let tranValue = isObjce(value)?reactive(value):value;
    return {
        _isRef:true,
        get value(){
            return tranValue;
        },
        set value(newValue){
            tranValue = newValue;
        }
    };
}
export default ref;