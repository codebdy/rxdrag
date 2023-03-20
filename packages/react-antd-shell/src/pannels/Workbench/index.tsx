import { ContainerImpl, DragDropDriver, CanvasResizeDriver, MouseMoveDriver, KeyboardDriver } from "@rxdrag/core"
import { useDesignerEngine, useShell } from "@rxdrag/react-core"
import { memo, useCallback, useEffect } from "react"
import { Box } from "../../components/Box"
import "./style.less"

export interface WorkbenchProps {
  children?: React.ReactNode
}

export const Workbench = memo((props: WorkbenchProps) => {
  const engine = useDesignerEngine()
  const shell = useShell()
  const handleRefChange = useCallback((el: HTMLDivElement) => {
    if (engine) {
      const container = new ContainerImpl(engine, el, "$$container$$", [
        DragDropDriver,
        CanvasResizeDriver,
        MouseMoveDriver,
        KeyboardDriver
      ])
      shell?.setContainer(container)
    }
  }, [engine, shell])

  useEffect(() => {
    return () => {
      shell?.destory()
    }
  }, [shell])
  return (
    <Box ref={handleRefChange} className="rx-workbench" {...props}>
    </Box>
  )
})