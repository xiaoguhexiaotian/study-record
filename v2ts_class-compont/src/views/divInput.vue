<template>
  <div class="container">
    <div id="input" contenteditable @input="input" @keyup.enter="handleEnter"></div>
    <div class="footer">
      <div class="msg">
        <span v-if="absentIds.length > 0" class="error">
          ID
          <span v-for="(i, index) in absentIds" :key="index">{{ `"${i}"` }}</span>
          未能找到，请检查修改或移除
        </span>
        <span v-if="repeatIds.length > 0" class="warning">
          ID
          <span v-for="(i, index) in repeatIds" :key="index">{{ `"${i}"` }}</span>
          重复，请删除后保留一个
        </span>
      </div>
      <div class="btn">
        <span>取消</span>
        <span @click="handleAdd">识别并添加</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DivInput extends Vue {
  pointIds = "";
  absentIds: number[] = [];
  repeatIds: number[] = [];
  input(event: any) {
    this.pointIds = event.target.innerText;
    console.dir(event.target.innerText);
  }
  testAxios() {
    return new Promise(resolve => {
      setTimeout(() => {
        const list = [
          {
            name: "张三",
            id: "123",
          },
          {
            name: "李四",
            id: "456",
          },
          {
            name: "王五",
            id: "789",
          },
        ];
        resolve(list);
      }, 1000);
    });
  }
  async handleAdd() {
    const tempIds = this.pointIds
      .split(/\n|,/)
      .map(i => Number(i.replace(/\s/g, "")))
      .filter(i => i && !isNaN(i));
    try {
      const res: any = await this.testAxios();
      this.absentIds = tempIds.filter(item => !res.some((obj: any) => obj.id == item));
      this.repeatIds = tempIds.filter((item, index) => tempIds.indexOf(item) != index);
      this.handlePromptColor();
      console.log("repeatIds====>", this.repeatIds, "absentIds====>", this.absentIds);
    } catch (error) {
      console.log(error);
    }
  }
  handlePromptColor() {
    const dom = document.querySelector("#input");
    const childNodes = dom?.children || [];
    for (let i = 0; i < childNodes.length; i++) {
      let node: any = childNodes[i];
      // 这里不能直接用innerHTML 多次替换后节点后会发生异变,所以每次替换必须用初始值
      let newInnerHtml = node!.innerText.replace(/\s/g, "");
      const tempAbsentIds = this.absentIds.slice().sort((a, b) => b - a);
      for (let i = 0; i < this.repeatIds.length; i++) {
        const nodeData = this.repeatIds[i];
        const regex = new RegExp(String(nodeData), "g");
        newInnerHtml = newInnerHtml.replace(regex, `<span class="warning">${nodeData}</span>`);
      }
      for (let i = 0; i < tempAbsentIds.length; i++) {
        const nodeData = tempAbsentIds[i];
        newInnerHtml = newInnerHtml.replace(
          String(nodeData),
          `<span class="error">${nodeData}</span>`
        );
      }
      node.innerHTML = newInnerHtml;
    }
  }
  init() {
    const dom: any = document.querySelector("#input");
    dom.focus();
    const newDiv = document.createElement("div");
    dom!.appendChild(newDiv);
  }
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.handleEnter(); // 为什么要在初始化的时候换一次行,因为contenteditable首行是会直接把文本插入在父级节点中 不是创建一个子节点 所以为了方便替换文本，统一成 子节点的形式
    });
  }
  handleEnter() {
    // contenteditable节点在换行的时候，默认生成的div盒子是会继承兄弟盒子的样式和class的，所以这里监听enter事件获取当前光标处，清掉当前光标节点的样式
    const selection: any = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const currentNode = range.commonAncestorContainer;
      currentNode.className = "";
    }
  }
}
</script>

<style lang="scss">
[contenteditable] {
  text-align: left;
  width: 400px;
  height: 600px;
  max-height: 600px;
  overflow-y: auto;
  outline: 1px solid red;
  margin: 20px auto 0;
  padding: 10px;
  &:focus {
    outline: 1px solid blue;
  }
}
#input {
  > :first-child {
    &:empty:before {
      content: "请在此处进行公式编辑";
      color: gray;
    }
  }
}
.footer {
  width: 420px;
  min-height: 80px;
  margin: 0 auto;
  border: 1px solid red;
  border-top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .msg {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .btn {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
      padding: 10px;
      margin-right: 5px;
      border: 1px solid red;
      cursor: pointer;
    }
  }
}
.error {
  color: red;
}
.warning {
  color: #d7ba7d;
}
#input {
  color: black;
}
</style>
