<template>
  <div class="data">
    <!-- <el-cascader :options="options">
      <template slot-scope="{ node, data }"></template>
    </el-cascader> -->
  </div>
</template>

<script lang="ts">
import { testArray } from "@/components/cascader/constant";
import { getPointWindowParamList, handlePointWindowParam } from "@/components/cascader/utils";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class HomeView extends Vue {
  options: any = [];
  handleInit() {
    this.handleOptions();
  }

  async handleOptions() {
    const res: any = await getPointWindowParamList("20017");

    const temp = res.map((item: any) => {
      const { timeWindowParam, aggregateTypeList } = item;
      return {
        windowParam: timeWindowParam,
        aggregateTypeList,
      };
    });

    const temp2 = handlePointWindowParam(temp);

    this.options.push(temp2);

    this.options.push(...testArray);

    this.options = this.options.filter((item: { windowParam: any }, index: any, self: any[]) => {
      return (
        index ===
        self.findIndex(
          otherItem => JSON.stringify(otherItem.windowParam) === JSON.stringify(item.windowParam)
        )
      );
    });

    console.log(res, this.options);
  }
}
</script>
