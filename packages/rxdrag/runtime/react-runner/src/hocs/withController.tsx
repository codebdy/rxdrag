/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { ReactComponent } from "@rxdrag/react-shared"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { ControllersContext } from "../contexts"
import { useControllers } from "../hooks/useControllers"
import { Controllers, DefaultController, IController, IControllerMeta } from "@rxdrag/minions-runtime-react"
import { LogicFlowContext, useLogicFlowContext } from "../hooks/useLogicFlowContext"

export function withController(WrappedComponent: ReactComponent, meta?: IControllerMeta): ReactComponent {

  if (!meta?.id) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const [changedProps, setChangeProps] = useState<any>()
    const [controller, setController] = useState<IController>()
    const controllers = useControllers()
    const logicFlowContext = useLogicFlowContext();

    const handlePropsChange = useCallback((name: string, value: any) => {
      setChangeProps((changedProps: any) => {
        return ({ ...changedProps, [name]: value })
      })
    }, [])

    useEffect(() => {
      if (meta) {
        let ctrl = controllers[meta.id]
        //如果controller没有被提前创建
        if (!ctrl) {
          ctrl = new DefaultController<LogicFlowContext>(meta, logicFlowContext)
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
    }, [controllers, handlePropsChange, logicFlowContext])

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
