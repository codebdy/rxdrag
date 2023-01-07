import { Modal } from "antd";
import { useCurrentNode } from "core-react/hooks/useCurrentNode";
import { useNode } from "core-react/hooks/useNode";
import { CSSProperties, forwardRef, memo, useCallback, useRef, useState } from "react"
import { PopupButton } from "../../PopupButton";

export type DialogProps = {
  title?: React.ReactNode,
  style?: CSSProperties,
  actionComponent?: React.ReactElement,
}

export const DialogDesigner = memo(forwardRef<HTMLDivElement>((props: DialogProps, ref) => {
  const { title, actionComponent, style, ...other } = props
  const [visible, setVisiable] = useState(false);
  const [hover, setHover] = useState(false);
  const node = useNode()
  const currentNode = useCurrentNode();
  const realRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleShow = useCallback(() => {
    setVisiable(true);
  }, [])

  const handleRefChange = useCallback((node: HTMLDivElement | null) => {
    realRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref])
  
  return (
    <div
      ref={handleRefChange}
      style={{ display: "inline-block", position: "relative", ...style }}
      {...other}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {actionComponent}
      {
        (hover || currentNode?.id === node?.id) && !visible && <PopupButton onClick={handleShow} />
      }
      <Modal
        title="Basic Modal"
        open={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}))