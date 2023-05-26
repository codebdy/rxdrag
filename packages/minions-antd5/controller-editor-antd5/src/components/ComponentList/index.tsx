/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTrans } from "@rxdrag/logicflow-editor-antd5";
import { useAllControllerMetas } from "@rxdrag/minions-controller-editor";
import { useGraph, useDnd, useGetNodeConfig } from "@rxdrag/minions-logicflow-editor";
import { setPropMaterial, setVariableMaterial, listenVariableMaterial, readVariableMaterial, reactionMaterial } from "@rxdrag/minions-react-materials";
import { IReactionConfig } from "@rxdrag/minions-runtime-react";
import { IActivityMaterial, IActivityDefine, ILogicFlowDefinition } from "@rxdrag/minions-schema";
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
  const controllerMetas = useAllControllerMetas()

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
      const nodeMeta: IActivityDefine<IReactionConfig> = {
        id: createUuid(),
        label: reaction.label || reaction.name,
        type: marterial.activityType,
        activityName: marterial.activityName,
        ...marterial.defaultPorts,
        config: {
          controllerId,
          logicFlowId: reaction.id,
        }
      }
      const node = graph.createNode(getNodeConfig(nodeMeta));
      dnd?.start(node, e.nativeEvent as any);
    };
  }, [dnd, getNodeConfig, graph])

  return (
    <>
      {
        controllerMetas.map((controllerMeta, index) => {
          return (
            <Container
              key={controllerMeta.id}
            >
              <Typography.Text type="secondary" style={{ marginTop: index !== 0 ? 8 : 0 }}>
                {controllerMeta.name || controllerMeta.id}
              </Typography.Text>
              <ReactionList>
                <Space direction="vertical">
                  <ItemTitle
                    onMouseDown={startDefaultDragFn(setPropMaterial, controllerMeta.id, setPropMaterial.activityName)}>{setPropMaterial.icon} {t("$setProp")}
                  </ItemTitle>
                  {
                    !!controllerMeta.variables?.length &&
                    <>
                      <ItemTitle onMouseDown={startDefaultDragFn(setVariableMaterial, controllerMeta.id, setVariableMaterial.activityName)}>{setVariableMaterial.icon} {t("$setVariable")}</ItemTitle>
                      <ItemTitle onMouseDown={startDefaultDragFn(listenVariableMaterial, controllerMeta.id, setVariableMaterial.activityName)}>{listenVariableMaterial.icon} {t("$listenVariable")}</ItemTitle>
                      <ItemTitle onMouseDown={startDefaultDragFn(readVariableMaterial, controllerMeta.id, setVariableMaterial.activityName)}>{readVariableMaterial.icon} {t("$readVariable")}</ItemTitle>
                    </>
                  }
                  {
                    controllerMeta.reactions?.map(reaction => {
                      return (<ItemTitle key={reaction.id} onMouseDown={startDragFn(reaction, reactionMaterial, controllerMeta.id)}>{reactionMaterial.icon} {reaction.label}</ItemTitle>)
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