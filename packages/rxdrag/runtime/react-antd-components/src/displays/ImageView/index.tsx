import { CSSProperties, forwardRef, memo } from "react"
import styled from "styled-components";

const ImageShell = styled.div`
  width: 100%;
  padding-bottom: 61.8%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 16px;
  position: relative;
  overflow: hidden;
`

const ImageMask = styled.div`
  position:absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  color: #ddd;
`
export type ImageViewProps = {
  emptyIconSize?: number,
  value?: string,
  style?: CSSProperties,
  height?: string,
}

export const ImageView = memo(forwardRef<HTMLDivElement, ImageViewProps>((props, ref) => {
  const { emptyIconSize = 120, value, style, height = '61.8%', ...other } = props;

  return (
    <ImageShell ref={ref} style={{ ...style, backgroundImage: `url(${value})`, paddingBottom: height }} {...other}>
      {
        !value &&
        <ImageMask>
          <svg style={{ width: emptyIconSize, height: emptyIconSize }} viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
          </svg>
        </ImageMask>
      }
    </ImageShell>
  )
}))