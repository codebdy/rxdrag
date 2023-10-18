import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { MethodMeta, MethodOperateType } from "UmlEditor/meta";
import { apisState } from "UmlEditor/recoil/atoms";
import { DataNode } from "antd/es/tree";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import { ApiLabel } from "./ApiLabel";
import { ApiOutlined } from "@ant-design/icons";

export function useGetApiNodes() {
  const metaId = useMetaId();
  const { t } = useTranslation();
  const apiMetas = useRecoilValue(apisState(metaId))
  const getApiNode = useCallback((apiMeta: MethodMeta) => {
    return {
      title: <ApiLabel apiMeta={apiMeta} />,
      key: apiMeta.uuid,
      isLeaf: true,
      icon: <ApiOutlined />
    }
  }, [])


  const getQueryNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: apiMetas.filter(api => api.operateType === MethodOperateType.Query).map(api => getApiNode(api))
    }
  }, [getApiNode, apiMetas])

  const getMutationNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: apiMetas.filter(api => api.operateType === MethodOperateType.Mutation).map(api => getApiNode(api))
    }
  }, [getApiNode, apiMetas])

  const getAllApiNodes = useCallback(() => {
    const apiChildren: DataNode[] = []
    const queryNodes = getQueryNodes(t("UmlEditor.QueryApis"), "api-querys");
    const mutationNodes = getMutationNodes(t("UmlEditor.MutationApis"), "api-mutations");

    if (queryNodes?.children?.length) {
      apiChildren.push(queryNodes)
    }

    if (mutationNodes?.children?.length) {
      apiChildren.push(mutationNodes)
    }

    return apiChildren
  }, [getQueryNodes, t, getMutationNodes]);

  return getAllApiNodes
}