import { memo } from "react"
import { PaneContainer } from "react-shells/ant5/layouts/ToggleAblePane/PaneContainer"
import { PanelContent } from "react-shells/ant5/layouts/ToggleAblePane/PanelContent"
import { PaneTitle } from "react-shells/ant5/layouts/ToggleAblePane/PaneTitle"

export const PagesWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props


  return (
    <PaneContainer style={{ display: display ? undefined : "none" }}>
      <PaneTitle title="pages" />
      <PanelContent style={{ paddingTop: 8 }}>
        哈哈
      </PanelContent>
    </PaneContainer>
  )
})