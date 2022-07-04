import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Form, Input, Button } from '@arco-design/web-react'

const FormItem = Form.Item;

function App() {
  const [form] = Form.useForm();
  const [captchaIns, setCaptchaIns] = useState<any>(null)
  const account = useRef<string>()
  const password = useRef<string>()

  const handleLoginClick = useCallback(async () => {
    const values = (await form.validate()) || {}
    account.current = values.account
    password.current = values.password
    if (account.current && password.current) {
      captchaIns && captchaIns.verify()
    }
  }, [captchaIns, form])

  const ajax2Server = useCallback((validate: string) => {
    if (validate) {
      document.querySelector('#show-info')!.innerHTML = `
      已成功拿到参数：<br/>
      {<br/>
        account: ${account.current},<br/>
        password: ${password.current},<br/>
        validate: ${validate}<br/>
      }<br/>
      可以向后端发起请求了<br/>`
    }
  }, [account, password])

  const initNECaptcha = useCallback(() => {
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
      onVerify: function (err: any, data: any) {
        if (err) return // 当验证失败时，内部会自动refresh方法，无需手动再调用一次
        
        // 若成功拿到 validate，可向后端发送请求
        ajax2Server(data.validate)
      }
    }, function onload(instance: any) {
      setCaptchaIns(instance)
    }, function onerror(err: any) {
      console.warn(err)
    })
  }, [ajax2Server])

  useEffect(() => {
    initNECaptcha()
  }, [initNECaptcha])

  return (
    <div className='App'>
      <div id="captcha"></div>
      <div className='login-form'>
        <h3>易盾验证码 - react demo</h3>
        <Form className='form' form={form} labelAlign='left'>
          <FormItem label='账号' field='account' rules={[{ required: true, message: '请输入账号' }]}>
            <Input placeholder='请输入账号' />
          </FormItem>
          <FormItem label='密码' field='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder='请输入密码' />
          </FormItem>
          <FormItem wrapperCol={{ offset: 5 }}>
            <Button type='primary' onClick={handleLoginClick}>
              登录
            </Button>
          </FormItem>
        </Form>
        <div id="show-info"></div>
      </div>
    </div>
  );
}

export default App;
