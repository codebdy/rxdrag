/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent } from "@rxdrag/react-shared"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { ControllerContext, ControllersContext } from "../contexts"
import { useControllers } from "../hooks/useControllers"
import { Controllers, IController, IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { useRuntimeEngine } from "../hooks/useRuntimeEngine"
import { useControllerKey } from "../hooks/useControllerKey"

export function withController(WrappedComponent: ReactComponent, meta: IControllerMeta | undefined, schemaId: string): ReactComponent {
  if (!meta?.id || !meta?.controllerName) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const [changedProps, setChangeProps] = useState<any>()
    const [controller, setController] = useState<IController>()
    const controllers = useControllers()
    const logicFlowContext = useLogicFlowContext();
    const runtimeEngine = useRuntimeEngine();
    const controllerKey = useControllerKey(meta, schemaId)

    const handlePropsChange = useCallback((name: string, value: any) => {
      setChangeProps((changedProps: any) => {
        return ({ ...changedProps, [name]: value })
      })
    }, [])
    useEffect(() => {
      if (meta?.controllerType && runtimeEngine && controllerKey) {
        const ctrl = runtimeEngine.getOrCreateController(meta, controllerKey)
        ctrl.init(controllers, logicFlowContext);
        const unlistener = ctrl?.subscribeToPropsChange(handlePropsChange)
        ctrl.initEvent?.()
        setController(ctrl)
        return () => {
          ctrl?.destroyEvent?.()
          ctrl?.destroy()
          unlistener?.()
          //runtimeEngine?.remove(controllerKey)
        }
      }
    }, [controllerKey, controllers, handlePropsChange, logicFlowContext, runtimeEngine])
    const newControllers: Controllers = useMemo(() => {
      return controller ? { ...controllers, [controller.id]: controller } : controllers
    }, [controller, controllers])

    const newProps = useMemo(() => {
      return { ...props, ...controller?.events, ...changedProps }
    }, [changedProps, controller?.events, props])

    return (
      controller
        ? <ControllersContext.Provider value={newControllers}>
          <ControllerContext.Provider value={controller}>
            <WrappedComponent {...newProps} />
          </ControllerContext.Provider>
        </ControllersContext.Provider>
        : <>Can not creat controller </>
    )
  })
}
