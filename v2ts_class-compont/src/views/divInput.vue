<template>
  <div class="container">
    <div id="input" contenteditable @input="input"></div>
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
  absentIds: number[] | string[] = [];
  repeatIds: number[] | string[] = [];
  existIds: number[] | string[] = [];

  cursorPosition: any = null; // 当前光标位置
  saveCursorPosition() {
    const editor = document.getElementById("input");
    const selection = window.getSelection()!;
    if (selection.rangeCount > 0) {
      this.cursorPosition = selection.getRangeAt(0);
      console.log(this.cursorPosition);
    }
  }
  restoreCursorPosition() {
    const editor = document.getElementById("input")!;
    const selection = window.getSelection()!;
    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
      selection.addRange(this.cursorPosition);
      editor.focus();
    }
  }

  getCurrentSelectionDom() {
    const selection = window.getSelection()!;
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const currentNode: any = range.startContainer;
      currentNode.parentElement.classList = [];
      currentNode.parentElement.color = "";
    }
  }
  input(event: any) {
    console.dir(event);
    this.saveCursorPosition();
    event.target.innerText = this.handleInput(event.target.innerText);
    // this.pointIds = event.target.innerText;
    // this.getCurrentSelectionDom();
    this.$nextTick(() => {
      this.restoreCursorPosition();
    });
  }
  handleInput(value: string) {
    return value.replace(/[^0-9,\n]/g, "");
  }
  testAxios(ids: any[]) {
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
        ].filter((i: any) => ids.findIndex((k: any) => i.id == k) !== -1);
        resolve(list);
      }, 1000);
    });
  }

  async handleAdd() {
    const tempIds = this.pointIds
      .split(/\n|,/)
      .map(i => Number(i.replace(/\s/g, "")))
      .filter(i => i && !isNaN(i));
    const tempAllIds = this.pointIds.split(/\n|,/).map(i => i.replace(/\s/g, ""));
    try {
      const res: any = await this.testAxios(tempIds);
      this.absentIds = tempAllIds.filter(item => !res.some((obj: any) => obj.id == item));
      this.repeatIds = tempAllIds.filter((item: any, index) => tempAllIds.indexOf(item) != index);
      this.existIds = res.map((i: any) => i.id);
      this.handlePromptColor();
      console.log(
        "repeatIds====>",
        this.repeatIds,
        "absentIds====>",
        this.absentIds,
        "this.existIds====>",
        this.existIds
      );
    } catch (error) {
      console.log(error);
    }
  }
  handlePromptColor() {
    const dom: any = document.querySelector("#input");
    const fisrtDom = dom.childNodes[0];
    if (fisrtDom.nodeName === "#text") {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = fisrtDom.textContent;
      dom.removeChild(fisrtDom);
      dom.insertBefore(newDiv, dom.firstChild);
    }
    const nodeChildren = dom.children || [];
    for (let i = 0; i < nodeChildren.length; i++) {
      const currentNode = nodeChildren[i];
      const currenetNodeData = currentNode.innerText.split(",");
      let tempInnerHtml = "";
      for (let k = 0; k < currenetNodeData.length; k++) {
        const nodeText = currenetNodeData[k];
        if (this.repeatIds.findIndex(i => i == nodeText) !== -1) {
          tempInnerHtml += `<span class="warning">${nodeText}</span>`;
        } else if (this.absentIds.findIndex(i => i == nodeText) !== -1) {
          tempInnerHtml += `<span class="error">${nodeText}</span>`;
        } else if (this.existIds.findIndex(i => i == nodeText) !== -1) {
          tempInnerHtml += `<span>${nodeText}</span>`;
        }
        if (k < currenetNodeData.length - 1) {
          tempInnerHtml += ",";
        }
      }
      currentNode.innerHTML = tempInnerHtml;
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
