/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTrans } from "@rxdrag/logicflow-editor-antd5";
import { useAllControllers, useController } from "@rxdrag/minions-controller-editor";
import { useGraph, useDnd, useGetNodeConfig } from "@rxdrag/minions-logicflow-editor";
import { setPropMaterial, setVariableMaterial, listenVariableMaterial, readVariableMaterial, reactionMaterial } from "@rxdrag/minions-react-materials";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { IActivityMaterial, IActivityDefine, ILogicFlowDefinition } from "@rxdrag/minions-schema";
import { listenVariableIcon, methodIcon, setPropIcon, setVariableIcon, variableIcon } from "@rxdrag/react-shared";
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
  const startDefaultDragFn = useCallback((marterial: IActivityMaterial, controllerId: string | undefined, reactionName: string) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeMeta: IActivityDefine = {
        id: createUuid(),
        label: t(marterial.label),
        type: marterial.activityType,
        activityName: marterial.activityName,
        ...marterial.defaultPorts,
        config: {
          controllerId,
          reactionRef: reactionName,
        }
      }
      const node = graph.createNode(getNodeConfig(nodeMeta));
      dnd?.start(node, e.nativeEvent as any);
    };
  }, [dnd, getNodeConfig, graph, t])

  const startDragFn = useCallback((reaction: ILogicFlowDefinition, marterial: IActivityMaterial, controllerId: string | undefined) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeMeta: IActivityDefine = {
        id: createUuid(),
        label: reaction.label || reaction.name,
        type: marterial.activityType,
        activityName: marterial.activityName,
        ...marterial.defaultPorts,
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
    <>
      {
        controllers.map((ctrl, index) => {
          const controller: IControllerMeta = currentController?.id === ctrl.id ? currentController : ctrl
          return (
            <Container
              key={ctrl.id}
            >
              <Typography.Text type="secondary" style={{ marginTop: index !== 0 ? 8 : 0 }}>
                {controller.name}
              </Typography.Text>
              <ReactionList>
                <Space direction="vertical">
                  <ItemTitle onMouseDown={startDefaultDragFn(setPropMaterial, controller.id, setPropMaterial.activityName)}>{setPropIcon} {t("$setProp")}</ItemTitle>
                  {
                    !!controller.variables?.length &&
                    <>
                      <ItemTitle onMouseDown={startDefaultDragFn(setVariableMaterial, controller.id, setVariableMaterial.activityName)}>{setVariableIcon} {t("$setVariable")}</ItemTitle>
                      <ItemTitle onMouseDown={startDefaultDragFn(listenVariableMaterial, controller.id, setVariableMaterial.activityName)}>{listenVariableIcon} {t("$listenVariable")}</ItemTitle>
                      <ItemTitle onMouseDown={startDefaultDragFn(readVariableMaterial, controller.id, setVariableMaterial.activityName)}>{variableIcon} {t("$readVariable")}</ItemTitle>
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
    </>
  )
})