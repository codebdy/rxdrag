import { useCallback, useEffect } from "react";
import { useGraph } from "./useGraph";
import { useSelected } from "./useSelected";
export function useSelection() {
    const graph = useGraph();
    const { setSelected } = useSelected();
    const handleSelected = useCallback(({ cell }) => {
        if (!graph?.getCellById(cell.id)) {
            graph?.cleanSelection();
            setSelected(undefined);
        }
        else {
            setSelected(cell.id);
        }
    }, [graph, setSelected]);
    const handleUnSelected = useCallback(({ cell }) => {
        setSelected(undefined);
    }, [setSelected]);
    useEffect(() => {
        graph?.on("cell:selected", handleSelected);
        graph?.on("cell:unselected", handleUnSelected);
        return () => {
            graph?.off("cell:selected", handleSelected);
            graph?.off("cell:unselected", handleUnSelected);
        };
    }, [graph, handleSelected, handleUnSelected]);
}
