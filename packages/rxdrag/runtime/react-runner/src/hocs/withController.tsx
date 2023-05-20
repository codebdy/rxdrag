/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { ReactComponent } from "@rxdrag/react-shared"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ControllerMetasContext } from "../contexts"
import { useControllers } from "../hooks/useControllers"
import { useFieldPath, useForm } from "@rxdrag/react-fieldy"
import { Controllers, DefaultController, IController, IControllerMeta } from "@rxdrag/minions-runtime-react"

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
      if (meta) {
        const ctrl = new DefaultController(meta, controllers || {}, { navigate, form, fieldPath } as any)
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

    return (
      controller
        ? <ControllerMetasContext.Provider value={newControllers}>
          <WrappedComponent {...newProps} />
        </ControllerMetasContext.Provider>
        : <></>
    )
  })
}
