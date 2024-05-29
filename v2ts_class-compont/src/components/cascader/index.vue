<template>
  <div class="window-param-select">
    <el-cascader
      v-model="value"
      :options="options"
      :props="{ multiple: true }"
      clearable
      :show-all-levels="false"
      popper-class="window-param-select-popper"
      @change="handleChange"
    >
      <template slot-scope="{ node, data }">
        <el-checkbox v-model="node.checked" v-if="node.level !== 1">
          <span class="node-name" @click="getCurrentNode(node)">{{ data.label }}</span>
        </el-checkbox>
        <span v-else class="node-name" @click="getCurrentNode(node)">{{ data.label }}</span>
      </template>
    </el-cascader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import {
  AGGTYPE,
  DEFALUT_WINDOWSPARAM,
  OmitValues,
  TumblingType,
  NaturalType,
  ReportType,
  windowsParamOptions,
} from "./constant";
@Component
export default class WindowParamSelect extends Vue {
  style = require("./index.module.scss");
  @Prop({ default: () => false }) readonly isSearch!: boolean; // 是否搜索
  @Prop({ default: ReportType.Daily }) readonly reportType!: ReportType; //报表类型
  @Prop({ default: null }) readonly windowParam?: any; // 时间窗
  @Prop({ default: AGGTYPE.CUR }) readonly aggregateType?: string; // 聚合方式

  value: any = [];
  options = windowsParamOptions;
  nodeWindowParam: any = "";
  omitValues = Object.values(OmitValues);
  tumblingType = Object.values(TumblingType);
  naturalType = Object.values(NaturalType);
  selectedPeriodData: { start: string; end: string; value: string }[] = [];
  created() {
    this.handleInit();
  }
  handleInit() {
    if (!this.isSearch) {
      this.nodeWindowParam = DEFALUT_WINDOWSPARAM[this.reportType];
    } else {
      this.nodeWindowParam = this.windowParam;
      if (!this.windowParam) {
        this.nodeWindowParam = DEFALUT_WINDOWSPARAM[this.reportType];
      }
    }
    for (const key in this.nodeWindowParam) {
      const obj = this.nodeWindowParam[key];
      console.log(obj);

      if (["Tumbling", "Natural"].includes(key)) {
        this.value = [obj.dimentsion];
      } else if (["Shift"].includes(key)) {
        this.value = ["Shift", obj.Shift];
      }
    }
    console.log(this.nodeWindowParam, this.value);
  }
  handleChange(valueList: any) {
    console.log(valueList);
  }
  getCurrentNode(node: any) {
    console.log(node, node.parent);
    let tempData: any[] = [];
    // 非多选
    if (!node.parent && !this.omitValues.includes(node.value)) {
      tempData = [node.value];
      this.value = tempData;
      this.handleRadioData();
    }
    // 多选
    if (node.parent) {
      const length = this.value.length;
      // 已有选项
      if (length > 0) {
        const firstValue = this.value[0];
        // 已选为单选
        if (typeof firstValue == "string") {
          tempData = [[node.parent.value, node.value]];
          // 当是时间段时需要额外保存一个起止时间
          if (node.parent.value === OmitValues.Period) {
            this.selectedPeriodData.push(node.data);
          }
        }
        // 已选为多选
        if (Array.isArray(firstValue)) {
          const multipleType = firstValue[0];
          // 选择的是同一父级下的
          if (multipleType == node.parent.value) {
            const selected = this.value.filter((arr: any) => arr.includes(node.value));
            // 未选的就删除
            if (selected.length === 0) {
              tempData = [...this.value, [node.parent.value, node.value]];
            } else {
              tempData = this.value.filter((arr: any) => !arr.includes(node.value));
              this.selectedPeriodData = this.selectedPeriodData.filter(
                item => item.value !== node.value
              );
            }
            // 当是时间段时需要额外保存一个起止时间
            if (node.parent.value === OmitValues.Period && selected.length === 0) {
              this.selectedPeriodData.push(node.data);
            }
          } else {
            tempData = [[node.parent.value, node.value]];
            if (node.parent.value === OmitValues.Period) {
              this.selectedPeriodData.push(node.data);
            } else {
              this.selectedPeriodData = [];
            }
          }
        }
      } else {
        tempData = [[node.parent.value, node.value]];
        if (node.parent.value === OmitValues.Period) {
          this.selectedPeriodData.push(node.data);
        }
      }
      this.value = tempData;
      this.handleMultipleData(node.parent.value);
    }
  }
  handleRadioData() {
    const type = this.value[0];
    if (this.tumblingType.includes(type)) {
      this.nodeWindowParam = {
        Tumbling: {
          dismension: type,
          unit: 1,
        },
      };
    } else {
      this.nodeWindowParam = {
        Natural: {
          dismension: type,
          unit: 1,
        },
      };
    }
    console.log(this.value, this.selectedPeriodData, "处理单选数据");
  }
  handleMultipleData(multipleType: any) {
    console.log(multipleType, this.value, this.selectedPeriodData, "处理多选数据");
    switch (multipleType) {
      case OmitValues.Shift:
      case OmitValues.Group:
        this.nodeWindowParam = this.value.map((arr: string[]) => ({ [multipleType]: arr[1] }));
        break;
      case OmitValues.Period:
        this.nodeWindowParam = this.selectedPeriodData.map(item => {
          return { start: item.start, end: item.end };
        });
        break;
      default:
        break;
    }
    console.log("处理结果", this.nodeWindowParam);
  }
}
</script>
<style lang="scss" scoped>
.window-param-select {
  // background-color: red;
  // :global {
  .el-cascader {
    width: 100px;
    height: 40px;
    .el-input .el-input__inner:focus,
    .el-cascader .el-input.is-focus .el-input__inner {
      height: 40px;
    }
    .el-cascader__tags {
      width: 80%;
      display: inline-flex;
      flex-wrap: nowrap;
      .el-tag {
        flex: 1;
        background: #fff;
        color: #222 !important;
        &:hover {
          background-color: #fff;
        }
        .el-tag__close {
          display: none;
        }
      }
    }
  }
  // }
}
</style>
