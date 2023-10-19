import { LogicMetaEditorAntd5Inner } from "@rxdrag/logicflow-editor-antd5"
import { memo, useState } from "react"
import styled from "styled-components"
import { backendActivityMaterialCategories } from "./minion-materials"
import { ILogicMetas } from "@rxdrag/minions-logicflow-editor"
import { ID } from "@rxdrag/shared"
import { useQueryExtensionLogicFlow } from "../../hooks/useQueryExtensionLogicFlow"
import { Button } from "antd"
import { Toolbar } from "./Toolbar"

const SaveButton = styled(Button)`
  margin-left: 32px;
`

const emptyValue = {
  nodes: [],
  lines: []
}

export const LogicEditor = memo((
  props: {
    id?: ID,
  }
) => {
  const { id } = props;
  const [inputValue, setInputValue] = useState<ILogicMetas>(emptyValue)
  const { flow } = useQueryExtensionLogicFlow(id || "")
  console.log("===>flow", flow, id)
  return (
    <LogicMetaEditorAntd5Inner
      style={{ display: id ? undefined : "none" }}
      materialCategories={backendActivityMaterialCategories}
      value={inputValue}
      toolbox={false}
      toolbar={<Toolbar
        title={
          <>
            <span className="text">{flow?.name}</span>
          </>
        }
      >
        <SaveButton
          type="primary"
        //disabled={!changeFlag}
        //loading={saving}
        //onClick={handleSave}
        >保存</SaveButton>
      </Toolbar>}

      onChange={setInputValue}
    />
  )
})
