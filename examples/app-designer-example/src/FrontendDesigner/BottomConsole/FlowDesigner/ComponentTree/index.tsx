import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { useModule } from "../../../hooks/useModule";
import { IMaterial, useDesignerEngine } from "@rxdrag/react-core";
import { ITreeNode } from "@rxdrag/core"
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { puzzleIcon } from "../../icons";
import { SvgIcon } from "@rxdrag/react-antd-shell";
import { IFlow } from "../../../../interfaces/flow";
import { IFieldMeta } from "@rxdrag/fieldy";
import { useGetSchemaTreeOfView } from "./useGetSchemaTreeOfView";
import { getSetPropsNode } from "./getSetPropsNode";
import { getListenPropNode } from "./getListenPropNode";
import { getEventNodes } from "./getEventNodes";
import { getReactionNodes } from "./getReactionNodes";
import { getArrayNodes } from "./getArrayNodes";

const { DirectoryTree } = Tree;

export type ReactionableNode = {
  node: ITreeNode<IFieldMeta, IControllerMeta>,
  children?: ReactionableNode[]
}

export const ComponentTree = memo((
  props: {
    flow?: IFlow,
    display?: boolean,
  }
) => {
  const { flow, display } = props;
  const module = useModule()
  const engine = useDesignerEngine()
  const getSchemaTreeOfView = useGetSchemaTreeOfView()

  const getOneNode = useCallback((rNode: ReactionableNode): DataNode => {
    const isArray = rNode.node.meta?.["x-field"]?.type === "array"
    const ctrlMeta = rNode.node.meta?.["x-controller"]
    const isInArray = !(isArray && flow?.ownerId !== ctrlMeta?.id)
    const children = !isInArray ? [] : rNode.children?.map(child => getOneNode(child))
    const title = ctrlMeta?.name || rNode.node.title;
    const comMaterial = engine?.getComponentManager().getComponentConfig(rNode.node.meta.componentName || "") as IMaterial | undefined

    return {
      key: rNode.node.id,
      icon: <SvgIcon>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          engine?.getComponentManager().getComponentConfig(rNode.node.meta.componentName)?.resource?.icon as any || puzzleIcon
        }
      </SvgIcon>,
      title: title,
      children: [
        ...children || [],
        getSetPropsNode(rNode),
        ...getArrayNodes(rNode, isInArray),
        ...getReactionNodes(rNode, engine, comMaterial),
        getListenPropNode(rNode),
        ...getEventNodes(rNode, engine, comMaterial),
      ]
    }
  }, [engine, flow?.ownerId])

  const treeData: DataNode[] = useMemo(() => {
    return module?.views?.map(view => ({
      key: view.id,
      title: view.title,
      children: getSchemaTreeOfView(view.id)?.map(schema => getOneNode(schema)),
    })) || []
  }, [getOneNode, getSchemaTreeOfView, module?.views])

  return (
    <TreeContainer
      className={!display ? "hidden" : undefined}
    >
      <DirectoryTree
        selectable={false}
        treeData={treeData}
      />
    </TreeContainer>
  )
})