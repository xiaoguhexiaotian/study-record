<template>
  <div>
    <!-- grandson:
    <span>Inject:{{ topLevelList }}</span>
    <span>Two:{{ topLevelValue }}</span>
    <span>Three:{{ test }}</span> -->
    <div v-for="(i, index) in list" :key="index">
      <span>{{ i.windowParam }}</span>
      <div class="slot">
        <slot name="windowParam" :windowParam="i.windowParam" :nodeId="i.id"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import { IList } from "../type/type";
@Component
export default class Grandson extends Vue {
  @Inject() readonly topLevelList!: IList[];
  @Inject() topLevelValue!: string;
  @Inject({ from: "optional", default: "default" }) readonly test!: string; // from 表示是从哪里注入的，default表示没有注入的时候默认值，后面的test变量是使用的时候用的变量
  @Prop() readonly nodeWindowParam: any;

  @Watch("nodeWindowParam", { deep: true })
  handleChange(val: any) {
    this.list = this.list.map((i: any) => {
      if (i.id == val.nodeId) {
        return Object.assign(i, val);
      }
      return i;
    });
    console.log("listChange=====>", this.list);
  }
  list: any = [
    {
      windowParam: {
        Natural: { unit: 1, dimentsion: "MONTH", offset: { hms: "00:00:00", offset: 1 } },
      },
      id: 1,
    },
    {
      windowParam: {
        Tumbling: { unit: 1, dimentsion: "DAY", offset: "00:00:00" },
      },
      id: 2,
    },
    {
      windowParam: null,
      id: 3,
    },
  ];
}
</script>

<style></style>
