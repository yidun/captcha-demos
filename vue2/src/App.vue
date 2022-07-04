<template>
  <div id="app">
    <div id="captcha"></div>
    <div class="login-form">
      <h3>易盾验证码 - vue2 demo</h3>
      <a-form :form="form" class="form"  :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" labelAlign="left" @submit="handleSubmit">
        <a-form-item label="账号">
          <a-input
            v-decorator="[
              'account',
              { rules: [{ required: true, message: '请输入账号' }] },
            ]"
            placeholder="请输入账号"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码' }] },
            ]"
            type="password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <a-button type="primary" html-type="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
      <div id="show-info"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'login-form' }),
      captchaIns: null,
      formData: {
        account: undefined,
        password: undefined,
      }
    };
  },
  methods: {
    initNECaptcha() {
      const _this = this
      initNECaptchaWithFallback({
        element: '#captcha',
        captchaId: '这里填入你申请到的 captchaId',
        width: '320px',
        mode: 'popup',
        apiVersion: 2,
        popupStyles: {
          position: 'fixed',
          top: '20%'
        },
        onVerify: function (err, data) {
          if (err) return // 当验证失败时，内部会自动refresh方法，无需手动再调用一次
          
          // 若成功拿到 validate，可向后端发送请求
          _this.ajax2Server(data.validate)
        }
      }, function onload(instance) {
        _this.captchaIns = instance
      }, function onerror(err) {
        console.warn(err)
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.formData.account = values.account
          this.formData.password = values.password
          this.captchaIns && this.captchaIns.verify()
        }
      })
    },
    ajax2Server(validate) {
      if (validate) {
        document.querySelector('#show-info').innerHTML = `
        已成功拿到参数：<br/>
        {<br/>
          account: ${this.formData.account},<br/>
          password: ${this.formData.password},<br/>
          validate: ${validate}<br/>
        }<br/>
        可以向后端发起请求了<br/>`
      }
    }
  },
  mounted() {
    this.initNECaptcha()
  },
}
</script>

<style>
#app .login-form {
  width: 400px;
  margin: 20px auto;
}

#app .form {
  border: 1px solid #d9d9d9;
  padding: 15px;
}

#app #show-info {
  margin-top: 20px;
}
</style>
