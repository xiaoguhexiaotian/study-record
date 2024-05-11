<template>
  <div class="home">
    father:
    <button @click="fatherBtn">父组件按钮</button>
    <button @click="fatherHandleEdit">从父组件修改list</button>
    <HelloWorld ref="HelloWorld" v-model="list" :propA="3" :propB="'hello'" :propC="true" @child-emit-one="testOne" @childEmitTwo="testTwo" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch, Ref } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {
  list = [{ name: "张三", id: 18 }];
  fatherValue = "父组件数据";
  provideValue = "provideValue";
  fatherBtn() {
    console.log(this.son);
  }
  // @Model区域
  fatherHandleEdit() {
    this.list = [{ name: "王五", id: 20 }];
  }
  // @Watch 区域
  @Watch("list", { immediate: true, deep: true })
  onListChange(newVal: string, oldVal: string) {
    console.log("watch====>", newVal, oldVal);
  }
  // @Emit 区域
  testOne(value: string) {
    console.log("父组件监听事件", value);
  }
  testTwo(value: string) {
    console.log("父组件监听事件", value);
  }
  // @Provide区域
  @Provide() topLevelList = this.list; // 默认用topLevelList作为子组件接收
  @Provide("topLevelValue") test = this.provideValue; // 指定topLevelValue为子组件接收的值
  @Provide() optional = "555555";
  // @Ref区域
  @Ref("HelloWorld") son!: HelloWorld; // 传值是ref定义的值，使用的值是后面的变量son 如果不传值，默认使用son作为ref传值
  // 生命周期区域
  beforeCreate() {
    console.log("父beforeCreate");
  }
  created() {
    console.log("父created");
  }
  beforeMount() {
    console.log("父beforeMount");
  }
  mounted() {
    console.log("父mounted");
  }
}
</script>
