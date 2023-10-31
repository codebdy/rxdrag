import { memo } from "react"
import { PreviewIFrame } from "./PreviewIFrame"
import styled from "styled-components"
import { useCanvasConfig } from "@rxdrag/react-core"
import { usePreviewUrl } from "../../common"

const ViewContainer = styled.div`
  position: relative;
  width: 800px;
  &.hidden{
    display: none;
  }
  background-color: white;
`
export const ZoomablePreviewPanel = memo((
  props: {
    display?: boolean,
    params?: unknown,
  }
) => {
  const { display, params } = props;
  const canvasConfig = useCanvasConfig()
  const previewUrl = usePreviewUrl()

  return (
    <ViewContainer
      className={display ? undefined : "hidden"}
      style={{
        width: canvasConfig?.screenWidth,
        height: (canvasConfig?.canvasHeight || 800),
      }}
    >
      <PreviewIFrame src={previewUrl} params={params} />
    </ViewContainer>
  )
})