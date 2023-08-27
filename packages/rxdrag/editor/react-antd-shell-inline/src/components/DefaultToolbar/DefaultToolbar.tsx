import { ReactElement, memo, useCallback, useMemo } from "react"
import { Divider, Space } from "antd"
import { UndoButton } from "./UndoButton"
import { RedoButton } from "./RedoButton"
import { MultiSelectionButton } from "./MultiSelectionButton"
import { AuxLineButton } from "./AuxLineButton"
import { AuxMarginButton } from "./AuxMarginButton"
import { JSONButton } from "./JSONButton"
import { PreviewButton } from "./PreviewButton"
import { INodeSchema } from "@rxdrag/schema"
import { useDocument } from "@rxdrag/react-core"

export enum ToolbarButton {
  undo = "undo",
  redo = "redo",
  multiSelection = "multiSelection",
  auxLine = "auxLine",
  auxMargin = "auxMargin",
  design = "design",
  priview = "priview",
  divider = "divider"
}

export const DefaultToolbar = memo((
  props: {
    buttons?: (ToolbarButton | ReactElement)[],
    ellipsisAt?: number,
    onPreview?: (schema: INodeSchema) => void,
  }
) => {
  const { buttons, onPreview } = props
  const doc = useDocument()
  const handlePreview = useCallback(() => {
    const json = doc?.getSchemaTree()
    if(json){
      onPreview?.(json)
    }
  }, [doc, onPreview])

  const defualtButtons = useMemo(() => <>
    <UndoButton />
    <RedoButton />
    <Divider type="vertical" />
    <MultiSelectionButton />
    <AuxLineButton />
    <AuxMarginButton />
    <Divider type="vertical" />
    <JSONButton />
    <PreviewButton onClick={handlePreview} />
    {/* <Button
      type={"text"}
      size="large"
      icon={<EllipsisOutlined />}
    //onClick={handleRedo}
    /> */}
  </>, [handlePreview])

  return (
    <Space>
      {!buttons && defualtButtons}
    </Space>
  )
})