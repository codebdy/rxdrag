import React, { Fragment, memo, useCallback, useMemo } from "react"
import styled from "styled-components"
import { PortsInput } from "./PortsInput"
import { VirtualForm } from "@rxdrag/react-fieldy"
import { useRxDragLocalesManager } from "@rxdrag/react-locales"
import { JSONInput, ValueInput } from "@rxdrag/react-antd-props-inputs"
import { useSelectedNode, useGetMaterial, useDispatch, useBackup, useMarkChange, ActionType } from "@rxdrag/minions-logicflow-editor"
import { INodeSchema } from "@rxdrag/schema"
import { IReactComponents } from "@rxdrag/react-shared"
import { ComponentRender } from "@rxdrag/react-runner"
import { FormValue } from "@rxdrag/fieldy"
import { FormItem, FormLayout, Radio, Slider, Switch } from "@rxdrag/react-antd-components"
import { Input, InputNumber, Select } from "antd"

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const PropertyBox = memo((
  props: {
    setters?: IReactComponents
  }
) => {
  const { setters } = props;
  const node = useSelectedNode()

  const getMaterial = useGetMaterial()
  const localesManager = useRxDragLocalesManager()
  const dispatch = useDispatch()
  const material = useMemo(() => getMaterial(node?.activityName || ""), [getMaterial, node?.activityName])
  const backup = useBackup()
  const markChange = useMarkChange()
  const propsSchema = useMemo(() => {
    if (material?.schema) {
      //翻译
      return (localesManager?.translateDesignerSchema('',
        JSON.parse(JSON.stringify(material?.schema))
      ) || material?.schema) as INodeSchema
    } else {
      return undefined
    }

  }, [localesManager, material?.schema])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNodeChange = useCallback((nodeData: any) => {
    backup()
    const newData = { ...node, ...nodeData }
    dispatch?.({ type: ActionType.CHANGE_NODE, payload: newData })
    markChange()
  }, [backup, dispatch, markChange, node])

  return (
    <FormLayout
      labelAlign="left"
      colon={false}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      labelWrap={true}
    >
      {
        node
          ?
          <VirtualForm
            initialValue={node as unknown as FormValue}
            onValueChange={handleNodeChange}
            key={node.id}
          >
            {
              propsSchema &&
              <ComponentRender
                components={{
                  Fragment: Fragment,
                  FormItem: FormItem,
                  Input,
                  Select,
                  Switch,
                  Radio,
                  Slider,
                  InputNumber,
                  TextArea: Input.TextArea,
                  PortsInput,
                  ValueInput,
                  JSONInput,
                  ...setters || {}
                }}
                schema={propsSchema}
              />
            }
          </VirtualForm>
          : <EmptyContainer>
            {/* <Empty /> */}
          </EmptyContainer>
      }
    </FormLayout>
  )
})