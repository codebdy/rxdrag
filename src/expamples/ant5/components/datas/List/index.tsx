import { forwardRef, memo } from "react"
import { Avatar, List as AntdList } from "antd"

export type ListProps = {

}

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
const href = "#"
export const List = memo(forwardRef<HTMLDivElement>((props: ListProps, ref) => {

  return (
    <AntdList
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <AntdList.Item>
          <AntdList.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<a href={href}>{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </AntdList.Item>
      )}
      {...props}
    />
  )
}))