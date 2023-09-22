import { memo } from "react"
import { PaneContainer } from "../../layouts/ToggleAblePane/PaneContainer";
import { PanelContent } from "../../layouts/ToggleAblePane/PanelContent";
import { PaneTitle } from "../../layouts/ToggleAblePane/PaneTitle";
import { OperationHistory } from "../../../common";

export const HistoryWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props

  return (
    <PaneContainer style={{ display: display ? undefined : "none" }}>
      <PaneTitle title="history" />
      <PanelContent>
        <OperationHistory />
      </PanelContent>
    </PaneContainer>
  )
})