import { Empty, Form, Input, InputNumber, Radio, Select, Slider, Switch } from "antd"
import React, { Fragment, memo, useCallback, useMemo } from "react"
import styled from "styled-components"
import { PortsInput } from "./PortsInput"
import { VariableSelect } from "./VariableSelect"
import { VirtualForm } from "@rxdrag/react-fieldy"
import { useLocalesManager } from "@rxdrag/react-locales"
import { ComponentRender, RuntimeRoot } from "@rxdrag/react-runner"
import { JSONInput, ValueInput } from "@rxdrag/react-antd-props-inputs"
import { useSelectedNode, useGetMaterial, useDispatch, useBackup, useMarkChange, ActionType } from "@rxdrag/minions-logicflow-editor"
import { INodeSchema } from "@rxdrag/schema"

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const PropertyBox = memo(() => {
  const node = useSelectedNode()
  const getMaterial = useGetMaterial()
  const localesManager = useLocalesManager()
  const dispatch = useDispatch()
  const material = useMemo(() => getMaterial(node?.activityName || ""), [getMaterial, node?.activityName])
  const backup = useBackup()
  const markeChange = useMarkChange()
  const propsSchema = useMemo(() => {
    if (material?.schema) {
      //翻译
      return (localesManager?.translateDesignerSchema('',
        JSON.parse(JSON.stringify(material?.schema))
      ) || material?.schema) as INodeSchema
    } else {
      return undefined
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localesManager, material?.schema])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNodeChange = useCallback((nodeData: any) => {
    backup()
    const newData = { ...node, ...nodeData }
    dispatch?.({ type: ActionType.CHANGE_NODE, payload: newData })
    markeChange()
  }, [backup, dispatch, markeChange, node])

  return (
    <>
      {
        node
          ? <RuntimeRoot
            components={{
              Fragment: Fragment,
              FormItem: Form.Item,
              Input,
              Select,
              Switch,
              Radio,
              Slider,
              InputNumber,
              TextArea: Input.TextArea,
              PortsInput,
              VariableSelect,
              ValueInput,
              JSONInput,
            }}
          >
            <VirtualForm
              //fieldSchemas={fieldSchemas}
              initialValue={node}
              onValueChange={handleNodeChange}
              key={node.id}
            >
              {
                propsSchema &&
                <ComponentRender
                  root={propsSchema}
                />
              }
            </VirtualForm>
          </RuntimeRoot>
          : <EmptyContainer>
            <Empty />
          </EmptyContainer>
      }
    </>
  )
})