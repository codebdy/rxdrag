/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent } from "@rxdrag/react-shared"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { ControllerContext } from "../contexts"
import { IController, IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useControllerEngine } from "../hooks/useControllerEngine"

export function withController(WrappedComponent: ReactComponent, meta: IControllerMeta | undefined): ReactComponent {
  if (!meta?.id || !meta?.enable) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const [changedProps, setChangeProps] = useState<any>()
    const [controller, setController] = useState<IController>()
    const controllerEngine = useControllerEngine();

    const handlePropsChange = useCallback((name: string, value: any) => {
      setChangeProps((changedProps: any) => {
        return ({ ...changedProps, [name]: value })
      })
    }, [])

    useEffect(() => {
      if (meta?.enable && controllerEngine) {
        const ctrl = controllerEngine.getController(meta.id)
        const unlistener = ctrl?.subscribeToPropsChange(handlePropsChange)
        ctrl?.initEvent?.()
        setController(ctrl)
        return () => {
          ctrl?.destroyEvent?.()
          ctrl?.destroy()
          unlistener?.()
        }
      }
    }, [handlePropsChange, controllerEngine])

    const newProps = useMemo(() => {
      return { ...props, ...controller?.events, ...changedProps }
    }, [changedProps, controller?.events, props]);
    console.log("====>controller events", controller?.events)
    return (
      <ControllerContext.Provider value={controller}>
        <WrappedComponent {...newProps} />
      </ControllerContext.Provider>
    )
  })
}
