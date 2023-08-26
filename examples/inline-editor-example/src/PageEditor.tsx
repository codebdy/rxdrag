import { DefaultToolbar, Toolkits } from "@rxdrag/react-antd-shell-inline"
import { INodeSchema } from "@rxdrag/schema"
import { memo } from "react"
import { ResourceWidget } from "./ResourceWidget"

export const PageEditor = memo((
  props: {
    design?: boolean,
    onFinished?: (schema: INodeSchema) => void
  }
) => {
  const { design, onFinished } = props
  return (
    <>
      Page 内容
      {design &&
        <Toolkits
          toolbox={<ResourceWidget />}
          toolbar={<DefaultToolbar onPreview={onFinished} />}
        />
      }
    </>
  )
})