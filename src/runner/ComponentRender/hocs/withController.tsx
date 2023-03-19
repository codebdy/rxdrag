import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFieldPath, useForm } from "runner/fieldy"
import { ComponentControllers, IComponentController } from "runner/minions"
import { ComponentController } from "runner/minions/controllers/ComponentController"
import { useMaterials } from "runner/minions/hooks/useMaterials"
import { IControllerMeta } from "runner/minions/interfaces/metas"
import { ControllersContext } from "../contexts"
import { useControllers } from "../hooks/useControllers"
import { ReactComponent } from "../types"

export function withController(WrappedComponent: ReactComponent, meta?: IControllerMeta): ReactComponent {

  if (!meta?.id) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const [changedProps, setChangeProps] = useState<any>()
    const [controller, setController] = useState<IComponentController>()
    const controllers = useControllers()
    const materials = useMaterials()
    const navigate = useNavigate()
    const form = useForm()
    const fieldPath = useFieldPath()

    const handlePropsChange = useCallback((name: string, value: any) => {
      setChangeProps((changedProps: any) => {
        return ({ ...changedProps, [name]: value })
      })
    }, [])
    
    useEffect(() => {
      if (meta && controllers && materials) {
        const ctrl = new ComponentController(meta, controllers, {materials, navigate, form, fieldPath})
        const unlistener = ctrl?.subscribeToPropsChange(handlePropsChange)
        ctrl.initEvent?.()
        setController(ctrl)

        return () => {
          ctrl.destoryEvent?.()
          ctrl.destory()
          unlistener?.()
        }
      }
    }, [controllers, fieldPath, form, handlePropsChange, materials, navigate])

    const newControllers: ComponentControllers = useMemo(() => {
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
