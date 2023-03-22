import { useTrans, useGraph, useDnd, useGetNodeConfig, useController, useAllControllers } from "@rxdrag/react-antd-minions-editor";
import { reactionMaterial } from "@rxdrag/react-minions-materials/src/controller/reaction";
import { setPropMaterial } from "@rxdrag/react-minions-materials/src/controller/setProp";
import { setVariableMaterial, listenVariableMaterial, readVariableMaterial } from "@rxdrag/react-minions-materials/src/controller/variable";
import { listenVariableIcon, methodIcon, setPropIcon, setVariableIcon, variableIcon } from "@rxdrag/react-shared";
import { IControllerMeta, IReactionDefineMeta, IReactionMaterial, IReactionMeta } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { Space, Typography } from "antd";
import React from "react";
import { memo, useCallback } from "react"
import styled from "styled-components";


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

) => {
  const t = useTrans()
  const graph = useGraph()
  const dnd = useDnd()
  const getNodeConfig = useGetNodeConfig()
  const currentController = useController()
  const startDefaultDragFn = useCallback((marterial: IReactionMaterial, controllerId: string | undefined, reactionName: string) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeMeta: IReactionMeta = {
        id: createUuid(),
        label: t(marterial.label),
        type: marterial.reactionType,
        materialName: marterial.name,
        ...marterial.meta,
        config: {
          controllerId,
          reactionRef: reactionName,
        }
      }
      const node = graph.createNode(getNodeConfig(nodeMeta));
      dnd?.start(node, e.nativeEvent as any);
    };
  }, [dnd, getNodeConfig, graph, t])

  const startDragFn = useCallback((reaction: IReactionDefineMeta, marterial: IReactionMaterial, controllerId: string | undefined) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeMeta: IReactionMeta = {
        id: createUuid(),
        label: reaction.label || reaction.name,
        type: marterial.reactionType,
        materialName: marterial.name,
        ...marterial.meta,
        config: {
          controllerId,
          reactionRef: reaction.id,
        }
      }
      const node = graph.createNode(getNodeConfig(nodeMeta));
      dnd?.start(node, e.nativeEvent as any);
    };
  }, [dnd, getNodeConfig, graph])

  const controllers = useAllControllers()

  return (
    <div>
      {
        controllers.map((ctrl, index) => {
          const controller: IControllerMeta = currentController?.id === ctrl.id ? currentController : ctrl
          return (
            <Container
              key={ctrl.id}
            >
              <Typography.Text type="secondary" style={{ marginTop: index !== 0 ? 8 : 0 }}>
                {controller.name || "unnamed"}
              </Typography.Text>
              <ReactionList>
                <Space direction="vertical">
                  <ItemTitle onMouseDown={startDefaultDragFn(setPropMaterial, controller.id, setPropMaterial.name)}>{setPropIcon} {t("$setProp")}</ItemTitle>
                  {
                    !!controller.variables?.length &&
                    <>
                      <ItemTitle onMouseDown={startDefaultDragFn(setVariableMaterial, controller.id, setVariableMaterial.name)}>{setVariableIcon} {t("$setVariable")}</ItemTitle>
                      <ItemTitle onMouseDown={startDefaultDragFn(listenVariableMaterial, controller.id, setVariableMaterial.name)}>{listenVariableIcon} {t("$listenVariable")}</ItemTitle>
                      <ItemTitle onMouseDown={startDefaultDragFn(readVariableMaterial, controller.id, setVariableMaterial.name)}>{variableIcon} {t("$readVariable")}</ItemTitle>
                    </>
                  }
                  {
                    controller.reactions?.map(reaction => {
                      return (<ItemTitle key={reaction.id} onMouseDown={startDragFn(reaction, reactionMaterial, controller.id)}>{methodIcon} {reaction.label}</ItemTitle>)
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