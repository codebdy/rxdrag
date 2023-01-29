import { PlusOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback, useState } from "react"
import { IControllerMeta, IReactionMeta } from "runner/reaction/interfaces/metas";
import styled from "styled-components";
import { methodIcon } from "../../../../../../icons/reactions";
import { createUuid } from "../../utils";
import { EditableListItem } from "./EditableListItem";
import { NameDialog } from "./NameDialog";

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

export const Members = memo((
  props: {
    value?: IControllerMeta,
    selected?: string,
    onSelect?: (id: string) => void,
    onChange?: (value?: IControllerMeta) => void,
  }
) => {
  const { value, selected, onSelect, onChange } = props
  const [addReactionOpen, setAddReactionOpen] = useState(false)

  const t = useToolsTranslate()

  const handleEventClick = useCallback((id: string) => {
    if (id) {
      onSelect?.(id)
    }
  }, [onSelect])

  const handleAddReaction = useCallback(() => {
    setAddReactionOpen(true)
  }, [])

  const handleReactionCancel = useCallback(() => {
    setAddReactionOpen(false)
  }, [])

  const handleAddReactionOk = useCallback((name?: string) => {
    if (name) {
      const newReaction: IReactionMeta = {
        id: createUuid(),
        name: name,
        label: name,
      }

      onChange?.({ ...value, reactions: [...value?.reactions || [], newReaction] })
    }
    setAddReactionOpen(false)
  }, [onChange, value])

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
        <Button
          size="small"
          type="text"
          icon={<PlusOutlined />}
          onClick={handleAddReaction}
        ></Button>
      </Title>
      <List>
        {
          value?.reactions?.map((event) => {
            return (
              <EditableListItem key={event.id}>
                <ListItem
                  icon={methodIcon}
                  onClick={() => handleEventClick(event.id)}
                  type={selected === event.id ? "default" : "text"}
                >
                  {event.label || event.name}
                </ListItem>
              </EditableListItem>
            )
          })
        }
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
      <NameDialog
        title={'$addReaction'}
        open={addReactionOpen}
        onCancel={handleReactionCancel}
        onOk={handleAddReactionOk}
      />
    </>
  )
})