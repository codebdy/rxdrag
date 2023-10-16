import { ReactComponent } from "@rxdrag/react-shared";
import { memo, forwardRef, CSSProperties, useMemo } from "react";

export interface IBoxLayoutProps {
  p?: number,
  pl?: number,
  pt?: number,
  pr?: number,
  pb?: number,

  m?: number,
  ml?: number,
  mt?: number,
  mr?: number,
  mb?: number,
}

const step = 8

export function withBoxLayout(WrappedComponent: ReactComponent) {

  return memo(forwardRef<HTMLElement, IBoxLayoutProps & { style?: CSSProperties, children?: React.ReactNode }>((props, ref) => {
    const { p, pl, pt, pr, pb, m, ml, mt, mr, mb, style, ...rest } = props

    const newStyles = useMemo(() => {
      return {
        ...style,
        padding: p !== undefined ? p * step : p,
        paddingTop: pt !== undefined ? pt * step : pt,
        paddingRight: pr !== undefined ? pr * step : pr,
        paddingBottom: pb !== undefined ? pb * step : pb,
        paddingLeft: pl !== undefined ? pl * step : pl,
        margin: m !== undefined ? m * step : m,
        marginTop: mt !== undefined ? mt * step : mt,
        marginRight: mr !== undefined ? mr * step : mr,
        marginBottom: mb !== undefined ? mb * step : mb,
        marginLeft: ml !== undefined ? ml * step : ml,
      }
    }, [m, mb, ml, mr, mt, p, pb, pl, pr, pt, style])

    return (
      <WrappedComponent ref={ref} style={newStyles} {...rest} />
    )
  }))
}