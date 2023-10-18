import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { MethodMeta, MethodOperateType } from "UmlEditor/meta";
import { graphLogicsState } from "UmlEditor/recoil/atoms";
import { DataNode } from "antd/es/tree";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { FunctionOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { GraphLogicLabel } from "./GraphLogicLabel";

export function useGetGraphNodes() {
  const metaId = useMetaId();
  const { t } = useTranslation();
  const graphMetas = useRecoilValue(graphLogicsState(metaId))
  const getGraphLogicNode = useCallback((graphMeta: MethodMeta) => {
    return {
      title: <GraphLogicLabel graphLogicMeta={graphMeta} />,
      key: graphMeta.uuid,
      isLeaf: true,
      icon: <FunctionOutlined />
    }
  }, [])


  const getQueryNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: graphMetas.filter(orches => orches.operateType === MethodOperateType.Query).map(orchestration => getGraphLogicNode(orchestration))
    }
  }, [getGraphLogicNode, graphMetas])

  const getMutationNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: graphMetas.filter(orches => orches.operateType === MethodOperateType.Mutation).map(orchestration => getGraphLogicNode(orchestration))
    }
  }, [getGraphLogicNode, graphMetas])

  const getSubNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: graphMetas.filter(orches => orches.operateType === MethodOperateType.SubMethod).map(orchestration => getGraphLogicNode(orchestration))
    }
  }, [getGraphLogicNode, graphMetas])

  const getScriptNodes = useCallback(() => {
    const logicChildren: DataNode[] = []
    const queryNodes = getQueryNodes(t("UmlEditor.QueryGraphs"), "graph-querys");
    const mutationNodes = getMutationNodes(t("UmlEditor.MutationGraphs"), "graph-mutations");
    const subNodes = getSubNodes(t("UmlEditor.SubGraphs"), "graph-subs");

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