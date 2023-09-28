import { LogicMetaEditorAntd5Inner } from "@rxdrag/logicflow-editor-antd5"
import { memo } from "react"
import { activityMaterialCategories } from "../minion-materials"
import { Button } from "antd"
import styled from "styled-components"
import { Toolbar } from "./Toolbar"
import { ID } from "@rxdrag/shared"


const SaveButton = styled(Button)`
  margin-left: 32px;
`

const test = {
  nodes: [],
  lines: []
}

export const FxEditor = memo((
  props: {
    fxId: ID
  }
) => {
  const { fxId } = props;

  return (
    <LogicMetaEditorAntd5Inner
      materialCategories={activityMaterialCategories}
      value={test}
      toolbox={false}
      toolbar={<Toolbar
        title={`${"xxx"} [子流程]`}
      >
        <SaveButton type="primary">保存</SaveButton>
      </Toolbar>}
    />
  )
})