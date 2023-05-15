import { useCallback, useEffect } from "react";
import { ActionType } from "../../actions";
import { useDispatch } from "../useDispatch";
import { useGraph } from "../useGraph";
import { useBackup } from "./useBackup";
import { useMarkChange } from "./useMarkChange";
export function useEditEdge() {
    const dispatch = useDispatch();
    const graph = useGraph();
    const backup = useBackup();
    const markeChange = useMarkChange();
    const handleNodeAdd = useCallback(({ isNew, edge }) => {
        backup();
        const newData = {
            id: edge.id,
            source: {
                nodeId: edge.getSource().cell,
                portId: edge.getSource().port,
            },
            target: {
                nodeId: edge.getTarget().cell,
                portId: edge.getTarget().port,
            },
        };
        //graph?.select(edge.id)
        dispatch?.({
            type: isNew ? ActionType.ADD_EDGE : ActionType.CHANGE_EDGE,
            payload: newData
        });
        markeChange();
    }, [backup, dispatch, markeChange]);
    useEffect(() => {
        graph?.on('edge:connected', handleNodeAdd);
        return () => {
            graph?.off('edge:connected', handleNodeAdd);
        };
    }, [graph, handleNodeAdd]);
}
