<template>
  <div id="app">
    123
  </div>
</template>

<script>
//import { reactive, ref } from "@vue/composition-api";
import { reactive, effect, computed, ref } from "./vue-next";
export default {
  name: 'App',
  mounted(){
    const state = reactive({
      name: "zhuyang",
      age: 27,
      goods: ["pc","iphone","shoes"],
      child: {
        name: "zhujiazhuang",
        age: 2,
        goods: ["pcx","iphonex","shoesx"],
      }
    });
    const num = ref(0);
    console.log("number:",num);
    // effect(()=>{
    //   console.log("----effect----:",state.age);
    // })
    // state.age = 30;
    // let c = computed(()=>{
    //   console.log("--------------computed-----------");
    //   return state.age + "岁";
    // });
    // let c = computed({
    //   get(){
    //     console.log("--------------computed get-----------");
    //     return state.age + "岁";
    //   },
    //   set(){
    //     console.log("--------------computed set-----------");
    //     state.age = state.age + 5;
    //   }
    // });
    // console.log(c.value);
    // state.age = 25;
    // console.log(c.value);
  }
}
</script>

<style>
</style>
