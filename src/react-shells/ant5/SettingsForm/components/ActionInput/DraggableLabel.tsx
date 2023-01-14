import React, { CSSProperties, useCallback, useState } from "react"
import { HolderOutlined } from "@ant-design/icons"
import clx from "classnames";

const DraggableLabel = React.forwardRef((
  props: {
    uuid?: string,
    title: string,
    float?: boolean,
    style?: CSSProperties,
    fixed?: boolean,
    className?: string,
    onSelect?: (uuid?: string) => void,
  },
  ref: any
) => {
  const { uuid, title, float, style, className, fixed, onSelect, ...other } = props;
  const [hover, setHover] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleClick = useCallback(() => {
    onSelect && onSelect(uuid)
  }, [onSelect, uuid])

  return (
    <div ref={ref} className={clx("draggable-label", className)} {...other}
      style={{
        ...style,
        boxShadow: float || (hover && !fixed) ? "2px 2px 10px 1px rgb(25 42 70 / 11%)" : undefined,
        pointerEvents: float ? "none" : undefined,
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="draggable-icon">
        <HolderOutlined />
      </div>
      {
        title
      }
    </div>
  )
})

export default DraggableLabel