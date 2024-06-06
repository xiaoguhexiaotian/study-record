<template>
  <div class="fetch">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";
@Component
export default class Fetch extends Vue {
  items: any = [];
  async created() {
    try {
      const data = await this.$store.dispatch("fetchData");
      this.items = data;
      console.log(data, 111111111);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  vuexFn = mapMutations(["updateApiData"]);
}
</script>
