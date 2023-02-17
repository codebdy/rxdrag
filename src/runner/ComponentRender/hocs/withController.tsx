import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ComponentControllers, IComponentController } from "runner/reaction"
import { ComponentController } from "runner/reaction/controllers/ComponentController"
import { useMaterials } from "runner/reaction/hooks/useMaterials"
import { IControllerMeta } from "runner/reaction/interfaces/metas"
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

    useEffect(() => {
      if (meta && controllers && materials && navigate) {
        const ctrl = new ComponentController(meta, controllers, materials, navigate)
        ctrl.initEvent?.()
        setController(ctrl)
        return () => {
          ctrl.destoryEvent?.()
          ctrl.destory()
        }
      }
    }, [controllers, materials, navigate])

    // const controller = useMemo(
    //   () => {
    //     console.log("创建控制器")
    //     return new ComponentController(meta, controllers, materials, navigate)
    //   },
    //   [controllers, materials, navigate]
    // )

    const newControllers: ComponentControllers = useMemo(() => {
      return controller ? { ...controllers, [controller.id]: controller } : controllers
    }, [controller, controllers])

    const newProps = useMemo(() => {
      return { ...props, ...controller?.events, ...changedProps }
    }, [changedProps, controller?.events, props])

    const handlePropsChange = useCallback((name: string, value: any) => {
      setChangeProps((changedProps: any) => {
        return ({ ...changedProps, [name]: value })
      })
    }, [])

    useEffect(() => {
      const unlistener = controller?.subscribeToPropsChange(handlePropsChange)
      return unlistener
    }, [controller, handlePropsChange])

    // useEffect(() => {
    //   if (controller) {
    //     controller.initEvent?.()
    //     return () => {
    //       controller.destoryEvent?.()
    //       //暂时删掉，因为会有不响应的bug
    //       //controller.destory()
    //     }
    //   }
    // }, [controller])

    return (
      controller
        ? <ControllersContext.Provider value={newControllers}>
          <WrappedComponent {...newProps} />
        </ControllersContext.Provider>
        : <></>
    )
  })
}
