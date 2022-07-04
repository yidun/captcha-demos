# 易盾验证码 - vue2 demo

> 详细文档请点击：https://support.dun.163.com/documents/15588062143475712?docId=294963751458885632

## 说明

本项目是主流框架 vue2 的验证码调用示例，采用 `vue-cli@5.x` 生成的本地项目，并引入了 `ant-design-vue`，这也是目前市面上比较主流的项目生成方式了，当然，验证码的使用和你采用什么方式来生成 vue 项目没有关系。 

本地查看此示例需要以下三个步骤：

### 1. captchaId 申请

首先你需要向我们的技术支持申请一个可用的 `captchaId`，就是一个简单的字符串，然后填入 `src/App.vue` 的这个地方：
```js
initNECaptchaWithFallback({
  captchaId: '这里填入你申请到的 captchaId',
})
```

### 2. 安装依赖

> 本 demo node 版本要求 12.x 以上，可在控制台 `node -v` 查看版本

控制台执行以下命令：

```
npm install
```

### 3. 启动服务

控制台执行以下命令：

```
npm run serve
```

浏览器打开 `http://localhost:8082/` 即可看到演示页面。

### 4. 弹起验证码

输入完账号和密码之后（随便输），点击**登录**按钮即可弹起验证码，赶快体验下吧~

## 注意点

###  eslint 报错 `no-undef`

如果在你的项目中你使用了和本 demo 类似的使用 `initNECaptchaWithFallback` 方式，你的 eslint 可能会给你抛出一个错误 `no-undef`，因为我们是在 html 中引入的 js 脚本，并没有直接引入 `initNECaptchaWithFallback`，所以此变量是未定义的，所以必须针对此处禁用该规则。

## 更多

我们验证码本身支持更多使用姿势，包括非常灵活的 UI 自定义，详情可以向技术支持咨询噢~ 