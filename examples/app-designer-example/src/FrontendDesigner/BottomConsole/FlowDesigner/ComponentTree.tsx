import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../common/TreeContainer";
import { useModule } from "../../hooks/useModule";
import { useDesignerEngine, useGetNode } from "@rxdrag/react-core";
import { ITreeNode } from "@rxdrag/core"
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { ThunderboltOutlined } from "@ant-design/icons";

const { DirectoryTree } = Tree;

export const setPropIcon = <span role="img" className="anticon">
  <svg width='1em' height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path key="1" d="M275.3 608.2c0 17.6 14.4 32.1 32.1 32.1h409.2c17.7 0 32.1-14.4 32.1-32.1 0-17.6-14.4-32.1-32.1-32.1H307.4c-17.6 0-32.1 14.4-32.1 32.1zM498.5 320H307.4c-17.6 0-32.1 14.4-32.1 32.1 0 17.6 14.4 32.1 32.1 32.1h191.1c17.7 0 32.2-14.4 32.1-32.1 0-17.6-14.4-32.1-32.1-32.1zM848.9 132.5L579.8 401.6c-12.5 12.5-12.5 32.9 0.1 45.4 12.5 12.5 32.9 12.5 45.4 0l269-269.1c12.5-12.5 12.5-32.9 0-45.4s-32.9-12.5-45.4 0z" ></path><path key="2" d="M931.8 62.8a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" ></path><path key="3" d="M865.9 352c-17.8 0-32.2 14.4-32.2 32.1v0.1h-0.3v446.4c0 35.2-28.8 64-64 64H222.2c-35.2 0-64-28.8-64-64V192c0-35.2 28.8-64 64-64h482.4c17.6-0.3 31.7-14.5 31.7-32.1 0-17.7-14.4-32.1-32.2-32.1-0.8 0-1.6 0-2.4 0.1H226c-70.4 0-128 57.6-128 128v639.7c0 70.4 57.6 128 128 128h574c70.4 0 98-57.6 98-128V386.5c0.1-0.8 0.1-1.6 0.1-2.4 0-17.7-14.4-32.1-32.2-32.1z"></path>
  </svg>
</span>

export const listenPropIcon = <span role="img" className="anticon">
  <svg width='0.9em' height="0.9em" fill="currentColor" viewBox="0 0 1254 1024">
    <path d="M1135.230625 547.617547a140.020149 140.020149 0 0 0-53.370909 12.557861l-5.023144-137.508577A448.315634 448.315634 0 0 0 604.033109 0.722705a448.315634 448.315634 0 0 0-439.525131 453.966671l5.023144 137.508577a140.020149 140.020149 0 0 0-53.998802-8.790503A106.113925 106.113925 0 0 0 0 681.986658l8.790503 251.157218a106.113925 106.113925 0 0 0 119.927571 89.788706A136.252791 136.252791 0 0 0 188.367913 1005.351577a30.766759 30.766759 0 0 0 26.371508 13.185754 31.394652 31.394652 0 0 0 30.138866-32.650439L225.413603 452.805697A385.52633 385.52633 0 0 1 606.544681 63.512009a385.52633 385.52633 0 0 1 407.502586 361.038501l18.836792 528.058051a31.394652 31.394652 0 0 0 53.998802 20.092577 135.624898 135.624898 0 0 0 62.789304 13.813647 106.113925 106.113925 0 0 0 113.020748-98.579208l-8.790503-251.157218a106.113925 106.113925 0 0 0-118.671785-89.160812zM125.578609 960.143277c-30.766759 0-54.626695-14.44154-54.626695-29.510973l-8.790503-251.157218c0-15.069433 21.976257-32.022545 52.743016-33.278331s53.370909 13.813647 54.626695 28.255187l8.790503 254.924576a53.998802 53.998802 0 0 1-52.743016 30.766759z m1074.325-69.696128c0 15.069433-21.976257 32.022545-52.743016 33.278332a53.998802 53.998802 0 0 1-53.998802-25.743615l-8.790503-255.552469c0-14.44154 22.60415-30.766759 52.743016-32.022546s54.626695 14.44154 54.626695 29.510973z" key="2184"></path><path d="M621.614114 487.967708a31.394652 31.394652 0 0 0-30.138866 32.650438l13.185754 362.92218a31.394652 31.394652 0 1 0 62.789305 0l-13.185754-362.92218a31.394652 31.394652 0 0 0-32.650439-32.650438zM836.981429 335.389698a31.394652 31.394652 0 0 0-30.138866 32.650438l18.208898 507.965473a31.394652 31.394652 0 1 0 62.789304 0l-18.208898-507.965473a31.394652 31.394652 0 0 0-32.650438-32.650438zM406.2468 641.173611a31.394652 31.394652 0 0 0-30.138866 32.650438l7.534716 217.878886a31.394652 31.394652 0 1 0 62.789305 0L439.525131 671.312477a31.394652 31.394652 0 0 0-33.278331-30.138866z" key="2185"></path>
  </svg>
</span>

export const puzzleIcon = <span role="img" className="anticon">
  <svg width='1em' height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M405.461333 0a192 192 0 0 0-192 192l0.298667 10.410667c0.938667 17.28 4.138667 34.133333 9.472 50.133333l1.237333 3.498667L64.042667 256A64 64 0 0 0 0.042667 320v206.378667a42.666667 42.666667 0 0 0 56.490666 40.362666l4.48-1.834666a106.666667 106.666667 0 1 1 8.618667 196.48l-8.618667-3.626667A42.666667 42.666667 0 0 0 0.042667 796.288V960A64 64 0 0 0 64.042667 1024h640l6.186666-0.298667A64 64 0 0 0 768.042667 960L768.042667 842.282667l3.498666 1.28A192 192 0 1 0 832.042667 469.333333l-10.410667 0.298667c-17.28 0.896-34.090667 4.138667-50.133333 9.472l-3.498667 1.237333L768.042667 320l-0.256-6.144A64 64 0 0 0 704.042667 256l-117.632 0.042667 1.28-3.498667A192 192 0 0 0 405.504 0z m0 85.333333a106.666667 106.666667 0 0 1 80.469334 176.682667l-9.130667 9.813333c-22.357333 27.093333-3.413333 69.546667 33.152 69.546667L682.709333 341.290667v215.552c0 38.229333 46.378667 57.173333 73.130667 29.866666a106.666667 106.666667 0 1 1 0 149.290667l-3.584-3.328c-27.093333-22.314667-69.546667-3.413333-69.546667 33.152V938.666667H85.376l-0.042667-86.528 10.666667 0.896A192 192 0 1 0 106.709333 469.333333l-10.794666 0.298667-10.624 0.853333L85.376 341.333333l215.637333 0.042667c36.565333 0 55.466667-42.453333 33.152-69.546667l-3.285333-3.584A106.666667 106.666667 0 0 1 405.504 85.333333z"></path>
  </svg>
</span>


export type ReactionableNode = {
  node: ITreeNode<unknown, IControllerMeta>,
  children?: ReactionableNode[]
}

export const ComponentTree = memo(() => {
  const module = useModule()
  const engine = useDesignerEngine()
  const docs = engine?.getAllDocuments()
  const getNode = useGetNode()
  console.log("===>ComponentTree", module, docs)

  const getReactionableSchemas = useCallback((node: ITreeNode<unknown, IControllerMeta>) => {
    const nodes: ReactionableNode[] = []
    let activeNodes = nodes
    if (node.meta["x-controller"]?.id) {
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
    return {
      key: rNode.node.id,
      icon: puzzleIcon,
      title: rNode.node.meta?.["x-controller"]?.name || rNode.node.title,
      children: [
        ...children || [],
        {
          key: rNode.node.id + "setprops",
          title: "设置属性",
          isLeaf: true,
          icon: setPropIcon,
        },
        {
          key: rNode.node.id + "listenprops",
          title: "监听属性",
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
    <TreeContainer>
      <DirectoryTree
        selectable={false}
        treeData={treeData}
      />
    </TreeContainer>
  )
})