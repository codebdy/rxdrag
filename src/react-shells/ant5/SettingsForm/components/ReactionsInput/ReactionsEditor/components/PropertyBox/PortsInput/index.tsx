import { Button, Popover } from "antd";
import { memo, useCallback, useState } from "react";
import { IPortMeta } from "runner/reaction/interfaces/metas";
import { PortsTable } from "./PortsTable";

export const PortsInput = memo((
  props: {
    value?: IPortMeta[],
    onChange?: (value?: IPortMeta[]) => void
  }
) => {
  const { value, onChange } = props
  const [open, setOpen] = useState(false);

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);
  return (
    <Popover
      content={
        <PortsTable onClose={hide} />
      }
      title="输入桩"
      placement="bottomRight"
      trigger="click"
      onOpenChange={handleOpenChange}
    >
      <Button>配置桩</Button>
    </Popover>

  )
})