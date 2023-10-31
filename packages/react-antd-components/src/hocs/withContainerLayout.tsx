import { ReactComponent } from "@rxdrag/react-shared";
import { memo, forwardRef, CSSProperties, useMemo } from "react";

export interface IContainerLayoutProps {
  p?: {
    pl?: number,
    pt?: number,
    pr?: number,
    pb?: number,
  }
  m?: {
    ml?: number,
    mt?: number,
    mr?: number,
    mb?: number,
  }
}

const step = 8

export function withContainerLayout<T = unknown>(WrappedComponent: ReactComponent, defaultValue?: IContainerLayoutProps) {

  return memo(forwardRef<HTMLElement, T & IContainerLayoutProps & { style?: CSSProperties, children?: React.ReactNode }>((props, ref) => {
    const { p, m, style, ...rest } = props
    const { p: dp, m: dm } = defaultValue || {}
    const { pl, pt, pr, pb, } = p || dp || {}
    const { ml, mt, mr, mb, } = m || dm || {}
    const newStyles = useMemo(() => {
      return {
        ...style,
        paddingTop: pt !== undefined ? pt * step : pt,
        paddingRight: pr !== undefined ? pr * step : pr,
        paddingBottom: pb !== undefined ? pb * step : pb,
        paddingLeft: pl !== undefined ? pl * step : pl,
        marginTop: mt !== undefined ? mt * step : mt,
        marginRight: mr !== undefined ? mr * step : mr,
        marginBottom: mb !== undefined ? mb * step : mb,
        marginLeft: ml !== undefined ? ml * step : ml,
      }
    }, [mb, ml, mr, mt, pb, pl, pr, pt, style])

    return (
      <WrappedComponent ref={ref} style={newStyles} {...rest} />
    )
  }))
}