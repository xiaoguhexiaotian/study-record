<template>
  <div class="data">
    级联：
    <el-cascader
      :options="options"
      :props="{
        multiple: true,
        checkStrictly: true,
      }"
      :clearable="false"
      :show-all-levels="false"
    >
      <template slot-scope="{ node, data }">
        <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
          <span>{{ data.label }}</span>
          <span v-if="!node.isLeaf">({{ data.children.length }})</span>
        </el-tooltip>
      </template>
    </el-cascader>
    下拉：
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <!-- <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top"> -->
        <div>{{ item.label }}</div>
        <!-- </el-tooltip> -->
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { AGGTYPE, testArray, AggOptions } from "@/components/cascader/constant";
import {
  getKeyByWindowParam,
  getPointWindowParamList,
  handlePointWindowParam,
} from "@/components/cascader/utils";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class HomeView extends Vue {
  options: any = [];

  cities: { label: string; value: AGGTYPE; disabled: boolean }[] = [];
  aggTypeList = Object.values(AGGTYPE).slice(11, 13);
  value = "";

  created() {
    // this.handleInit();
    this.handleAggOptions();
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

  handleAggOptions() {
    this.cities = AggOptions.map(i => {
      const current = this.aggTypeList.find(aggType => aggType == i.value) as any;
      if ([AGGTYPE.DSUM, AGGTYPE.ACC, AGGTYPE.DIF].includes(current)) {
        return { ...i, disabled: false, isExtra: false };
      }
      if (current) {
        return { ...i, disabled: false };
      }
      return i;
    })
      .sort((a, b) => {
        if (a.disabled && !b.disabled) {
          return 1;
        } else if (!a.disabled && b.disabled) {
          return -1;
        } else {
          return 0;
        }
      })
      .filter(i => !i.isExtra);
    console.log(this.aggTypeList, this.cities);
  }
}
</script>
