import { useCallback } from "react"

export function useGetStartNodeAttrs() {
  const getStartNodeAttrs = useCallback(() => {
    return {
      body: {
        fill: 'transparent',
        stroke: '#ccc',
        strokeWidth: 2,
        //cursor: "crosshair",
      },
      label: {
        refX: '-10',
        //refX2: -30,
        refY: 0.5,
        textAnchor: 'end',
        textVerticalAnchor: 'middle',
        fill: "#fff"
      },
    }
  }, [])

  return getStartNodeAttrs
}
