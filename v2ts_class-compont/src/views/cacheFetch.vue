<template>
  <div class="cache-fetch">
    <ChildComponent v-for="i in forCount" :key="i" />
    <button @click="forCountAdd">继续加载</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChildComponent from "@/components/fetch.vue";
@Component({
  components: {
    ChildComponent,
  },
})
export default class CacheFetch extends Vue {
  forCount = 2;

  forCountAdd() {
    this.forCount = this.forCount + 5;
  }
}
</script>
