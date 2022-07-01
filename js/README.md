# 易盾验证码 - 原生 JS demo

> 详细文档请点击：https://support.dun.163.com/documents/15588062143475712?docId=294963751458885632

## 说明

本项目是原生 js 情况下的验证码调用示例，本地查看此示例需要以下三个步骤：

### 1. captchaId 申请

首先你需要向我们的技术支持申请一个可用的 `captchaId`，就是一个简单的字符串，然后填入 `index.html` 的这个地方：
```js
initNECaptchaWithFallback({
  captchaId: '这里填入你申请到的 captchaId',
})
```

### 2. 启动一个服务

假定你的 IDE 为 VSCode，你只需要将鼠标移至 `index.html` 文件处，鼠标右键单击，在选项中选择 `Open with Live Server` 即可开启一个本地服务，接着浏览器打开链接 `http://127.0.0.1:5500/js/index.html` 即可看到演示页面。

### 3. 弹起验证码

点击**登录**按钮即可弹起验证码，赶快体验下吧~

## 更多

我们验证码本身支持更多使用姿势，包括非常灵活的 UI 自定义，详情可以向技术支持咨询噢~ 