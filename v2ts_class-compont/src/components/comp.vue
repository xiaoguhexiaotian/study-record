<template>
  <div>
    grandson:
    <span>Inject:{{topLevelList}}</span>
    <span>Two:{{topLevelValue}}</span>
    <span>Three:{{test}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { IList } from "../type/type";
@Component
export default class Grandson extends Vue {
  @Inject() readonly topLevelList!: IList[];
  @Inject() topLevelValue!: string;
  @Inject({ from: "optional", default: "default" }) readonly test!: string; // from 表示是从哪里注入的，default表示没有注入的时候默认值，后面的test变量是使用的时候用的变量
}
</script>

<style>
</style>