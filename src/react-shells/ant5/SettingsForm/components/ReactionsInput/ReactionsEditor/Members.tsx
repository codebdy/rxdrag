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
  margin: 2px 0;
`
const methodIcon = <span role="img" className="anticon">
  <svg width='1em' height="1em" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12.42,5.29C11.32,5.19 10.35,6 10.25,7.11L10,10H12.82V12H9.82L9.38,17.07C9.18,19.27 7.24,20.9 5.04,20.7C3.79,20.59 2.66,19.9 2,18.83L3.5,17.33C3.83,18.38 4.96,18.97 6,18.63C6.78,18.39 7.33,17.7 7.4,16.89L7.82,12H4.82V10H8L8.27,6.93C8.46,4.73 10.39,3.1 12.6,3.28C13.86,3.39 15,4.09 15.66,5.17L14.16,6.67C13.91,5.9 13.23,5.36 12.42,5.29M22,13.65L20.59,12.24L17.76,15.07L14.93,12.24L13.5,13.65L16.35,16.5L13.5,19.31L14.93,20.72L17.76,17.89L20.59,20.72L22,19.31L19.17,16.5L22,13.65Z" />
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
      <List>
        <ListItem>
          变量 0
        </ListItem>
        <ListItem>
          变量 1
        </ListItem>
      </List>
    </>
  )
})