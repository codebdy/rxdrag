import { DataNode } from "antd/es/tree";
import { useCallback } from "react";
import { FunctionOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { LogicFlowLabel } from "../LogicFlowLabel";
import { ExtensionType, IExtensionLogicFlow } from "../../../interfaces/extension";
import { useQueryAppExtensionLogicFlows } from "../../../hooks/useQueryAppExtensionLogicFlows";

export function useGetFlowNodes() {
  const t = useTranslate();
  const { flows } = useQueryAppExtensionLogicFlows("app1")
  const getGraphLogicNode = useCallback((graphMeta: IExtensionLogicFlow) => {
    return {
      title: <LogicFlowLabel flowMeta={graphMeta} />,
      key: graphMeta.id,
      isLeaf: true,
      icon: <FunctionOutlined />
    }
  }, [])


  const getQueryNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: flows?.filter(orches => orches.operateType === ExtensionType.Query).map(orchestration => getGraphLogicNode(orchestration))
    }
  }, [getGraphLogicNode, flows])

  const getMutationNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: flows?.filter(orches => orches.operateType === ExtensionType.Mutation).map(orchestration => getGraphLogicNode(orchestration))
    }
  }, [getGraphLogicNode, flows])

  const getSubNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: flows?.filter(orches => orches.operateType === ExtensionType.SubMethod).map(orchestration => getGraphLogicNode(orchestration))
    }
  }, [getGraphLogicNode, flows])

  const getScriptNodes = useCallback(() => {
    const logicChildren: DataNode[] = []
    const queryNodes = getQueryNodes(t("Query"), "graph-querys");
    const mutationNodes = getMutationNodes(t("Mutation"), "graph-mutations");
    const subNodes = getSubNodes(t("SubFlows"), "graph-subs");

    if (queryNodes?.children?.length) {
      logicChildren.push(queryNodes)
    }

    if (mutationNodes?.children?.length) {
      logicChildren.push(mutationNodes)
    }

    if (subNodes?.children?.length) {
      logicChildren.push(subNodes)
    }
    return logicChildren
  }, [getQueryNodes, t, getMutationNodes, getSubNodes]);

  return getScriptNodes
}