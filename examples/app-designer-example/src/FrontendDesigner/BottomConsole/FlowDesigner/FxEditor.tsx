import { LogicMetaEditorAntd5Inner } from "@rxdrag/logicflow-editor-antd5"
import { memo } from "react"
import { activityMaterialCategories } from "../minion-materials"
import { Button, Spin } from "antd"
import styled from "styled-components"
import { Toolbar } from "./Toolbar"
import { ID } from "@rxdrag/shared"
import { useQueryFxFlow } from "../../../hooks/useQueryFxFlow"


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

  const { fxFlow, loading } = useQueryFxFlow(fxId)

  return (
    fxFlow
      ? <LogicMetaEditorAntd5Inner
        materialCategories={activityMaterialCategories}
        value={test}
        toolbox={false}
        toolbar={<Toolbar
          title={`${fxFlow?.name} [子流程]`}
        >
          <SaveButton type="primary">保存</SaveButton>
        </Toolbar>}
      />
      : <Spin spinning={loading} />
  )
})