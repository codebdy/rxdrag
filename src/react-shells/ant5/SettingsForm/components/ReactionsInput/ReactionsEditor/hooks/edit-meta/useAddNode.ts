import { Cell } from "@antv/x6";
import { useCallback, useEffect } from "react";
import { useEditorState } from "../useEditorState";

export function useAddNode() {
  const { graph, dispatch } = useEditorState()
  const handleNodeAdd = useCallback((args: { cell: Cell, index: number, options: any }) => {

  }, [])

  useEffect(() => {
    graph?.on('node:added', handleNodeAdd)

    return () => {
      graph?.off('node:added', handleNodeAdd)
    }
  }, [graph, handleNodeAdd])
}