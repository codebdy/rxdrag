import { useThemeMode } from "core-react/hooks/useThemeMode"
import { memo, useCallback, useEffect, useState } from "react"
import "./style.less"
import cls from "classnames"
import { AUX_BACKGROUND_COLOR } from "core/auxwidgets/consts"

export enum PositionType {
  Left = "left",
  Right = "right"
}

export const CanvaseHandler = memo((
  props: {
    position?: PositionType,
    onDistanceChange: (increase: number, totalDistance: number) => void,
    onDragBegin?: () => void,
    onDragStop?: () => void,
  }
) => {
  const { position = PositionType.Right, onDistanceChange, onDragBegin, onDragStop } = props
  const [dragging, setDragging] = useState(false);
  const [firstX, setFirstX] = useState(0);
  const [lastX, setLastX] = useState(0);
  const themeMode = useThemeMode()
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (dragging) {
        onDistanceChange(lastX - event.screenX, firstX - event.screenX)
        setLastX(event.screenX)
      }
    },
    [dragging, firstX, lastX, onDistanceChange]
  );

  const handleMouseup = useCallback(() => {
    document.body.classList.remove("canvas-resizing");
    setDragging(false)
    onDragStop?.()
  }, [onDragStop]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      document.body.classList.add("canvas-resizing");
      setDragging(true)
      setFirstX(event.screenX);
      setLastX(event.screenX);

      onDragBegin?.()
    },
    [onDragBegin]
  );

  useEffect(()=>{
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseup);
    return ()=>{
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseup);
    }
  }, [handleMouseMove, handleMouseup])

  return (
    <div className={cls("rx-canvas-handler", position)}
      onMouseDown={handleMouseDown}
    >
      <div
        className={cls("colored-handler", themeMode)}
        style={{ backgroundColor: dragging ? AUX_BACKGROUND_COLOR : undefined }}
      ></div>
    </div>
  )
})