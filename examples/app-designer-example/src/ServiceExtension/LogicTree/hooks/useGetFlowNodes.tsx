import { DataNode } from "antd/es/tree";
import { useCallback } from "react";
import { FunctionOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { LogicFlowLabel } from "../LogicFlowLabel";
import { OperateType, IExtensionLogicFlow } from "../../../interfaces/extension";
import { useQueryAppExtensionLogicFlows } from "../../../hooks/useQueryAppExtensionLogicFlows";
import { ExtentionType } from "../types";
import { SubFlowLabel } from "../SubFlowLabel";

export function useGetFlowNodes() {
  const t = useTranslate();
  const { flows } = useQueryAppExtensionLogicFlows("app1")
  const getSubNode = useCallback((codeMeta: IExtensionLogicFlow) => {
    return {
      title: <SubFlowLabel codeMeta={codeMeta} />,
      key: codeMeta.id,
      isLeaf: true,
      icon: <FunctionOutlined />,
      type: ExtentionType.script,
    }
  }, [])

  const getLogicFlowNode = useCallback((graphMeta: IExtensionLogicFlow) => {
    return {
      title: <LogicFlowLabel flowMeta={graphMeta} />,
      key: graphMeta.id,
      isLeaf: true,
      icon: <FunctionOutlined />,
      type: ExtentionType.logicflow
    }
  }, [])


  const getQueryNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      selectable: false,
      children: flows?.filter(orches => orches.operateType === OperateType.Query).map(orchestration => getLogicFlowNode(orchestration))
    }
  }, [getLogicFlowNode, flows])

  const getMutationNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      selectable: false,
      children: flows?.filter(orches => orches.operateType === OperateType.Mutation).map(orchestration => getLogicFlowNode(orchestration))
    }
  }, [getLogicFlowNode, flows])

  const getSubNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      selectable: false,
      children: flows?.filter(orches => orches.operateType === OperateType.SubMethod).map(orchestration => getSubNode(orchestration))
    }
  }, [flows, getSubNode])

  const getLogicFLowNodes = useCallback(() => {
    const logicChildren: DataNode[] = []
    const queryNodes = getQueryNodes(t("Query"), "graph-querys");
    const mutationNodes = getMutationNodes(t("Mutation"), "graph-mutations");
    const subNodes = getSubNodes(t("SubFlows"), "graph-subs");

    if (subNodes?.children?.length) {
      logicChildren.push(subNodes)
    }
    if (queryNodes?.children?.length) {
      logicChildren.push(queryNodes)
    }

    if (mutationNodes?.children?.length) {
      logicChildren.push(mutationNodes)
    }

    return logicChildren
  }, [getQueryNodes, t, getMutationNodes, getSubNodes]);

  return getLogicFLowNodes
}