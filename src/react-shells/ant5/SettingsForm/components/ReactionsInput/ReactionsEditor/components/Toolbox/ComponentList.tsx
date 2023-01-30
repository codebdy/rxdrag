import { Space, Typography } from "antd";
import { ITreeNode } from "core";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useGetNode } from "core-react/hooks/useGetNode";
import { memo, useCallback, useMemo } from "react"
import { IControllerMeta } from "runner/reaction/interfaces/metas";
import styled from "styled-components";
import { listenVariableIcon, methodIcon, setPropIcon, setVariableIcon } from "../../../../../../icons/reactions";
import { useTrans } from "../../hooks/useTrans";

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
export const ComponentList = memo((
  props: {
    currentController: IControllerMeta
  }
) => {
  const { currentController } = props;
  const currentNode = useCurrentNode()
  const getNode = useGetNode()
  const t = useTrans()

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

  const controllerNodes = useMemo(() => {
    if (currentNode) {
      const nodes: ITreeNode[] = []
      processNode(currentNode, nodes)

      return nodes.reverse()
    }

    return []
  }, [currentNode, processNode])

  return (
    <div>
      {
        controllerNodes.map((node, index) => {
          const controller: IControllerMeta = currentController.id === node.meta?.["x-reactions"]?.id ? currentController : node.meta?.["x-reactions"]
          return (
            <Container
              key={node.id}
            >
              <Typography.Text type="secondary" style={{ marginTop: index !== 0 ? 8 : 0 }}>
                {controller.name || node.title}
              </Typography.Text>
              <ReactionList>
                <Space direction="vertical">
                  <ItemTitle>{setPropIcon} {t("$setProp")}</ItemTitle>
                  {
                    !!controller.variables?.length &&
                    <>
                      <ItemTitle>{setVariableIcon} {t("$setVariable")}</ItemTitle>
                      <ItemTitle>{listenVariableIcon} {t("$listenVariable")}</ItemTitle>
                    </>
                  }
                  {
                    controller.reactions?.map(reaction => {
                      return (<ItemTitle key={reaction.id}>{methodIcon} {reaction.label}</ItemTitle>)
                    })
                  }
                </Space>
              </ReactionList>
            </Container>
          )
        })
      }
    </div>
  )
})