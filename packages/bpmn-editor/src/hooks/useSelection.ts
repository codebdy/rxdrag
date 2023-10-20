import { useCallback, useEffect, useState } from "react";

export function useSelection(modeler?: any) {
  const [selection, setSelection] = useState<any>();
  const [element, setElement] = useState<any>();

  useEffect(() => {
    const canvas = modeler?.get('canvas')
    console.log("===>canvas", canvas)
    //setElement(canvas?.getRootElement())
  }, [modeler])

  const handleSelectionsChanged = useCallback((e: any) => {
    if (!modeler) {
      return;
    }
    setSelection(e.newSelection);
    if (!e.newSelection?.length) {
      const canvas = modeler.get('canvas')
      setElement(canvas.getRootElement())
    } else {
      let ele = e.newSelection?.[0];
      const elementRegistry = modeler.get('elementRegistry');
      ele = elementRegistry.get(ele?.businessObject?.id)
      setElement(ele);
    }

    //console.log("Lane 跟踪", e.newSelection?.[0]?.businessObject?.lanes)
  }, [modeler])


  useEffect(() => {
    modeler?.on('selection.changed', handleSelectionsChanged);
    return () => {
      modeler?.off('selection.changed', handleSelectionsChanged)
    }
  }, [modeler, handleSelectionsChanged])

  return { element, selection };
}