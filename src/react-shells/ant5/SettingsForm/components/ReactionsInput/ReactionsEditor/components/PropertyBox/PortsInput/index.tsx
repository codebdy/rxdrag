import { Button, Popover } from "antd";
import { memo, useCallback, useState } from "react";
import { IPortMeta } from "runner/minions/interfaces/metas";
import { PortsTable } from "./PortsTable";

export const PortsInput = memo((
  props: {
    title: string,
    popoverTitle: string,
    value?: IPortMeta[],
    onChange?: (value?: IPortMeta[]) => void,
    type: "input" | "output",
  }
) => {
  const { title, popoverTitle, value, onChange, type } = props
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);
  return (
    <Popover
      content={
        <PortsTable type={type} onClose={handleClose} value={value} onChange={onChange} />
      }
      title={popoverTitle}
      open={open}
      placement="bottomRight"
      trigger="click"
      onOpenChange={handleOpenChange}
    >
      <Button>{title}</Button>
    </Popover>

  )
})