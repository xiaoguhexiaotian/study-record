<template>
  <div class="home" @mousedown.stop>
    <!-- father:
    <button @click="fatherBtn">父组件按钮</button>
    <button @click="fatherHandleEdit">从父组件修改list</button> -->
    <!-- <HelloWorld
      ref="HelloWorld"
      v-model="list"
      :propA="3"
      :propB="'hello'"
      :propC="true"
      :nodeWindowParam="nodeWindowParam"
      @child-emit-one="testOne"
      @childEmitTwo="testTwo"
    >
      <template #windowParam="{ windowParam, nodeId }">
        <Cascader
          :windowParam="windowParam"
          :isSearch="true"
          @change="handleChange"
          :nodeId="nodeId"
          :sceneType="SceneType.Cell"
        />
      </template>
    </HelloWorld> -->
    <Cascader />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch, Ref } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import Cascader from "@/components/eventStop/cascader.vue";
import { SceneType, testArray, windowsParamOptions } from "@/components/cascader/constant";
import { PointWindowParam } from "@/components/cascader/constant";
import { getPointWindowParamList, handlePointWindowParam } from "@/components/cascader/utils";
@Component({
  components: {
    HelloWorld,
    Cascader,
  },
})
export default class HomeView extends Vue {
  SceneType = SceneType;
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
  // beforeCreate() {
  //   console.log("父beforeCreate");
  // }
  created() {
    // this.InitPointWindowParam();
  }
  // beforeMount() {
  //   console.log("父beforeMount");
  // }
  // mounted() {
  //   console.log("父mounted");
  // }
  nodeWindowParam: any = null;
  handleChange(val: any, nodeId: string) {
    this.nodeWindowParam = { windowParam: val, nodeId };
    // console.log("handleChange======>", this.nodeWindowParam);
  }
  async InitPointWindowParam() {
    // handlePointWindowParam(PointWindowParam);
    const res = await getPointWindowParamList("20017");

    // const temp = testArray.map((item:any))
    const uniqueData = testArray.filter((item, index, self) => {
      return (
        index ===
        self.findIndex(
          otherItem => JSON.stringify(otherItem.windowParam) === JSON.stringify(item.windowParam)
        )
      );
    });

    // const uniqueData = testArray.map(item => {
    //   // debugger;
    //   const isDuplicate = testArray.some(
    //     otherItem => JSON.stringify(otherItem.windowParam) === JSON.stringify(item.windowParam)
    //   );
    //   if (isDuplicate) {
    //     return { ...item, disabled: false };
    //   }
    //   return item;
    // });
    console.log(res, testArray, uniqueData);
  }
  options = windowsParamOptions;
  value: any = [];
  getCurrentNode(node: any) {
    if (node.data.disabled || node.children.length > 0) {
      return;
    }
    if (!node.parent && node.children.length === 0) {
      this.value = [node.value];
    }
    if (node.parent) {
      let tempData: any = [];
      const length = this.value.length;
      if (length > 0) {
        const firstValue = this.value[0];
        if (typeof firstValue == "string") {
          tempData = [[node.parent.value, node.value]];
        }
        if (Array.isArray(firstValue)) {
          const multipleType = firstValue[0];
          if (multipleType == node.parent.value) {
            const selected = this.value.filter((arr: string | any[]) => {
              arr.includes(node.value);
            });
            if (selected.length === 0) {
              tempData = [...this.value, [node.parent.value, node.value]];
            } else {
              tempData = this.value.filter((arr: string | any[]) => !arr.includes(node.value));
            }
          }
        } else {
          tempData = [[node.parent.vlaue, node.value]];
        }
      }
    }
    console.log(node, 111111111);
  }
}
</script>
<style lang="scss">
.home {
  height: 600px;
  background-color: red;
}
</style>
