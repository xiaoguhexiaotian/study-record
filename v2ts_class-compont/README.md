# v2ts_class-compont

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm run serve
```

### Compiles and minifies for production

```
pnpm run build
```

### Lints and fixes files

```
pnpm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 用于学习 vue-class-component 和 vue-property-decorator

vue-property-decorator 实质上是 vue-class-component 的超集

1. 语法上的不同，更接近 class 的写法
2. 更好的支持 ts 语法
3. 本质上与 vue2 没有太大区别，在运行时都是会构建为 vue2 代码



### 自定义编辑框思路

1. 由于要禁止用户输入非数字和英文逗号以外的文本,所以需要在input事件中对每次输入的值进行正则替换，然后更新dom，但是input事件的event事件对象是contenteditable元素，如果更新了contenteditable元素的dom，就会影响换行操作。所以需要在input的事件的时候去拿到用户当前光标所在的子节点，去更新这个子节点的dom，这样就不会影响换行操作了。
2. 思路2：直接全部插入到 contenteditable节点中，通过<br>来实现换行，替换的时候不变规则，每次重新替换时，更新innerHTML为innerText
