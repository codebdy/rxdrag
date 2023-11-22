import { LogicMetaEditorAntd5Inner } from "@rxdrag/logicflow-editor-antd5"
import { ReactNode, memo, useCallback, useEffect, useState } from "react"
import { Button } from "antd"
import styled from "styled-components"
import { Toolbar } from "./Toolbar"
import { ILogicMetas, useChangeFlag } from "@rxdrag/minions-logicflow-editor"
import { useSaveFlow } from "../../../hooks/useSaveFlow"
import { IFlow } from "../../../interfaces/flow"
import { activityMaterialCategories } from "@rxdrag/minions-react-materials"
import { EntitySelect } from "../../ModuleUiDesigner/setters/EntitySelect"
import { PropSelect } from "../../ModuleUiDesigner/setters"
import { QueryParamsInput } from "../../../minions/materials/setters"

const SaveButton = styled(Button)`
  margin-left: 32px;
`

const emptyValue = {
  nodes: [],
  lines: []
}

export const FlowEditor = memo((
  props: {
    flow?: IFlow,
    icon: ReactNode
  }
) => {
  const { flow, icon } = props
  const [inputValue, setInputValue] = useState<ILogicMetas>(emptyValue)

  useEffect(() => {
    setInputValue(flow?.metas || emptyValue)
  }, [flow?.metas, flow?.id])

  const { changeFlag, setChangeFlag } = useChangeFlag()
  const [save, { loading: saving }] = useSaveFlow({
    onComplete: () => {
      setChangeFlag(0)
    }
  })

  const handleSave = useCallback(() => {
    if (flow) {
      save({ ...flow, metas: inputValue })
    }
  }, [flow, inputValue, save])

  return (
    <LogicMetaEditorAntd5Inner
      materialCategories={activityMaterialCategories}
      value={inputValue}
      toolbox={false}
      setters={{ PropSelect, EntitySelect, QueryParamsInput }}
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
  )
})