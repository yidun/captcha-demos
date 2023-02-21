import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Message, Tooltip } from '@arco-design/web-react'

const FormItem = Form.Item;

function Float() {
  const [form] = Form.useForm();
  const captchaIns = useRef<any>(null)
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(true)
  const [captchaLoaded, setCaptchaLoaded] = useState<boolean>(false)
  const [captchaFallback, setCaptchaFallback] = useState<boolean>(false)
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
      Message.warning('请先完成验证码验证')
    }
  }, [ajax2Server, form, validate])

  // 初始化验证码
  const initNECaptcha = useCallback(() => {
    initNECaptchaWithFallback({
      element: '#captcha',
      captchaId: '这里填入你申请到的 captchaId',
      width: '100%',
      apiVersion: 2,
      errorFallbackCount: 1, // 验证码服务宕机最多尝试次数，默认是 3 次
      onReady: function () {
        setCaptchaLoading(false)
      },
      onVerify: function (err: any, data: { validate: string, isFallback: boolean }) {
        if (err) return // 当验证失败时，内部会自动 refresh 方法，无需手动再调用一次

        setValidate(data.validate)

        // 如果走到降级，需要将验证码加载状态设为 false，并标记处于降级状态
        if (data.isFallback) {
          setCaptchaLoading(false)
          setCaptchaFallback(true)
        }
      }
    }, function onload(instance: any) {
      captchaIns.current = instance
      setCaptchaLoaded(true)
    }, function onerror(err: any) {
      console.log('[error]', err.code, err.message)
    })
  }, [])

  useEffect(() => {
    initNECaptcha()
  }, [initNECaptcha])

  return (
    <div className='float'>
      <Form className='form' form={form} labelAlign='left'>
        <FormItem label='账号' field='account' rules={[{ required: true, message: '请输入账号' }]}>
          <Input placeholder='请输入账号' />
        </FormItem>
        <FormItem label='密码' field='password' rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder='请输入密码' />
        </FormItem>
        <FormItem label='验证码'>
          <div id="captcha"></div>
          { !captchaLoaded && <div className='captcha-service_disabled'>{ !captchaFallback ? '验证码资源加载中...' : '验证码资源加载拥堵，已为你自动跳过验证' }</div> }
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          {
            captchaLoading ? (
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

export default Float;
