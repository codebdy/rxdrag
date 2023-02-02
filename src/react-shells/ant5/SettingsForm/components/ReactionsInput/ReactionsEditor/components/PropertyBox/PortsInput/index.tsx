import { memo } from "react";
import { IPortMeta } from "runner/reaction/interfaces/metas";

export const PortsInput = memo((
  props: {
    value?: IPortMeta[],
    onChange?: (value?: IPortMeta[]) => void
  }
) => {
  const { value, onChange } = props
  return (<>
    哈哈
  </>)
})