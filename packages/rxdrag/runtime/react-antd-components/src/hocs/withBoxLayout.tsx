import { ReactComponent } from "@rxdrag/react-shared";
import { memo, forwardRef, CSSProperties, useMemo } from "react";

export interface IBoxLayoutProps {
  p?: number,
  pl?: number,
  pt?: number,
  pr?: number,
  pb: number,

  m?: number,
  ml?: number,
  mt?: number,
  mr?: number,
  mb: number,
}

const step = 8

export function withBoxLayout(WrappedComponent: ReactComponent) {

  return memo(forwardRef<HTMLElement, IBoxLayoutProps & { style?: CSSProperties }>((props, ref) => {
    const { p, pl, pt, pr, pb, m, ml, mt, mr, mb, style, ...rest } = props

    const newStyles = useMemo(() => {
      return {
        ...style,
        padding: p !== undefined ? p * step : p ,
      }
    }, [p, style])

    return (
      <WrappedComponent ref={ref} style={newStyles} {...rest} />
    )
  }))
}