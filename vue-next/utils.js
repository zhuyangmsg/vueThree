let isObjce = targetObj => typeof(targetObj) == "object" && typeof(targetObj) != null;
let hasOwn = (target,key) =>  target.hasOwnProperty(key);
let isFun = getter => typeof(getter) == 'function';
export { isObjce, hasOwn, isFun };