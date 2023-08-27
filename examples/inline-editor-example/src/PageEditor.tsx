import { DefaultToolbar, Toolkits } from "@rxdrag/react-antd-shell-inline"
import { INodeSchema } from "@rxdrag/schema"
import { memo, useMemo } from "react"
import { ResourceWidget } from "./ResourceWidget"
import { Canvas, DocumentScope, Preview } from "@rxdrag/react-core"
import { controllerDefines } from "example-common"
import { ControllerFactories } from '@rxdrag/react-runner';
import { usePredefinedComponents } from "./hooks/usePredefinedComponents"

const defaultSchema: INodeSchema = {
  componentName: "Page"
}

export const PageEditor = memo((
  props: {
    design?: boolean,
    onFinished?: (schema: INodeSchema) => void,
    schema?: INodeSchema,

  }
) => {
  const { design, onFinished, schema = defaultSchema } = props
  const { components } = usePredefinedComponents()
  //需要的控制器
  const controllerFactories = useMemo(() => {
    const factories: ControllerFactories = {}
    for (const ctrlDef of controllerDefines) {
      factories[ctrlDef.name] = ctrlDef.factory
    }
    return factories
  }, [])

  return (
    schema ?
      <DocumentScope schema={schema}>
        {
          design
            ? <Canvas />
            : <Preview
              components={components}
              controllerFactories={controllerFactories}
            />
        }
        {design &&
          <Toolkits
            toolbox={<ResourceWidget />}
            toolbar={<DefaultToolbar onPreview={onFinished} />}
          />
        }
      </DocumentScope>
      : <></>
  )
})