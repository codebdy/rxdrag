/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent } from "@rxdrag/react-shared"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { ControllersContext } from "../contexts"
import { useControllers } from "../hooks/useControllers"
import { Controllers, IController, ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { useLogicFlowContext } from "../hooks/useLogicFlowContext"
import { useRuntimeEngine } from "../hooks/useRuntimeEngine"

export function withController(WrappedComponent: ReactComponent, meta: ILogicFlowControllerMeta | undefined, schemaId: string): ReactComponent {
  if (!meta?.id) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const [changedProps, setChangeProps] = useState<any>()
    const [controller, setController] = useState<IController>()
    const controllers = useControllers()
    const logicFlowContext = useLogicFlowContext();
    const runtimeEngine = useRuntimeEngine();

    const handlePropsChange = useCallback((name: string, value: any) => {
      setChangeProps((changedProps: any) => {
        return ({ ...changedProps, [name]: value })
      })
    }, [])

    useEffect(() => {
      if (meta && runtimeEngine) {
        let ctrl = controllers[meta.id]
        //如果controller没有被提前创建
        if (!ctrl) {
          ctrl = runtimeEngine.getOrCreateController(meta, schemaId)
        }

        ctrl.init(controllers || {});
        const unlistener = ctrl?.subscribeToPropsChange(handlePropsChange)
        ctrl.initEvent?.()
        setController(ctrl)

        return () => {
          ctrl?.destoryEvent?.()
          ctrl?.destory()
          unlistener?.()
        }
      }
    }, [controllers, handlePropsChange, logicFlowContext, runtimeEngine])

    const newControllers: Controllers = useMemo(() => {
      return controller ? { ...controllers, [controller.id]: controller } : controllers
    }, [controller, controllers])

    const newProps = useMemo(() => {
      return { ...props, ...controller?.events, ...changedProps }
    }, [changedProps, controller?.events, props])

    return (
      controller
        ? <ControllersContext.Provider value={newControllers}>
          <WrappedComponent {...newProps} />
        </ControllersContext.Provider>
        : <></>
    )
  })
}
