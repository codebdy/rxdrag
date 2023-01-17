import { useCallback } from "react"

export function useGetStartNodeAttrs() {
  const getStartNodeAttrs = useCallback(() => {
    return {
      body: {
        fill: '#111',
        stroke: '#ccc',
        strokeWidth: 2,
      },
      label: {
        refX: '100%',
        refX2: 4,
        refY: 0.5,
        textAnchor: 'start',
        textVerticalAnchor: 'middle',
        fill: "#fff"
      },
    }
  }, [])

  return getStartNodeAttrs
}
