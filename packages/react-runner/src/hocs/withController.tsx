/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent } from "@rxdrag/react-shared"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ControllerContext } from "../contexts"
import { EventHandler, IController, IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useControllerEngine } from "../hooks/useControllerEngine"

export function withController(WrappedComponent: ReactComponent, meta: IControllerMeta | undefined): ReactComponent {
  if (!meta?.id || !meta?.enable) {
    return WrappedComponent
  }

  return (props: any) => {
    const [changedProps, setChangedProps] = useState<any>()
    const [events, setEvents] = useState<Record<string, EventHandler>>()
    const [controller, setController] = useState<IController>()
    const controllerEngine = useControllerEngine();

    const handlePropsChange = useCallback((name: string, value: any) => {
      setChangedProps((changedProps: any) => {
        return ({ ...changedProps, [name]: value })
      })
    }, [])

    const handleEventsChange = useCallback((eventHandlers?: Record<string, EventHandler>) => {
      setEvents(eventHandlers)
    }, [])

    useEffect(() => {
      setEvents(controller?.events)
    }, [controller?.events])

    useEffect(() => {
      const ctrlProps = controller?.getProps()
      if (ctrlProps) {
        setChangedProps(ctrlProps)
      }
    }, [controller])

    useEffect(() => {
      if (meta?.enable && controllerEngine) {
        const ctrl = controllerEngine.getController(meta.id)
        const unlistener = ctrl?.subscribeToPropsChange(handlePropsChange)
        const unsubEvents = ctrl?.subscribeEventHandlersChange(handleEventsChange)
        //ctrl?.initEvent?.()
        setController(ctrl)
        return () => {
          //ctrl?.destroyEvent?.()
          //ctrl?.destroy()
          unlistener?.()
          unsubEvents?.()
        }
      }
    }, [handlePropsChange, controllerEngine, handleEventsChange])

    const newProps = useMemo(() => {
      return { ...props, ...events, ...changedProps }
    }, [changedProps, events, props]);

    return (
      <ControllerContext.Provider value={controller}>
        <WrappedComponent {...newProps} />
      </ControllerContext.Provider>
    )
  }
}
