<template>
  <div class="about">
    <input v-model="goodsNmae" />
    <input v-model="goodsPrice" />
    <button @click="handleAddGoods">添加商品</button>
    <div class="goods" v-for="(item, index) in goodsList" :key="index">
      <span>商品名称：{{ item.name }}</span>
      <span>商品价格：{{ item.price }}</span>
      <span>折后价格：{{ item.getPriceWithTax(discount) }}</span>
    </div>
    <input v-model="discount" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Goods } from "@/utils/class";
interface IGoods {
  name: string;
  price: number;
}
@Component
export default class AboutView extends Vue {
  goodsNmae = "";
  goodsPrice = 0;
  goodsList: IGoods[] = [];
  discount = 1;

  handleAddGoods() {
    const goods = new Goods(this.goodsNmae, this.goodsPrice);
    this.goodsList.push(goods);
    console.log(this.goodsList);
  }
  handleDiscount(price: number, rate: number) {
    return price * rate;
  }
}
</script>

<style lang="sass" scoped>
.goods
  border: 1px solid #000
  padding: 10px
  margin: 10px
  span
    padding-right: 20px
</style>

