import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Tooltip } from '@arco-design/web-react'

const FormItem = Form.Item;

function Popup() {
  const [form] = Form.useForm();
  const captchaIns = useRef<any>(null)
  const [captchaLoaded, setCaptchaLoaded] = useState<boolean>(false)
  const [validate, setValidate] = useState<string>('')
  const account = useRef<string>()
  const password = useRef<string>()

  // 向服务端发送表单数据验证
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

  // 点击登录
  const handleLoginClick = useCallback(async () => {
    const values = (await form.validate()) || {}
    account.current = values.account
    password.current = values.password

    if (validate) {
      ajax2Server(validate)
    } else {
      captchaIns.current && captchaIns.current.verify()
    }
  }, [ajax2Server, form, validate])

  // 初始化验证码
  const initNECaptcha = useCallback(() => {
    initNECaptchaWithFallback({
      captchaId: '这里填入你申请到的 captchaId',
      width: '300px',
      mode: 'popup',
      apiVersion: 2,
      errorFallbackCount: 1, // 验证码服务宕机最多尝试次数，默认是 3 次
      popupStyles: {
        position: 'absolute',
        top: '20%'
      },
      onVerify: function (err: any, data: { validate: string, isFallback: boolean }) {
        if (err) return // 当验证失败时，内部会自动 refresh 方法，无需手动再调用一次

        setValidate(data.validate)

        // 如果走到降级，需要将验证码标记处于降级状态
        if (data.isFallback) {
          setCaptchaLoaded(true)
          return
        }
        ajax2Server(data.validate)
      }
    }, function onload(instance: any) {
      captchaIns.current = instance
      setCaptchaLoaded(true)
    }, function onerror(err: any) {
      console.log('[error]', err.code, err.message)
    })
  }, [ajax2Server])

  useEffect(() => {
    initNECaptcha()
  }, [initNECaptcha])

  return (
    <div className='popup'>
      <Form className='form' form={form} labelAlign='left'>
        <FormItem label='账号' field='account' rules={[{ required: true, message: '请输入账号' }]}>
          <Input placeholder='请输入账号' />
        </FormItem>
        <FormItem label='密码' field='password' rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder='请输入密码' />
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          {
            !captchaLoaded ? (
              <Tooltip mini content='当前网络不通畅，请稍等'>
                <Button type='primary' disabled loading>登录</Button>
              </Tooltip>
            ) : (
              <Button type='primary' onClick={handleLoginClick}>登录</Button>
            )
          }
        </FormItem>
      </Form>
      <div id="show-info"></div>
    </div>
  );
}

export default Popup;
