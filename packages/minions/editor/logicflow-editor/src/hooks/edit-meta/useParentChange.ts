import { useEffect } from "react";
import { useGraph } from "../useGraph";

export function useParentChange(){
  const graph = useGraph()
  useEffect(()=>{
    graph?.on('node:change:parent', ({ node }) => {
      node.attr({
        label: {
          text: 'Child\n(embed)',
        },
      })
    })
  }, [graph])
}