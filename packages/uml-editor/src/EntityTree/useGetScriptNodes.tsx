import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { MethodMeta, MethodOperateType } from "UmlEditor/meta";
import { codesState, scriptLogicsState } from "UmlEditor/recoil/atoms";
import { DataNode } from "antd/es/tree";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { FileOutlined, FunctionOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { ScriptLogicLabel } from "./ScriptLogicLabel";
import { CodeMeta } from "UmlEditor/meta/CodeMeta";
import { CodeLabel } from "./CodeLabel";

export function useGetScriptNodes() {
  const metaId = useMetaId();
  const { t } = useTranslation();
  const scriptMetas = useRecoilValue(scriptLogicsState(metaId))
  const codeMetas = useRecoilValue(codesState(metaId))
  const getCodeNode = useCallback((codeMeta: CodeMeta) => {
    return {
      title: <CodeLabel codeMeta={codeMeta} />,
      key: codeMeta.uuid,
      isLeaf: true,
      icon: <FileOutlined />
    }
  }, [])

  const getScriptLogicNode = useCallback((scriptMeta: MethodMeta) => {
    return {
      title: <ScriptLogicLabel scriptMeta={scriptMeta} />,
      key: scriptMeta.uuid,
      isLeaf: true,
      icon: <FunctionOutlined />
    }
  }, [])
  const getCodeNodes = useCallback((key: string) => {
    return {
      title: t("UmlEditor.Codes"),
      key: key,
      children: codeMetas.map(code => getCodeNode(code))
    }
  }, [codeMetas, getCodeNode, t])

  const getQueryNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: scriptMetas.filter(orches => orches.operateType === MethodOperateType.Query).map(orchestration => getScriptLogicNode(orchestration))
    }
  }, [getScriptLogicNode, scriptMetas])

  const getMutationNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: scriptMetas.filter(orches => orches.operateType === MethodOperateType.Mutation).map(orchestration => getScriptLogicNode(orchestration))
    }
  }, [getScriptLogicNode, scriptMetas])

  const getScriptNodes = useCallback(() => {
    const scriptChildren: DataNode[] = []
    const codeNodes = getCodeNodes("script-codes");
    const queryNodes = getQueryNodes(t("UmlEditor.QueryScripts"), "script-querys");
    const mutationNodes = getMutationNodes(t("UmlEditor.MutationScripts"), "scriptmutations");

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