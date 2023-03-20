import React, { forwardRef, memo } from 'react';
import { Avatar, List } from 'antd';
import "./style.less"

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export const News: React.FC = memo(forwardRef<HTMLDivElement>((props: any, ref) => {
  return (<List
    {...props}
    className='rx-news'
    style={{ marginLeft: -16, marginTop: -16 }}
    dataSource={data}
    renderItem={(item:any) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar />}
          title={<a href="https://ant.design">{item?.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />)
}));
