import { PlusOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo } from "react"
import styled from "styled-components";

const { Text } = Typography;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  align-items: center;
`

const List = styled.div`
  display: flex;
  flex-flow: column;
  padding: 0 8px;
`

const ListItem = styled((props) => <Button type="text" {...props} />)`
  display: flex;
  align-items: center;
  margin: 4px 0;
`

const methodIcon = <span role="img" className="anticon"><svg width='1em' height="1em" viewBox="0 0 24 24">
   <path fill="currentColor" d="M12,7A5,5 0 0,1 17,12C17,14.42 15.28,16.44 13,16.9V21H11V16.9C8.72,16.44 7,14.42 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
</svg>
</span>
export const Members = memo(() => {
  const t = useToolsTranslate()
  return (
    <>
      <Title><Text type="secondary">{t("events")}</Text></Title>
      <List>
        <ListItem icon={<ThunderboltOutlined />}>
          初始化
        </ListItem>
        <ListItem icon={<ThunderboltOutlined />}>
          销毁
        </ListItem>
        <ListItem icon={<ThunderboltOutlined />}>
          点击
        </ListItem>
      </List>
      <Title>
        <Text type="secondary">{t("methods")}</Text>
        <Button size="small" type="text" icon={<PlusOutlined />}></Button>
      </Title>
      <List>
        <ListItem icon={methodIcon} type="default">
          打开
        </ListItem>
        <ListItem icon={methodIcon}>
          关闭
        </ListItem>
      </List>
      <Title>
        <Text type="secondary">{t("variables")}</Text>
        <Button size="small" type="text" icon={<PlusOutlined />}></Button>
      </Title>
    </>
  )
})