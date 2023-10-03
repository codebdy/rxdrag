import { memo } from "react"
import { IPreviewFrame } from "./IPreviewFrame"
import styled from "styled-components"
import { useCanvasConfig } from "@rxdrag/react-core"
import { usePreviewUrl } from "../../common"

const DocViewContainer = styled.div`
  position: relative;
  width: 800px;
  &.hidden{
    display: none;
  }
  background-color: white;
`
export const ZoomablePreview = memo((
  props: {
    display?: boolean,
  }
) => {
  const { display } = props;
  const canvasConfig = useCanvasConfig()
  const previewUrl = usePreviewUrl()

  return (
    <DocViewContainer
      className={display ? undefined : "hidden"}
      style={{
        width: canvasConfig?.screenWidth,
        height: (canvasConfig?.canvasHeight || 800),
      }}
    >
      <IPreviewFrame src={previewUrl} />
    </DocViewContainer>
  )
})