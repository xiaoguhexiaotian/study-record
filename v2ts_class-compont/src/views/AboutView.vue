<template>
  <div class="about">
    <input v-model="goodsNmae" />
    <input v-model="goodsPrice" />
    <button @click="handleAddGoods">添加商品</button>
    <div class="goods" v-for="(item, index) in goodsList" :key="index">
      <span>商品名称：{{ item.name }}</span>
      <span>商品价格：{{ item.price }}</span>
      <!-- <span>折后价格：{{ item.getPriceWithTax(discount) }}</span> -->
    </div>
    <input v-model="discount" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Goods, GoodsType } from "@/utils/class";
import { IGoods } from "@/store/type";
import { SET_GOODS, AXIOX_HANDLE } from "@/store/constant";

@Component
export default class AboutView extends Vue {
  goodsNmae = "";
  goodsPrice = 0;
  goodsList: IGoods[] = [];
  discount = 1;
  public GoodsType = GoodsType;
  public store = this.$store;
  created() {
    this.store.commit(SET_GOODS, { name: "华为", price: 3000 });
    // this.goodsList = this.store.state.goodsList;
    this.store.dispatch(AXIOX_HANDLE);
    this.goodsList = this.store.getters.getGoodsList;
    // this.goodsList = this.store.getters.getGoodsInfo("苹果");
    console.log(this.store, 1111);
  }
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

