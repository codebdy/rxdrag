import React, { forwardRef, memo } from 'react';
import { List, Typography } from 'antd';

const data = [
  {
    type: "升级",
    title: "Apper 2.0正式发布",
    date: "刚刚",
  },
  {
    type: "部署",
    title: "云服务器版发布",
    date: "1天前"
  },
  {
    type: "通告",
    title: "国庆放假50天",
    date: "1周前"
  },
];

export const Notices: React.FC = memo(forwardRef<HTMLDivElement>((props: any, ref) => {

  return (<List
    {...props}
    style={{ marginLeft: -24, marginTop: -16 }}
    dataSource={data}
    renderItem={(item: any) => (
      <List.Item >
        <div><Typography.Text code>{item.type}</Typography.Text> {item.title}</div>
        <Typography.Text type="secondary">{item.date}</Typography.Text>
      </List.Item>
    )}
  />
  )
}));
