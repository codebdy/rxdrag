import { LogicFlowEditorAntd5 } from "@rxdrag/logicflow-editor-antd5"
import { Fieldy } from "@rxdrag/react-fieldy"
import { memo, useCallback, useMemo } from "react"
import styled from "styled-components"
import { activityMaterialCategories, activityMaterialLocales } from "./minion-materials"
import { useToken } from "antd/es/theme/internal"
import { useSubLogicFlows } from "UmlEditor/hooks/useSubLogicFlows"
import { ILogicFlowContext } from "./contexts"
import { MethodMeta } from "UmlEditor/meta"
import { SubLogicFlowSelect } from "./setters/SubLogicFlowSelect"
import { NodeType, ILogicFlowDefine } from "@rxdrag/minions-schema"
import { ILogicMetas } from "@rxdrag/minions-logicflow-editor"

const EditorShell = styled.div`
  flex: 1;
  display: flex;
  height: calc(100vh - 200px);
`

const EmpertyLogic: ILogicMetas = {
  nodes: [],
  lines: []
}

export const LogicEditor = memo((
  props: {
    metaId: string,
    value?: MethodMeta,
    onChange?: (value: MethodMeta) => void
  }
) => {
  const { metaId, value, onChange } = props;
  const subFlows = useSubLogicFlows(metaId)
  const [, token] = useToken();

  const handleChange = useCallback((val: ILogicMetas) => {
    value && onChange?.({ ...value, logicMetas: val })
  }, [onChange, value])

  const logicFlowContext: ILogicFlowContext = useMemo(() => {
    return {
      subLogicFlows: subFlows || []
    }
  }, [subFlows])

  const canBeReferencedLogflowMetas: ILogicFlowDefine[] = useMemo(() => {
    return subFlows.map(subflow => ({
      id: subflow.uuid,
      name: subflow.name,
      type: NodeType.LogicFlowActivity,
      nodes: subflow?.logicMetas?.nodes || [],
      lines: subflow?.logicMetas?.lines || [],
    }))
  }, [subFlows])

  return (
    <EditorShell>
      <Fieldy>
        {
          value && <LogicFlowEditorAntd5
            materialCategories={activityMaterialCategories}
            locales={activityMaterialLocales}
            token={token}
            value={value?.logicMetas || EmpertyLogic}
            logicFlowContext={logicFlowContext}
            onChange={handleChange}
            setters={{
              SubLogicFlowSelect,
            }}
            canBeReferencedLogflowMetas={canBeReferencedLogflowMetas}
            toolbar={false}
          />
        }
      </Fieldy>
    </EditorShell>
  )
})
