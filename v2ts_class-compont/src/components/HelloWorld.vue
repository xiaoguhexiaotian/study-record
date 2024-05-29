<template>
  <div class="hello">
    son:
    <input v-model="name" />
    {{ list }}
    <span>{{ count }}</span>
    <button @click="add">++</button>
    <button @click="minus">--</button>
    <button @click="handleEdit">子组件修改list</button>
    <button @click="childEmitOne">子组件触发emit</button>
    <button @click="childClick">子组件触发emit</button>
    <Grandson>
      <template #windowParam="{ windowParam }">
        <slot name="windowParam" :windowParam="windowParam"></slot>
      </template>
    </Grandson>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop, Emit } from "vue-property-decorator";
import Grandson from "@/components/comp.vue";
import { IList } from "../type/type";

@Component({
  components: {
    Grandson,
  },
})
export default class HelloWorld extends Vue {
  @Prop(Number) readonly propA: number | undefined;
  @Prop({ default: "default value" }) readonly propB!: string;
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined;

  @Model("change", { type: Array, default: [] }) list!: IList[] | [];

  // data区域
  firstName = "John";
  lastName = "Doe";
  count = 0;

  // computed区域
  get name() {
    return this.firstName + " " + this.lastName;
  }
  set name(value) {
    const splitted = value.split(" ");
    this.firstName = splitted[0];
    this.lastName = splitted[1] || "";
    console.log(this.firstName, this.lastName);
  }
  // method区域
  add() {
    this.count++;
  }

  minus() {
    console.log(this);
    this.count--;
  }
  handleEdit() {
    this.$emit("change", [{ name: "李四", id: 19 }]);
  }
  // @Emit区域
  @Emit() // 如果此处不设置别名字,则默认使用下面的函数命名,但是父级在监听是需要用横杠分割驼峰 @child-emit-one
  childEmitOne() {
    return `子组件触发emit,当前name为${this.name}`;
  }
  @Emit("childEmitTwo") private childEmitTwo(n: number) {
    // return n; // 如果不return 会默认用形参的值
  }
  childClick() {
    this.childEmitTwo(this.count);
  }
  // 生命周期区域
  beforeCreate() {
    console.log("子beforeCreate");
  }
  created() {
    console.log("子created");
  }
  beforeMount() {
    console.log("子beforeMount");
  }
  mounted() {
    console.log("子mounted");
  }
}
</script>

<style scoped lang="scss"></style>
