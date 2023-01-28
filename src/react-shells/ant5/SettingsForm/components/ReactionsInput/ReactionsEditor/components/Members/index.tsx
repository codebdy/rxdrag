import { PlusOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback } from "react"
import { IControllerMeta } from "runner/reaction/interfaces/metas";
import styled from "styled-components";
import { methodIcon } from "../../../../../../icons/reactions";
import { EditableListItem } from "./EditableListItem";

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
  flex:1;
`

export enum MemberType {
  Event = "Event",
  Reaction = "Reaction",
  Variable = "Variable"
}

export const Members = memo((
  props: {
    value?: IControllerMeta,
    selected?: string,
    onSelect?: (id: string) => void,
  }
) => {
  const { value, selected, onSelect } = props
  const t = useToolsTranslate()

  const handleEventClick = useCallback((id: string) => {
    if (id) {
      onSelect?.(id)
    }
  }, [onSelect])

  return (
    <>
      <Title><Text type="secondary">{t("ReactionsInput.events")}</Text></Title>
      <List>
        {
          value?.events?.map((event) => {
            return (
              <ListItem
                key={event.name}
                icon={<ThunderboltOutlined />}
                onClick={() => handleEventClick(event.id)}
                type={selected === event.id ? "default" : "text"}
              >
                {event.label || event.name}
              </ListItem>
            )
          })
        }
      </List>
      <Title>
        <Text type="secondary">{t("ReactionsInput.reactions")}</Text>
        <Button size="small" type="text" icon={<PlusOutlined />}></Button>
      </Title>
      <List>
        <EditableListItem>
          <ListItem icon={methodIcon} type="default">
            打开
          </ListItem>
        </EditableListItem>
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