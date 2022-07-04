<template>
  <div id="captcha"></div>
  <div class="login-form">
    <h3>易盾验证码 - vue3 demo</h3>
    <a-form
      ref="formRef"
      name="login-form"
      :model="formState"
      class="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      labelAlign="left"
    >
      <a-form-item
        label="账号"
        name="account"
        :rules="[{ required: true, message: '请输入账号' }]"
      >
        <a-input v-model:value="formState.account" placeholder="请输入账号" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password v-model:value="formState.password"  placeholder="请输入密码" />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button type="primary" @click="submit">
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div id="show-info" ref="showInfoRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance } from 'ant-design-vue'

interface FormState {
  account: string,
  password: string,
}

const formState = reactive<FormState>({
  account: undefined,
  password: undefined
})
const showInfoRef = ref()
const captchaIns = ref()
const formRef = ref<FormInstance>();

const ajax2Server = (validate: string) => {
  if (validate) {
    showInfoRef.value.innerHTML = `
    已成功拿到参数：<br/>
    {<br/>
      account: ${formState.account},<br/>
      password: ${formState.password},<br/>
      validate: ${validate}<br/>
    }<br/>
    可以向后端发起请求了<br/>`
  }
}

const initNECaptcha = () => {
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
      ajax2Server(data.validate)
    }
  }, function onload(instance) {
    captchaIns.value = instance
  }, function onerror(err) {
    console.warn(err)
  })
}

const submit = async () => {
  const values = (await formRef.value!.validateFields() as FormState) || {}
  captchaIns.value && captchaIns.value.verify()
};

onMounted(() => {
  initNECaptcha()
})

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

