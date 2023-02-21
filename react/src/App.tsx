import React, { useState } from 'react';
import './style.css';
import { Radio } from '@arco-design/web-react';
import Conventional from './Conventional';
import Intelligent from './Intelligent';

function App() {
  const [captchaType, setCaptchaType] = useState<'conventional' | 'intelligent'>('conventional');

  return (
    <div className='App'>
      <h3 className='app-title'>易盾验证码 - react 演示 demo</h3>
      <Radio.Group
        type='button'
        name='captchaType'
        value={captchaType}
        onChange={setCaptchaType}
        style={{ marginBottom: 20 }}
        options={[
          { label: '常规验证码', value: 'conventional' },
          { label: '智能无感知', value: 'intelligent' },
        ]}
      />
      <div className='captcha-wrapper'>
        { captchaType === 'conventional' ? (<Conventional />) : (<Intelligent />) }
      </div>
    </div>
  );
}

export default App;
