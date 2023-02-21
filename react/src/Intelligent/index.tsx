import React, { useState } from 'react';
import { Tabs } from '@arco-design/web-react';
import Popup from './Popup'
import Float from './Float'

const TabPane = Tabs.TabPane;

const tabs = [{
  title: '弹出式',
  key: 'popup',
},{
  title: '触发式',
  key: 'float',
}];

function Conventional() {
  const [activeTab, setActiveTab] = useState<string>('popup');

  return (
    <div className='intelligent'>
      <Tabs
        type='card-gutter'
        activeTab={activeTab}
        onChange={setActiveTab}
      >
        {tabs.map((x, i) => (
          <TabPane destroyOnHide key={x.key} title={x.title} style={{ padding: '25px' }}>
            { x.key === 'popup' ? <Popup /> : <Float /> }
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Conventional;
