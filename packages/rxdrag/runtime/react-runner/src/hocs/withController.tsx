/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useLayoutEffect } from "react"
import { ReactComponent } from "@rxdrag/react-shared"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ControllerMetasContext } from "../contexts"
import { useControllers } from "../hooks/useControllers"
import { useFieldPath, useForm } from "@rxdrag/react-fieldy"
import { Controllers, DefaultController, IController, IControllerMeta, IRouteToContext } from "@rxdrag/minions-runtime-react"
import { IFieldyLogicFlowContext } from "@rxdrag/fieldy-minions-activities"

export type LogicFlowContext = IFieldyLogicFlowContext & IRouteToContext

export function withController(WrappedComponent: ReactComponent, meta?: IControllerMeta): ReactComponent {

  if (!meta?.id) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const [changedProps, setChangeProps] = useState<any>()
    const [controller, setController] = useState<IController>()
    const controllers = useControllers()
    //const materials = useMaterials()
    const navigate = useNavigate()
    const form = useForm()
    const fieldPath = useFieldPath()

    const handlePropsChange = useCallback((name: string, value: any) => {
      setChangeProps((changedProps: any) => {
        return ({ ...changedProps, [name]: value })
      })
    }, [])

    useEffect(() => {
      console.log("哈哈哈 useEffect", meta.name||meta.id)
      if (meta) {
        const ctrl = new DefaultController<LogicFlowContext>(meta, controllers || {}, { navigate, form, fieldPath })
        const unlistener = ctrl?.subscribeToPropsChange(handlePropsChange)
        ctrl.initEvent?.()
        setController(ctrl)
        return () => {
          ctrl.destoryEvent?.()
          ctrl.destory()
          unlistener?.()
        }
      }
    }, [controllers, fieldPath, form, handlePropsChange, navigate])

    const newControllers: Controllers = useMemo(() => {
      return controller ? { ...controllers, [controller.id]: controller } : controllers
    }, [controller, controllers])

    const newProps = useMemo(() => {
      return { ...props, ...controller?.events, ...changedProps }
    }, [changedProps, controller?.events, props])

    useLayoutEffect(()=>{
      console.log("哈哈哈 useLayoutEffect", meta.name||meta.id)
    }, [])

    return (
      controller
        ? <ControllerMetasContext.Provider value={newControllers}>
          <WrappedComponent {...newProps} />
        </ControllerMetasContext.Provider>
        : <></>
    )
  })
}
