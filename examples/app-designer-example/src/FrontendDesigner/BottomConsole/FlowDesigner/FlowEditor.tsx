import { LogicMetaEditorAntd5Inner } from "@rxdrag/logicflow-editor-antd5"
import { ReactNode, memo, useCallback, useEffect, useState } from "react"
import { activityMaterialCategories } from "../minion-materials"
import { Button, Spin } from "antd"
import styled from "styled-components"
import { Toolbar } from "./Toolbar"
import { ID } from "@rxdrag/shared"
import { useQueryFlow } from "../../../hooks/useQueryFlow"
import { PropSelect } from "../setters"
import { ILogicMetas, useChangeFlag } from "@rxdrag/minions-logicflow-editor"
import { useSaveFlow } from "../../../hooks/useSaveFlow"

const SaveButton = styled(Button)`
  margin-left: 32px;
`

const emptyValue = {
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
  const [inputValue, setInputValue] = useState<ILogicMetas>(emptyValue)
  const { flow, loading } = useQueryFlow(flowId)

  useEffect(() => {
    setInputValue(flow?.metas || emptyValue)
  }, [flow?.metas,])

  const { changeFlag, setChangeFlag } = useChangeFlag()
  const [save, { loading: saving }] = useSaveFlow({
    onComplate: () => {
      setChangeFlag(0)
    }
  })

  const handleSave = useCallback(() => {
    if (flow) {
      save({ ...flow, metas: inputValue })
    }
  }, [flow, inputValue, save])

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
          <SaveButton
            type="primary"
            disabled={!changeFlag}
            loading={saving}
            onClick={handleSave}
          >保存</SaveButton>
        </Toolbar>}

        onChange={setInputValue}
      />
      : <Spin spinning={loading} />
  )
})