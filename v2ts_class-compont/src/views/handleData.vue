<template>
  <div class="data">
    <!-- <el-cascader :options="options">
      <template slot-scope="{ node, data }"></template>
    </el-cascader> -->
  </div>
</template>

<script lang="ts">
import { testArray } from "@/components/cascader/constant";
import {
  getKeyByWindowParam,
  getPointWindowParamList,
  handlePointWindowParam,
} from "@/components/cascader/utils";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class HomeView extends Vue {
  options: any = [];

  created() {
    this.handleInit();
  }
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

    const temp2: any = handlePointWindowParam(temp);

    this.options.push(...temp2);

    this.options.push(...testArray);

    function removeDuplicateWindowParams(items: any) {
      const seenParams = new Map();

      // 使用filter遍历数组
      return items.filter((item: any) => {
        // 将windowParam转换为字符串，以便比较（因为直接比较对象会比较引用）
        const paramStr = getKeyByWindowParam(item.windowParam);

        // 如果这个字符串还没有出现过，就保留此元素，并记录下来
        if (!seenParams.has(paramStr)) {
          seenParams.set(paramStr, item);
          return true;
        }
        // 如果已经出现过，就过滤掉（不返回true）
        return false;
      });
    }

    // 应用函数到你的数据上
    const uniqueItems = removeDuplicateWindowParams(this.options);

    // 去重数据，同时鉴权
    // this.options = this.options.filter((item: any, index: any, self: any) => {
    //   return (
    //     index ===
    //     self.findIndex((otherItem: any) => {
    //       const defaultWindowParam = getKeyByWindowParam(otherItem.windowParam);
    //       const currentWindowParam = getKeyByWindowParam(item.windowParam);
    //       return defaultWindowParam === currentWindowParam;
    //     })
    //   );
    // });

    console.log(res, temp, temp2, this.options, uniqueItems);
  }
}
</script>
