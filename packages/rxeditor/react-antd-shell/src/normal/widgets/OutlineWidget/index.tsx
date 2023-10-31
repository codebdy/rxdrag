import { memo } from "react";
import { PaneContainer } from "../../layouts/ToggleAblePane/PaneContainer";
import { PanelContent } from "../../layouts/ToggleAblePane/PanelContent";
import { PaneTitle } from "../../layouts/ToggleAblePane/PaneTitle";
import { OutlineTree } from "../../../common";

export const OutlineWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props

  return (
    <PaneContainer style={{ display: display ? undefined : "none" }}>
      <PaneTitle title="outline" />
      <PanelContent style={{ paddingTop: 8 }}>
        <OutlineTree />
      </PanelContent>
    </PaneContainer>
  )
})