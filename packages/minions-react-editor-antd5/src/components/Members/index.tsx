import React from "react";
import { PlusOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { memo, useCallback, useState } from "react"
import styled from "styled-components";
import { ListItemReaction } from "./ListItemReaction";
import { ListItemVariable } from "./ListItemVariable";
import { NameDialog } from "./NameDialog";
import { VariableDialog } from "./VariableDialog";
import { IControllerMeta, ILogicFlowDefinition, IVariableDefineMeta } from "@rxdrag/schema";
import { methodIcon, variableIcon } from "@rxdrag/react-shared"
import { createUuid } from "@rxdrag/shared"
import { useTranslate } from "@rxdrag/react-locales"

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListItem = styled((props: any) => <Button type="text" {...props} />)`
  display: flex;
  align-items: center;
  margin: 2px 0;
  flex:1;
`

export const Members = memo((
  props: {
    value: IControllerMeta,
    selected?: string,
    onSelect?: (id: string) => void,
    onChange?: (value?: IControllerMeta) => void,
  }
) => {
  const { value, selected, onSelect, onChange } = props
  const [addReactionOpen, setAddReactionOpen] = useState(false)
  const [addVariableOpen, setAddVariableOpen] = useState(false)

  const t = useTranslate()

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
      const newReaction: ILogicFlowDefinition = {
        id: createUuid(),
        label: name,
        nodes: [],
        lines: [],
      }

      onChange?.({ ...value, reactions: [...value?.reactions || [], newReaction] })
    }
    setAddReactionOpen(false)
  }, [onChange, value])


  const handleAddReactionCancel = useCallback(() => {
    setAddReactionOpen(false)
  }, [])

  const handleAddVariableOk = useCallback((meta?: IVariableDefineMeta) => {
    if (meta) {
      const newVariable: IVariableDefineMeta = {
        ...meta,
        id: createUuid(),
      }

      onChange?.({ ...value, variables: [...value?.variables || [], newVariable] })
    }
    setAddVariableOpen(false)
  }, [onChange, value])

  const handleRemoveReaction = useCallback((id: string) => {
    onChange?.({ ...value, reactions: value?.reactions?.filter(reaction => reaction.id !== id) })
  }, [onChange, value])

  const handleRemoveVariable = useCallback((id: string) => {
    onChange?.({ ...value, variables: value?.variables?.filter(va => va.id !== id) })
  }, [onChange, value])

  const handleChangeReaction = useCallback((id: string, label: string) => {
    onChange?.({ ...value, reactions: value?.reactions?.map(reaction => reaction.id !== id ? reaction : { ...reaction, label }) })
  }, [onChange, value])

  const handleChangeVariable = useCallback((meta: IVariableDefineMeta) => {
    onChange?.({ ...value, variables: value?.variables?.map(va => va.id !== meta.id ? va : { ...va, ...meta }) })
  }, [onChange, value])

  return (
    <>
      <Title><Text type="secondary">{t("events")}</Text></Title>
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
        <Text type="secondary">{t("reactions")}</Text>
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
              <ListItemReaction
                key={reaction.id}
                id={reaction.id}
                name={reaction.label || ""}
                editTitle={t("$editReaction")}
                onRemove={handleRemoveReaction}
                onChange={handleChangeReaction}
              >
                <ListItem
                  icon={methodIcon}
                  onClick={() => handleMemberClick(reaction.id)}
                  type={selected === reaction.id ? "default" : "text"}
                >
                  {reaction.label || reaction.name}
                </ListItem>
              </ListItemReaction>
            )
          })
        }
      </List>
      <Title>
        <Text type="secondary">{t("variables")}</Text>
        <Button size="small" type="text" icon={<PlusOutlined />} onClick={handleAddVariable}></Button>
      </Title>
      <List>
        {
          value?.variables?.map((variable) => {
            return (
              <ListItemVariable
                key={variable.id}
                value={variable}
                editTitle={t("$editVariable")}
                onRemove={handleRemoveVariable}
                onChange={handleChangeVariable}
              >
                <ListItem
                  icon={variableIcon}
                >
                  {variable.name}
                </ListItem>
              </ListItemVariable>
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
      <VariableDialog
        title={'$addVariable'}
        open={addVariableOpen}
        onCancel={handleAddVariableCancel}
        onOk={handleAddVariableOk}
      />
    </>
  )
})