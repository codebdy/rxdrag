import { DownOutlined } from "@ant-design/icons";
import { Space, Tree, Typography } from "antd";
import { DataNode } from "antd/es/tree";
import { ITreeNode } from "core";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useGetNode } from "core-react/hooks/useGetNode";
import { memo, useCallback, useMemo } from "react"
import { IControllerMeta } from "runner/reaction/interfaces/metas";
import styled from "styled-components";
import { methodIcon } from "../../../../../../icons/reactions";

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

const ReactionList = styled.div`
  display: flex;
  flex-flow: column;
  padding: 8px 16px 0 16px;
`

const ItemTitle = styled.div`
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  padding: 4px 8px; 
  border-radius: 4px;
  cursor: move;
`
export const ComponentList = memo(() => {
  const currentNode = useCurrentNode()
  const getNode = useGetNode()

  const processNode = useCallback((node: ITreeNode, nodes: ITreeNode[]) => {
    if (node.meta?.["x-reactions"]?.id) {
      nodes.push(node)
    }
    if (node.parentId) {
      const parent = getNode(node.parentId)
      if (parent) {
        processNode(parent, nodes)
      }
    }
  }, [getNode])

  const transNode = useCallback((node: ITreeNode): DataNode => {
    const controller: IControllerMeta = node.meta?.["x-reactions"]
    const data: DataNode = {
      title: controller.name || node.title,
      key: controller.id!,
      children: [
        {
          title: <ItemTitle> {methodIcon} 设置属性</ItemTitle>,
          key: controller.id + 'setProp',
        },
        {
          title: <ItemTitle>{methodIcon} 设置变量</ItemTitle>,
          key: controller.id + 'setVariable',
        },
        {
          title: <ItemTitle>{methodIcon} 读取变量</ItemTitle>,
          key: controller.id + 'readVariable',
        },
      ]
    }
    return data
  }, [])

  const controllerNodes = useMemo(() => {
    if (currentNode) {
      const nodes: ITreeNode[] = []
      processNode(currentNode, nodes)

      return nodes.reverse()
    }

    return []
  }, [currentNode, processNode])

  const treeItems: DataNode[] = useMemo(() => {

    if (currentNode) {
      const nodes: ITreeNode[] = []
      processNode(currentNode, nodes)

      return nodes.reverse().map((node) => transNode(node))
    }

    return []

  }, [currentNode, processNode, transNode])


  return (
    <div>
      {
        controllerNodes.map(node => {
          const controller: IControllerMeta = node.meta?.["x-reactions"]
          return (
            <Container
              key={node.id}
            >
              <Typography.Text type="secondary">
                {controller.name || node.title}
              </Typography.Text>
              <ReactionList>
                <Space direction ="vertical">
                  <ItemTitle>{methodIcon} 设置属性</ItemTitle>
                  <ItemTitle>{methodIcon} 设置变量</ItemTitle>
                  <ItemTitle>{methodIcon} 读取变量</ItemTitle>
                </Space>
              </ReactionList>
            </Container>
          )
        })
      }
    </div>
  )
})