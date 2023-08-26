import { DefaultToolbar, Toolkits } from "@rxdrag/react-antd-shell-inline"
import { INodeSchema } from "@rxdrag/schema"
import { memo } from "react"
import { ResourceWidget } from "./ResourceWidget"
import { DocumentScope } from "@rxdrag/react-core"

export const PageEditor = memo((
  props: {
    design?: boolean,
    onFinished?: (schema: INodeSchema) => void,
    schema?: INodeSchema,

  }
) => {
  const { design, onFinished, schema } = props
  return (
    schema ?
      <DocumentScope schema={schema}>
        Page 内容
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