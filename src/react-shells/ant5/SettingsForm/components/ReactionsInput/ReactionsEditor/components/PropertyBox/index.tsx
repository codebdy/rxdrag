import { Empty, Form, Input, InputNumber, Radio, Select, Slider, Switch } from "antd"
import { useToken } from "antd/es/theme/internal"
import { useDesignerEngine } from "core-react/hooks"
import { useLanguage } from "core-react/hooks/useLanguage"
import { PreviewRoot } from "core-react/PreviewRoot"
import { Fragment, memo, useCallback, useMemo } from "react"
import { ComponentRender } from "runner/ComponentRender"
import { extractFieldSchemas } from "runner/ComponentRender/funcs/extractFieldSchemas"
import { Fieldy, VirtualForm } from "runner/fieldy"
import styled from "styled-components"
import { useGetMaterial } from "../../hooks/useGetMaterial"
import { useSelectedNode } from "../../hooks/useSelectedNode"

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
  const engine = useDesignerEngine()
  const lang = useLanguage()
  
  const material = useMemo(() => getMaterial(node?.materialName || ""), [getMaterial, node?.materialName])

  const fieldSchemas = useMemo(() => {
    if (material?.schema) {
      return material?.schema ? extractFieldSchemas(material?.schema) : []
    }
    return []
  }, [material?.schema])

  const designerSchema = useMemo(() => {
    if (material?.schema) {
      //翻译
      return engine?.getLoacalesManager()
        .translateDesignerSchema('',
          JSON.parse(JSON.stringify(material?.schema))
        )
    } else {
      return undefined
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, material?.schema, lang])

  const handleConfigChange = useCallback((config: any) => {

  }, [])

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
              }}
            >
              <Fieldy>
                <VirtualForm
                  fieldSchemas={fieldSchemas}
                  initialValue={node?.config}
                  onValueChange={handleConfigChange}
                >
                  {
                    designerSchema &&
                    <ComponentRender
                      root={designerSchema}
                    />
                  }
                </VirtualForm>
              </Fieldy>
            </PreviewRoot>
            : <EmptyContainer>
              <Empty />
            </EmptyContainer>
        }
      </Content>
    </>
  )
})