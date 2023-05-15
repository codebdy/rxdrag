import { useCallback, useEffect } from "react";
import { ActionType } from "../../actions";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";
import { useDispatch } from "../useDispatch";
import { useGraph } from "../useGraph";
export function useMovedNode() {
    const dispatch = useDispatch();
    const graph = useGraph();
    const backup = useBackup();
    const markeChange = useMarkChange();
    const handleNodeMoved = useCallback(({ x, y, node }) => {
        backup();
        const { meta } = node.getData();
        dispatch?.({
            type: ActionType.CHANGE_NODE,
            payload: {
                ...meta,
                id: node.id,
                x6Node: {
                    x: node.getPosition().x,
                    y: node.getPosition().y,
                    width: node.getSize().width,
                    height: node.getSize().height,
                }
            }
        });
        graph?.select(node.id);
        markeChange();
    }, [backup, dispatch, graph, markeChange]);
    useEffect(() => {
        graph?.on('node:moved', handleNodeMoved);
        return () => {
            graph?.off('node:moved', handleNodeMoved);
        };
    }, [graph, handleNodeMoved]);
}
