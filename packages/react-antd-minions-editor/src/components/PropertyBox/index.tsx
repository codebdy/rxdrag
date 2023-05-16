import { Empty, Form, Input, InputNumber, Radio, Select, Slider, Switch } from "antd"
import { useToken } from "antd/es/theme/internal"
import React, { Fragment, memo, useCallback, useMemo } from "react"
import styled from "styled-components"
import { ActionType } from "../../actions"
import { useBackup } from "../../hooks/edit-meta/useBackup"
import { useMarkChange } from "../../hooks/edit-meta/useMarkChange"
import { useDispatch } from "../../hooks/useDispatch"
import { useGetMaterial } from "../../hooks/useGetMaterial"
import { useSelectedNode } from "../../hooks/useSelectedNode"
import { PortsInput } from "./PortsInput"
import { VariableSelect } from "./VariableSelect"
import { VirtualForm } from "@rxdrag/react-fieldy"
import { useLocalesManager } from "@rxdrag/react-locales"
import { ComponentRender, PreviewRoot } from "@rxdrag/react-runner"
import { JSONInput, ValueInput } from "@rxdrag/react-antd-props-inputs"

const Title = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px;
  padding: 0 16px;
`

const Content = styled.div`
  flex:1;
  padding: 16px;
  display: flex;
  flex-flow: column;
`

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const PropertyBox = memo(() => {
  const [, token] = useToken()
  const node = useSelectedNode()
  const getMaterial = useGetMaterial()
  const localesManager = useLocalesManager()
  const dispatch = useDispatch()
  const material = useMemo(() => getMaterial(node?.materialName || ""), [getMaterial, node?.materialName])
  const backup = useBackup()
  const markeChange = useMarkChange()

  const propsSchema = useMemo(() => {
    if (material?.schema) {
      //翻译
      return localesManager?.translateDesignerSchema('',
        JSON.parse(JSON.stringify(material?.schema))
      ) || material?.schema
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
      <Title style={{ borderColor: token.colorBorder }}>
        {material?.icon}<span style={{ marginLeft: 8 }}>{node?.label}</span>
      </Title>
      <Content>
        {
          node
            ? <PreviewRoot
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
            </PreviewRoot>
            : <EmptyContainer>
              <Empty />
            </EmptyContainer>
        }
      </Content>
    </>
  )
})