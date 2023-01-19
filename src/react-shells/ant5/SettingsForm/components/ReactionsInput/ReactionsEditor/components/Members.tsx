import { PlusOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo } from "react"
import styled from "styled-components";
import { methodIcon } from "../../../../../icons/reactions";

const { Text } = Typography;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  align-items: center;
  user-select: none;
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
export const Members = memo(() => {
  const t = useToolsTranslate()
  return (
    <>
      <Title><Text type="secondary">{t("ReactionsInput.events")}</Text></Title>
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
        <Text type="secondary">{t("ReactionsInput.reactions")}</Text>
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
        <Text type="secondary">{t("ReactionsInput.variables")}</Text>
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