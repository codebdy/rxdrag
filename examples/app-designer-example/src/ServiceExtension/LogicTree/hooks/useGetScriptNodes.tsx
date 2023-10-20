import { DataNode } from "antd/es/tree";
import { useCallback, useMemo } from "react";
import { FileOutlined, FunctionOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { useQueryAppExtensionScripts } from "../../../hooks/useQueryAppExtensionScripts";
import { OperateType, IExtendsionScript } from "../../../interfaces/extension";
import { CodeLabel } from "../CodeLabel";
import { ScriptLogicLabel } from "../ScriptLogicLabel";
import { ExtensionType } from "../types";

export function useGetScriptNodes() {
  const t = useTranslate();
  const { scripts } = useQueryAppExtensionScripts("app1")
  const codeMetas = useMemo(() => scripts?.filter(sc => sc.operateType === OperateType.SubMethod), [scripts])
  const getCodeNode = useCallback((codeMeta: IExtendsionScript) => {
    return {
      title: <CodeLabel codeMeta={codeMeta} />,
      key: codeMeta.id,
      isLeaf: true,
      icon: <FileOutlined />,
      type: ExtensionType.script,
    }
  }, [])

  const getScriptLogicNode = useCallback((scriptMeta: IExtendsionScript) => {
    return {
      title: <ScriptLogicLabel scriptMeta={scriptMeta} />,
      key: scriptMeta.id,
      isLeaf: true,
      icon: <FunctionOutlined />,
      type: ExtensionType.script,
    }
  }, [])
  const getCodeNodes = useCallback((key: string) => {
    return {
      title: t("Codes"),
      key: key,
      selectable: false,
      children: codeMetas?.map(code => getCodeNode(code))
    }
  }, [codeMetas, getCodeNode, t])

  const getQueryNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      selectable: false,
      children: scripts?.filter(orches => orches.operateType === OperateType.Query).map(orchestration => getScriptLogicNode(orchestration))
    }
  }, [getScriptLogicNode, scripts])

  const getMutationNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      selectable: false,
      children: scripts?.filter(orches => orches.operateType === OperateType.Mutation).map(orchestration => getScriptLogicNode(orchestration))
    }
  }, [getScriptLogicNode, scripts])

  const getScriptNodes = useCallback(() => {
    const scriptChildren: DataNode[] = []
    const codeNodes = getCodeNodes("script-codes");
    const queryNodes = getQueryNodes(t("Query"), "script-querys");
    const mutationNodes = getMutationNodes(t("Mutation"), "scriptmutations");

    if (codeNodes.children?.length) {
      scriptChildren.push(codeNodes)
    }
    if (queryNodes?.children?.length) {
      scriptChildren.push(queryNodes)
    }

    if (mutationNodes?.children?.length) {
      scriptChildren.push(mutationNodes)
    }

    return scriptChildren
  }, [getCodeNodes, getQueryNodes, t, getMutationNodes]);

  return getScriptNodes
}