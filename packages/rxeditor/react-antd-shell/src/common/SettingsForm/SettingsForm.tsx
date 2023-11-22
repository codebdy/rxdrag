import { CSSProperties, memo, useCallback, useEffect, useMemo } from "react"
import { Form } from 'antd';
import { useDesignerEngine, useCurrentNode, useChangeNodeMeta, useLanguage, useSetters, useNodeMeta } from "@rxdrag/react-core";
import { VirtualForm } from "@rxdrag/react-fieldy";
import { ComponentRender } from "@rxdrag/react-runner";
import { INodeMeta } from "@rxdrag/schema";
import { FormValue } from "@rxdrag/fieldy"
import { setterLocales } from "@rxdrag/react-antd-props-inputs"

const propertiesStyle: CSSProperties = {
  flex: 1,
  height: 0,
  width: "100%",
}

export const SettingsForm = memo(() => {
  const engine = useDesignerEngine()
  const currentNode = useCurrentNode()
  const meta = useNodeMeta(currentNode?.id)
  const changeMeta = useChangeNodeMeta()
  const lang = useLanguage()
  const setters = useSetters()
  useEffect(() => {
    engine?.getLocalesManager().registerSetterLocales(setterLocales)
  }, [engine])

  const propsSchema = useMemo(() => {
    if (currentNode && currentNode.propsSchema) {
      //翻译
      return engine?.getLocalesManager()
        .translateDesignerSchema(currentNode?.meta.componentName,
          JSON.parse(JSON.stringify(currentNode.propsSchema))
        )
    } else {
      return undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode, engine, lang])
  const handleMetaChange = useCallback((mt: INodeMeta) => {
    if (currentNode && meta !== mt) {
      changeMeta(currentNode.id, mt)
    }
  }, [changeMeta, currentNode, meta])

  return (
    <div style={propertiesStyle}>
      {
        <VirtualForm
          initialValue={meta as unknown as FormValue | undefined}
          onValueChange={handleMetaChange as unknown as (value: FormValue | undefined) => void}
        //key={currentNode.id}
        >
          <Form
            labelAlign="left"
            colon={false}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            autoComplete="off"
            labelWrap={true}
            style={{
              flex: 1,
              height: '100%',
            }}
          >
            {
              propsSchema &&
              <ComponentRender
                schema={propsSchema}
                components={setters}
              //localesManager={engine?.getLocalesManager()}
              />
            }
          </Form>
        </VirtualForm>
      }
    </div>
  )
})