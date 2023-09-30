import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../common/TreeContainer";
import { useModule } from "../../hooks/useModule";
import { useDesignerEngine, useGetNode } from "@rxdrag/react-core";
import { ITreeNode } from "@rxdrag/core"
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { ThunderboltOutlined } from "@ant-design/icons";
import { puzzleIcon, setPropIcon, listenPropIcon } from "../icons";
import { setPropMaterial } from "../minion-materials/controller/setProp";
import { ActivityResource } from "@rxdrag/minions-logicflow-editor"
import { IActivityMaterial } from "@rxdrag/minions-schema";
import styled from "styled-components";
import { listenPropMaterial } from "../minion-materials/controller/listenProp";
import { createId } from "@rxdrag/shared";

const { DirectoryTree } = Tree;

const DraggableText = styled.div`
  cursor: move;
`

export type ReactionableNode = {
  node: ITreeNode<unknown, IControllerMeta>,
  children?: ReactionableNode[]
}

export const ComponentTree = memo((
  props: {
    display?: boolean,
  }
) => {
  const { display } = props;
  const module = useModule()
  const engine = useDesignerEngine()
  const docs = engine?.getAllDocuments()
  const getNode = useGetNode()

  const getReactionableSchemas = useCallback((node: ITreeNode<unknown, IControllerMeta>) => {
    const nodes: ReactionableNode[] = []
    let activeNodes = nodes
    if (node.meta["x-controller"]?.enable) {
      const rNode: ReactionableNode = {
        node: node,
        children: []
      }
      nodes.push(rNode)
      activeNodes = rNode.children || []
    }

    for (const childId of node.children) {
      const child = getNode(childId)
      if (child) {
        const children = getReactionableSchemas(child as ITreeNode<unknown, IControllerMeta>)
        activeNodes.push(...children)
      }
    }
    return nodes
  }, [getNode])

  const getSchemaTreeOfView = useCallback((id: string) => {
    const doc = docs?.find(doc => doc.id === id)
    const rootNode = doc?.getRootNode()
    if (rootNode) {
      return getReactionableSchemas(rootNode as ITreeNode<unknown, IControllerMeta>)
    }

  }, [docs, getReactionableSchemas])

  const getOneNode = useCallback((rNode: ReactionableNode): DataNode => {
    const children = rNode.children?.map(child => getOneNode(child))
    // const componentMaterial = engine?.getComponentManager().getComponentConfig(rNode.node.meta.componentName) as IMaterial | undefined
    // const controllerMaterial = rNode.node.meta["x-controller"]
    // const setPropsMaterial = createSetPropMaterial(controllerMaterial, componentMaterial?.controller as IControllerMaterial | undefined, rNode.node, componentMaterial)
    //registerMaterial(setPropsMaterial as IActivityMaterial)
    // const listenPropsMaterial = createListenPropMaterial(controllerMaterial, componentMaterial?.controller as IControllerMaterial | undefined)
    //registerMaterial(listenPropsMaterial as IActivityMaterial)
    const title = rNode.node.meta?.["x-controller"]?.name || rNode.node.title;
    return {
      key: rNode.node.id,
      icon: puzzleIcon,
      title: title,
      children: [
        ...children || [],
        {
          key: rNode.node.id + "setprops",
          title: <ActivityResource
            material={setPropMaterial as IActivityMaterial<React.ReactNode>}
            createNode={() => {
              return {
                id: createId(),
                //label: title,
                type: setPropMaterial.activityType,
                activityName: setPropMaterial.activityName,
                inPorts: [
                  {
                    id: createId(),
                    name: "input",
                    label: "$props",
                  },
                ],
                outPorts: [
                  {
                    id: createId(),
                    name: "output",
                    label: "",
                  },
                ],
              }
            }}
          >
            {
              (onStartDrag) => {
                return <DraggableText onMouseDown={onStartDrag}>
                  设置属性
                </DraggableText>
              }
            }
          </ActivityResource>,
          isLeaf: true,
          icon: setPropIcon,
        },
        {
          key: rNode.node.id + "listenprops",
          title: <ActivityResource
            material={listenPropMaterial as IActivityMaterial<React.ReactNode>}
            createNode={() => {
              return {
                id: createId(),
                label: title,
                type: listenPropMaterial.activityType,
                activityName: listenPropMaterial.activityName,
                outPorts: [
                  {
                    id: createId(),
                    name: "output",
                    label: "$propsChange",
                  },
                ],
              }
            }}
          >
            {
              (onStartDrag) => {
                return <DraggableText onMouseDown={onStartDrag}>
                  监听属性
                </DraggableText>
              }
            }
          </ActivityResource>,
          isLeaf: true,
          icon: listenPropIcon
        },
        {
          key: rNode.node.id + "init",
          title: "初始化",
          icon: <ThunderboltOutlined />,
          isLeaf: true,
        },
        {
          key: rNode.node.id + "onClick",
          title: "点击",
          icon: <ThunderboltOutlined />,
          isLeaf: true,
        },
      ]
    }
  }, [])

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