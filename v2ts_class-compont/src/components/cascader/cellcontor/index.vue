<template>
  <div class="cell-contor">
    <div v-if="[NaturalType.WEEK, NaturalType.MONTH].includes(currenType)" class="week-or-month">
      <div class="tip">起始循环时间</div>
      <div class="comp">
        <el-select v-model="model[selectField]" placeholder="请选择">
          <el-option
            v-for="item in selectOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-time-picker
          v-model="model[timeDateField]"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:59',
          }"
          :clearable="false"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
        />
      </div>
    </div>
    <div v-else-if="currenType === OmitValues.Shift" class="shift-comp">
      <el-select v-model="model.Shift" multiple collapse-tags placeholder="请选择">
        <el-option
          v-for="item in ShiftOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div v-else-if="currenType === OmitValues.Custom" class="custom">
      <el-input v-model="model.customNum" controls-position="right" @input="inputChange">
        <el-select v-model="model.customType" slot="append" placeholder="请选择">
          <el-option
            v-for="item in CustomOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-input>
      <el-time-picker
        is-range
        :value="['01:01:01', '02:02:02']"
        value-format="HH:mm:ss"
        format="HH:mm:ss"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      ></el-time-picker>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from "vue-property-decorator";
import { NaturalType, ReportType, OmitValues } from "../constant";
import { weekOption, ShiftOption, CustomOption } from "./constant";

@Component
export default class CellContor extends Vue {
  @Prop({ default: ReportType.Daily }) readonly reportType!: ReportType; //报表类型
  @Prop({ default: {} }) readonly windowParam: any;
  @Prop({ default: "" }) readonly currenType: any;

  model: any = {
    dayOfWeek: "1",
    hmsWeek: "00:00:00",
    dayOfMonth: "1",
    hmsMonth: "00:00:00",
    Shift: [],
    customNum: 1,
    customType: this.reportType === ReportType.Daily ? 2 : 3,
  };
  OmitValues = OmitValues;
  NaturalType = NaturalType;
  ShiftOption = ShiftOption;
  CustomOption = CustomOption;
  newWindowParam: any = {};
  get selectField() {
    return this.currenType === "WEEK" ? "dayOfWeek" : "dayOfMonth";
  }
  get timeDateField() {
    return this.currenType === "WEEK" ? "hmsWeek" : "hmsMonth";
  }
  get selectOption() {
    let monthOption = [];
    for (let i = 1; i <= 31; i++) {
      monthOption.push({ label: i + "日", value: String(i) });
    }
    return this.currenType === "WEEK" ? weekOption : monthOption;
  }
  @Watch("model", { deep: true })
  handleChange(newVal: any) {
    const { dayOfWeek, hmsWeek, dayOfMonth, hmsMonth, Shift } = newVal;
    if (this.currenType === "WEEK") {
      this.newWindowParam = {
        Natural: {
          dimension: "WEEK",
          offset: { hms: hmsWeek, offset: dayOfWeek },
          unit: 1,
        },
      };
    } else if (this.currenType === "MONTH") {
      this.newWindowParam = {
        Natural: {
          dimension: "MONTH",
          offset: { hms: hmsMonth, offset: dayOfMonth },
          unit: 1,
        },
      };
    } else if (this.currenType === "Shift") {
      this.newWindowParam = Shift.map((i: string) => {
        return { Shift: i };
      });
    }
    console.log(this.currenType, this.newWindowParam, newVal);
  }
  inputChange(value: any) {
    const rule = /[^0-9/]/g;
    this.model.customNum = value.replace(rule, "");
    if (this.model.customNum > 10000000) {
      this.model.customNum = 10000000;
    }
  }
}
</script>
<style lang="scss" scoped>
.cell-contor {
  position: relative;
  .custom {
    .el-select {
      width: 75px;
    }
    > .el-input {
      position: absolute;
      bottom: 40px;
      right: 0;
      width: 180px;
    }
    .el-date-editor--timerange {
      width: 300px;
    }
  }
}
</style>
