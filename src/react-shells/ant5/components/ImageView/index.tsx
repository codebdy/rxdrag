import { CSSProperties, memo } from "react"
import styled from "styled-components";

export interface IImageProps {
  empertyIconSize?: number,
  value?: string,
  style?: CSSProperties,
  height?: string,
}

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

export const ImageView = memo((props: IImageProps) => {
  const { empertyIconSize = 120, value, style, height = '61.8%', ...other } = props;
  return (
    <ImageShell style={{ ...style, backgroundImage: `url(${value})`, paddingBottom: height }} {...other}>
      {
        !value &&
        <ImageMask>
          <svg style={{ width: empertyIconSize, height: empertyIconSize }} viewBox="0 0 24 24">
            <path fill="currentColor" d="M23 11.5L19.95 10.37C19.69 9.22 19.04 8.56 19.04 8.56C17.4 6.92 14.75 6.92 13.11 8.56L11.63 10.04L5 3C4 7 5 11 7.45 14.22L2 19.5C2 19.5 10.89 21.5 16.07 17.45C18.83 15.29 19.45 14.03 19.84 12.7L23 11.5M17.71 11.72C17.32 12.11 16.68 12.11 16.29 11.72C15.9 11.33 15.9 10.7 16.29 10.31C16.68 9.92 17.32 9.92 17.71 10.31C18.1 10.7 18.1 11.33 17.71 11.72Z" />
          </svg>
        </ImageMask>
      }
    </ImageShell>
  )
})