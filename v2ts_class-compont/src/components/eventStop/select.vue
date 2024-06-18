<template>
  <div class="select-comp">
    <el-select
      ref="selectRef"
      v-model="value"
      clearable
      placeholder="请选择"
      noMatchVal="没匹配上时的值"
      @visible-change="selectVisible"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
@Component
export default class Select extends Vue {
  options = [
    {
      value: "选项1",
      label: "黄金糕",
    },
    {
      value: "选项2",
      label: "双皮奶",
    },
    {
      value: "选项3",
      label: "蚵仔煎",
    },
    {
      value: "选项4",
      label: "龙须面",
    },
    {
      value: "选项5",
      label: "北京烤鸭",
    },
  ];
  value = "选项6";

  @Ref("selectRef") readonly selectRef: any;
  selectVisible(visible: boolean) {
    console.log("select的visible被触发");
    if (visible) {
      setTimeout(() => {
        window.addEventListener("click", this.watchWindowClick);
      }, 300);
    } else {
      window.removeEventListener("click", this.watchWindowClick);
    }
  }
  watchWindowClick() {
    console.log("select监听到了需要关闭");
    this.closeDropDown();
  }
  closeDropDown() {
    this.$refs.selectRef.blur();
  }
}
</script>
<style lang="scss"></style>
