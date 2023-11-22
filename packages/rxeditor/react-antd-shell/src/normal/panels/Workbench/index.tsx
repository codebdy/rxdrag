import { ContainerImpl, DragDropDriver, CanvasResizeDriver, MouseMoveDriver, KeyboardDriver } from "@rxdrag/core"
import { useDesignerEngine } from "@rxdrag/react-core"
import { memo, useCallback } from "react"
import styled from "styled-components"

const WorkbenchRoot = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  height: 0;
`

export interface WorkbenchProps {
  children?: React.ReactNode
}

export const Workbench = memo((props: WorkbenchProps) => {
  const engine = useDesignerEngine()
  const handleRefChange = useCallback((el: HTMLDivElement) => {
    if (engine) {
      //删掉旧的
      engine.getShell().getContainer()?.destroy()
      const container = new ContainerImpl(engine, el, "$$container$$", [
        DragDropDriver,
        CanvasResizeDriver,
        MouseMoveDriver,
        KeyboardDriver
      ])
      engine.getShell()?.setContainer(container)
    }
  }, [engine])

  return (
    <WorkbenchRoot ref={handleRefChange} className="rx-workbench" {...props} />
  )
})