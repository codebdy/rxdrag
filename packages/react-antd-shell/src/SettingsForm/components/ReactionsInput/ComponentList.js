import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTrans, useGraph, useDnd, useGetNodeConfig, useController, useAllControllers } from "@rxdrag/react-antd-minions-editor";
import { activityMaterial } from "@rxdrag/react-minions-materials/src/controller/reaction";
import { setPropMaterial } from "@rxdrag/react-minions-materials/src/controller/setProp";
import { setVariableMaterial, listenVariableMaterial, readVariableMaterial } from "@rxdrag/react-minions-materials/src/controller/variable";
import { listenVariableIcon, methodIcon, setPropIcon, setVariableIcon, variableIcon } from "@rxdrag/react-shared";
import { createUuid } from "@rxdrag/shared";
import { Space, Typography } from "antd";
import { memo, useCallback } from "react";
import styled from "styled-components";
const Container = styled.div `
  display: flex;
  flex-flow: column;
`;
const ReactionList = styled.div `
  display: flex;
  flex-flow: column;
  padding: 8px 16px 0 16px;
`;
const ItemTitle = styled.div `
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  padding: 4px 8px; 
  border-radius: 4px;
  cursor: move;
`;
export const ComponentList = memo(() => {
    const t = useTrans();
    const graph = useGraph();
    const dnd = useDnd();
    const getNodeConfig = useGetNodeConfig();
    const currentController = useController();
    const startDefaultDragFn = useCallback((marterial, controllerId, reactionName) => {
        return (e) => {
            if (!graph) {
                return;
            }
            const nodeMeta = {
                id: createUuid(),
                label: t(marterial.label),
                type: marterial.reactionType,
                materialName: marterial.name,
                ...marterial.meta,
                config: {
                    controllerId,
                    reactionRef: reactionName,
                }
            };
            const node = graph.createNode(getNodeConfig(nodeMeta));
            dnd?.start(node, e.nativeEvent);
        };
    }, [dnd, getNodeConfig, graph, t]);
    const startDragFn = useCallback((reaction, marterial, controllerId) => {
        return (e) => {
            if (!graph) {
                return;
            }
            const nodeMeta = {
                id: createUuid(),
                label: reaction.label || reaction.name,
                type: marterial.reactionType,
                materialName: marterial.name,
                ...marterial.meta,
                config: {
                    controllerId,
                    reactionRef: reaction.id,
                }
            };
            const node = graph.createNode(getNodeConfig(nodeMeta));
            dnd?.start(node, e.nativeEvent);
        };
    }, [dnd, getNodeConfig, graph]);
    const controllers = useAllControllers();
    return (_jsx(_Fragment, { children: controllers.map((ctrl, index) => {
            const controller = currentController?.id === ctrl.id ? currentController : ctrl;
            return (_jsxs(Container, { children: [_jsx(Typography.Text, { type: "secondary", style: { marginTop: index !== 0 ? 8 : 0 }, children: controller.name }), _jsx(ReactionList, { children: _jsxs(Space, { direction: "vertical", children: [_jsxs(ItemTitle, { onMouseDown: startDefaultDragFn(setPropMaterial, controller.id, setPropMaterial.name), children: [setPropIcon, " ", t("$setProp")] }), !!controller.variables?.length &&
                                    _jsxs(_Fragment, { children: [_jsxs(ItemTitle, { onMouseDown: startDefaultDragFn(setVariableMaterial, controller.id, setVariableMaterial.name), children: [setVariableIcon, " ", t("$setVariable")] }), _jsxs(ItemTitle, { onMouseDown: startDefaultDragFn(listenVariableMaterial, controller.id, setVariableMaterial.name), children: [listenVariableIcon, " ", t("$listenVariable")] }), _jsxs(ItemTitle, { onMouseDown: startDefaultDragFn(readVariableMaterial, controller.id, setVariableMaterial.name), children: [variableIcon, " ", t("$readVariable")] })] }), controller.reactions?.map(reaction => {
                                    return (_jsxs(ItemTitle, { onMouseDown: startDragFn(reaction, activityMaterial, controller.id), children: [methodIcon, " ", reaction.label] }, reaction.id));
                                })] }) })] }, ctrl.id));
        }) }));
});
