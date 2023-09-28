import { LogicMetaEditorAntd5Inner } from "@rxdrag/logicflow-editor-antd5"
import { memo } from "react"
import { activityMaterialCategories } from "../minion-materials"
import { Button, Spin } from "antd"
import styled from "styled-components"
import { Toolbar } from "./Toolbar"
import { ID } from "@rxdrag/shared"
import { useQueryFlow } from "../../../hooks/useQueryFlow"

const SaveButton = styled(Button)`
  margin-left: 32px;
`

const test = {
  nodes: [],
  lines: []
}

export const FlowEditor = memo((
  props: {
    flowId: ID,
    titleSuffix: string
  }
) => {
  const { flowId, titleSuffix } = props

  const { flow, loading } = useQueryFlow(flowId)

  return (
    flow
      ? <LogicMetaEditorAntd5Inner
        materialCategories={activityMaterialCategories}
        value={test}
        toolbox={false}
        toolbar={<Toolbar
          title={`${flow?.name} [${titleSuffix}]`}
        >
          <SaveButton type="primary">保存</SaveButton>
        </Toolbar>}
      />
      : <Spin spinning={loading} />
  )
})