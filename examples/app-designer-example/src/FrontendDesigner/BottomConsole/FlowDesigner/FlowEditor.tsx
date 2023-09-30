import { LogicMetaEditorAntd5Inner } from "@rxdrag/logicflow-editor-antd5"
import { ReactNode, memo, useState } from "react"
import { activityMaterialCategories } from "../minion-materials"
import { Button, Spin } from "antd"
import styled from "styled-components"
import { Toolbar } from "./Toolbar"
import { ID } from "@rxdrag/shared"
import { useQueryFlow } from "../../../hooks/useQueryFlow"
import { PropSelect } from "../setters"

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
    icon: ReactNode
  }
) => {
  const { flowId, icon } = props
  const [inputValue, setInputValue] = useState(test)

  const { flow, loading } = useQueryFlow(flowId)

  return (
    flow
      ? <LogicMetaEditorAntd5Inner
        materialCategories={activityMaterialCategories}
        value={inputValue}
        toolbox={false}
        setters={{ PropSelect }}
        toolbar={<Toolbar
          title={
            <>
              {icon}
              <span className="text">{flow?.name}</span>
            </>
          }
        >
          <SaveButton type="primary">保存</SaveButton>
        </Toolbar>}
      />
      : <Spin spinning={loading} />
  )
})