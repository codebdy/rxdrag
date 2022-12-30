import React, { forwardRef } from 'react';
import { Button, List } from 'antd';
import "./style.less"

const data = [
  {
    title: '新建订单',
    description: "提交人：张三，提交时间：2022-4-5 8:20",
  },
  {
    title: '申请开发火星',
    description: "提交人：张三，提交时间：2022-4-5 8:20",
  },
  {
    title: '申请给沙特付货款',
    description: "提交人：张三，提交时间：2022-4-5 8:20",
  },
  {
    title: '客户Jack跟进',
    description: "提交人：张三，提交时间：2022-4-5 8:20",
  },
];

export const Jobs: React.FC = forwardRef<HTMLDivElement>((props, ref) => (
  <List
    {...props}
    className='rx-jobs-list'
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        actions={[<Button type='primary' size='small'>审批</Button>]}
      >
        <List.Item.Meta
          title={<a href="https://ant.design">{item.title}</a>}
          description={item.description}
        />
      </List.Item>
    )}
  />
));

