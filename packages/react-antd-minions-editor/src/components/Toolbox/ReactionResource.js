import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { memo, useCallback } from "react";
import { useGraph, useDnd, useTrans, useGetNodeConfig } from "../../hooks";
import { createUuid } from "@rxdrag/shared";
export const ReactionResource = memo((props) => {
    const { children, material } = props;
    const t = useTrans();
    const graph = useGraph();
    const dnd = useDnd();
    const getNodeConfig = useGetNodeConfig();
    const handleDrag = useCallback((e) => {
        if (!graph) {
            return;
        }
        const nodeMeta = {
            id: createUuid(),
            label: t(material.label),
            type: material.reactionType,
            materialName: material.name,
            ...material.meta
        };
        const node = graph.createNode(getNodeConfig(nodeMeta));
        dnd?.start(node, e.nativeEvent);
    }, [dnd, getNodeConfig, graph, t]);
    return _jsx(_Fragment, { children: children?.(handleDrag) });
});
