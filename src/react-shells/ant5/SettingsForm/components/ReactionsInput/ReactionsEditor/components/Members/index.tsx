import { PlusOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback, useState } from "react"
import { IControllerMeta, IReactionMeta, IVariableMeta } from "runner/reaction/interfaces/metas";
import styled from "styled-components";
import { methodIcon, variableIcon } from "../../../../../../icons/reactions";
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
  const [addVariableOpen, setAddVariableOpen] = useState(false)

  const t = useToolsTranslate()

  const handleMemberClick = useCallback((id: string) => {
    if (id) {
      onSelect?.(id)
    }
  }, [onSelect])

  const handleAddReaction = useCallback(() => {
    setAddReactionOpen(true)
  }, [])

  const handleAddVariable = useCallback(() => {
    setAddVariableOpen(true)
  }, [])

  const handleAddVariableCancel = useCallback(() => {
    setAddVariableOpen(false)
  }, [])

  const handleAddReactionOk = useCallback((name?: string) => {
    if (name) {
      const newReaction: IReactionMeta = {
        id: createUuid(),
        label: name,
      }

      onChange?.({ ...value, reactions: [...value?.reactions || [], newReaction] })
    }
    setAddReactionOpen(false)
  }, [onChange, value])


  const handleAddReactionCancel = useCallback(() => {
    setAddReactionOpen(false)
  }, [])

  const handleAddVariableOk = useCallback((name?: string) => {
    if (name) {
      const newVariable: IVariableMeta = {
        id: createUuid(),
        label: name,
      }

      onChange?.({ ...value, variables: [...value?.variables || [], newVariable] })
    }
    setAddVariableOpen(false)
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
                onClick={() => handleMemberClick(event.id)}
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
          value?.reactions?.map((reaction) => {
            return (
              <EditableListItem key={reaction.id}>
                <ListItem
                  icon={methodIcon}
                  onClick={() => handleMemberClick(reaction.id)}
                  type={selected === reaction.id ? "default" : "text"}
                >
                  {reaction.label || reaction.name}
                </ListItem>
              </EditableListItem>
            )
          })
        }
      </List>
      <Title>
        <Text type="secondary">{t("ReactionsInput.variables")}</Text>
        <Button size="small" type="text" icon={<PlusOutlined />} onClick={handleAddVariable}></Button>
      </Title>
      <List>
        {
          value?.variables?.map((variable) => {
            return (
              <EditableListItem key={variable.id}>
                <ListItem
                  icon={variableIcon}
                >
                  {variable.label}
                </ListItem>
              </EditableListItem>
            )
          })
        }
      </List>
      <NameDialog
        title={'$addReaction'}
        open={addReactionOpen}
        onCancel={handleAddReactionCancel}
        onOk={handleAddReactionOk}
      />
      <NameDialog
        title={'$addVariable'}
        open={addVariableOpen}
        onCancel={handleAddVariableCancel}
        onOk={handleAddVariableOk}
      />
    </>
  )
})