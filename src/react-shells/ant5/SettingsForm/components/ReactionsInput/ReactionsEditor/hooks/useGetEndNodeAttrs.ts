import { useCallback } from "react"

export function useGetEndNodeAttrs() {
  const getAttrs = useCallback(() => {
    return {
      body: {
        fill: 'transparent',
        stroke: '#ccc',
        strokeWidth: 2,
        //cursor: "crosshair",
      },
      label: {
        refX: '100%',
        refX2: 10,
        refY: 0.5,
        textAnchor: 'start',
        textVerticalAnchor: 'middle',
        fill: "#fff"
      },
    }
  }, [])

  return getAttrs
}
