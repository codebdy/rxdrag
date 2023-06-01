import { PlusOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Typography } from "antd";
import { ReactNode, memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components";
import { ListItemReaction } from "./ListItemReaction";
import { ListItemVariable } from "./ListItemVariable";
import { NameDialog } from "./NameDialog";
import { VariableDialog } from "./VariableDialog";
import { createUuid } from "@rxdrag/shared"
import { useTranslate } from "@rxdrag/react-locales"
import { IControllerMeta, IVariableDefineMeta, Reaction, ReadVariable } from "@rxdrag/minions-runtime-react";
import { ActivityMaterialCategory, IActivityMaterial, ILogicFlowDefinition } from "@rxdrag/minions-schema";
import { IEventMeta } from "@rxdrag/minions-controller-editor";
import { ListItemEvent } from "./ListItemEvent";

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
    eventMetas?: IEventMeta[],
    materialCategories: ActivityMaterialCategory<ReactNode>[],
  }
) => {
  const { value, selected, onSelect, onChange, eventMetas, materialCategories } = props
  const [addReactionOpen, setAddReactionOpen] = useState(false)
  const [addVariableOpen, setAddVariableOpen] = useState(false)
  const getMaterial = useCallback((name?: string) => {
    let materials: IActivityMaterial<ReactNode>[] = []
    materials = materials.concat(...materialCategories.map(category => category.materials))
    return materials.find(material => material.activityName === name)
  }, [materialCategories])

  const handleAddEvent = useCallback((event: IEventMeta) => {
    const ev = {
      id: createUuid(),
      name: event.name,
      label: event.label,
      nodes: [],
      lines: [],
    }

    onChange?.({ ...value, events: [...value?.events || [], ev] })
  }, [onChange, value])

  const items: MenuProps['items'] = useMemo(() => {
    return eventMetas?.filter(event => !value.events?.find(ev => ev.name === event.name)).map(ev => {
      return {
        key: ev.name,
        icon: <ThunderboltOutlined />,
        label: ev.label,
        onClick: () => handleAddEvent(ev)
      }
    }) || []
  }, [eventMetas, handleAddEvent, value.events]);


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

  const handleRemoveEvent = useCallback((name: string) => {
    onChange?.({ ...value, events: value?.events?.filter(ev => ev.name !== name) })
  }, [onChange, value])

  return (
    <>
      <Title>
        <Text type="secondary">{t("events")}</Text>
        {
          items.length > 0 && <Dropdown
            menu={{ items }}
            trigger={['click']}
          >
            <Button
              size="small"
              type="text"
              icon={<PlusOutlined />}
            ></Button>
          </Dropdown>
        }
      </Title>
      <List>
        {
          eventMetas?.filter(ev => value?.events?.find(evt => ev.name === evt.name)).map(ev => value?.events?.find(evt => ev.name === evt.name)).map((event) => {
            if (!event) {
              console.warn(`Event not be displayed because it is not in event config`)
              return <></>
            }
            return (
              <ListItemEvent
                key={event.name}
                name={event.name || ""}
                onRemove={handleRemoveEvent}
              >
                <ListItem
                  icon={<ThunderboltOutlined />}
                  onClick={() => handleMemberClick(event.id)}
                  type={selected === event.id ? "default" : "text"}
                >
                  {event.label || event.name}
                </ListItem>
              </ListItemEvent>
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
                  icon={getMaterial(Reaction.NAME)?.icon}
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
                  icon={getMaterial(ReadVariable.NAME)?.icon}
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