# 易盾验证码 - react demo

> 详细文档请点击：https://support.dun.163.com/documents/15588062143475712?docId=294963751458885632

## 说明

本项目是主流框架 react 的验证码调用示例，采用 `create-react-app` 生成的本地项目，并引入了 `arco-design@2.x`，这也是目前市面上比较主流的项目生成方式了，当然，验证码的使用和你采用什么方式来生成 react 项目没有关系。 

本地查看此示例需要以下四个步骤：

### 1. captchaId 申请

首先你需要向我们的技术支持申请一个可用的 `captchaId`，就是一个简单的字符串，然后填入 `src/App.tsx` 的这个地方：
```js
initNECaptchaWithFallback({
  captchaId: '这里填入你申请到的 captchaId',
})
```

### 2. 安装依赖

> 本 demo node 版本要求 14.x 以上，可在控制台 `node -v` 查看版本

控制台执行以下命令：

```
npm install
```

### 3. 启动服务

控制台执行以下命令：

```
npm run start
```

浏览器打开 `http://localhost:3000/` 即可看到演示页面。

### 4. 弹起验证码

输入完账号和密码之后（随便输），点击**登录**按钮即可弹起验证码，赶快体验下吧~

## 注意点

###  ts 报错 `Cannot find name 'initNECaptchaWithFallback'.ts(2304)`

如果在你的项目中你使用了和本 demo 类似的使用 `initNECaptchaWithFallback` 方式，可能会给你抛出一个错误 `Cannot find name 'initNECaptchaWithFallback`，因为我们是在 html 中引入的 js 脚本，并没有直接引入 `initNECaptchaWithFallback`，且验证码目前没有 ts 类型支持，所以此变量是未定义的，所以我们需要在全局自定义一个 ts 类型，本项目中可在 `types.d.ts` 查看：

```ts
declare function initNECaptchaWithFallback(param1: any, param2: any, param3: any): any
```

### 生产环境 `yidun-captcha.js` 请求不到

因为此 demo 是本地服务直接引用 `public` 目录下的 `yidun-captcha.js`，在你打生产环境的包时，需要将该静态 js 文件复制到与 `index.html` 同一目录，webpack 有相关插件支持，或者你也可以将该文件放到你们的静态资源服务器，通过地址引入。

## 更多

我们验证码本身支持更多使用姿势，包括非常灵活的 UI 自定义，详情可以向技术支持咨询噢~ 