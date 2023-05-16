import { useGetNode, useCurrentNode, useTreeNode } from "@rxdrag/react-core";
import { useCallback, useMemo } from "react";
export function useControllerMetas() {
    const getNode = useGetNode();
    const currentNode = useCurrentNode();
    const latestNode = useTreeNode(currentNode?.id || "");
    const processNode = useCallback((node, nodes) => {
        if (node.meta?.["x-controller"]?.enable) {
            nodes.push(node);
        }
        if (node.parentId) {
            const parent = getNode(node.parentId);
            if (parent) {
                processNode(parent, nodes);
            }
        }
    }, [getNode]);
    const controllerNodes = useMemo(() => {
        if (latestNode) {
            const nodes = [];
            processNode(latestNode, nodes);
            return nodes.reverse().map(node => ({ ...node.meta?.["x-controller"] || {}, name: node.meta?.["x-controller"]?.name || node.title }));
        }
        return [];
    }, [latestNode, processNode]);
    return controllerNodes;
}
