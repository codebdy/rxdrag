import { useSelected, useRemoveSelected } from "@rxdrag/minions-logicflow-editor"
import { memo } from "react"
import { ToolbarButton } from "./FlowUdredoButtons"

export const FlowRemoveButton = memo(() => {
  const { selected } = useSelected()

  const handleRemove = useRemoveSelected()
  
  return (
    <ToolbarButton
      disabled={!selected}
      icon={<span role="img" className="anticon"><svg width="1rem" height="1rem" viewBox="0 0 24 24">
        <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
      </svg></span>}
      onClick={handleRemove}
    ></ToolbarButton>
  )
})