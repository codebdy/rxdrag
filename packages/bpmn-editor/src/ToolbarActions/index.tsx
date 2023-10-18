import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { AimOutlined, RedoOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { ID } from "shared";
import { Button, Divider } from "antd";

export const ToolbarActions = memo((
  props: {
    bpmnModeler?: any,
    selectedProcessId?: ID,
  }
) => {
  const { bpmnModeler, selectedProcessId } = props;
  const [undoDisabled, setUndoDisabled] = useState(true);
  const [redoDisabled, setRedoDisabled] = useState(true);

  const handleCommandStackChanged = useCallback((e: any) => {
    const cammandStack = bpmnModeler?.get('commandStack');
    setUndoDisabled(!cammandStack.canUndo());
    setRedoDisabled(!cammandStack.canRedo());
  }, [bpmnModeler])

  useEffect(() => {
    setRedoDisabled(true);
    setUndoDisabled(true);
    bpmnModeler?.on('commandStack.changed', handleCommandStackChanged);
    return () => {
      bpmnModeler?.off('commandStack.changed', handleCommandStackChanged)
    }
  }, [bpmnModeler, handleCommandStackChanged])

  const handleUndo = useCallback(() => {
    bpmnModeler?.get('commandStack').undo()
  }, [bpmnModeler])

  const handleRedo = useCallback(() => {
    bpmnModeler?.get('commandStack').redo()
  }, [bpmnModeler])

  const handleFit = useCallback(() => {
    bpmnModeler?.get('canvas').zoom('fit-viewport');
  }, [bpmnModeler])

  const handleZoomOut = useCallback(() => {
    bpmnModeler?.get('zoomScroll').stepZoom(-1);
  }, [bpmnModeler])


  const handleZoomIn = useCallback(() => {
    bpmnModeler?.get('zoomScroll').stepZoom(1);
  }, [bpmnModeler])


  return (
    <>
      <Button
        type="text"
        shape="circle"
        size="large"
        disabled={!selectedProcessId}
        onClick={handleFit}
      >
        <AimOutlined />
      </Button>
      <Button
        type="text"
        shape="circle"
        size="large"
        disabled={!selectedProcessId}
        onClick={handleZoomOut}
      >
        <ZoomOutOutlined />
      </Button>
      <Button
        type="text"
        shape="circle"
        size="large"
        disabled={!selectedProcessId}
        onClick={handleZoomIn}
      >
        <ZoomInOutlined />
      </Button>
      <Divider type="vertical" />
      <Button
        disabled={!selectedProcessId || undoDisabled}
        type="text"
        shape="circle"
        onClick={handleUndo}
        size="large"
      >
        <UndoOutlined />
      </Button>
      <Button
        //disabled={redoList.length === 0}
        disabled={!selectedProcessId || redoDisabled}
        type="text"
        shape="circle"
        onClick={handleRedo}
        size="large"
      >
        <RedoOutlined />
      </Button>
    </>
  )
})