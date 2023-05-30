import { IFieldSchema } from "@rxdrag/fieldy";
import { Controllers, DefaultController, IControllerMeta } from "@rxdrag/minions-runtime-react";
import { INodeSchema } from "@rxdrag/schema";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLogicFlowContext } from "./useLogicFlowContext";

type ControllerMetas = {
  [id: string]: IControllerMeta | undefined
}

export function useCreateGlobalControllers(schema?: INodeSchema<IFieldSchema, IControllerMeta>) {
  const [controllers, setControllers] = useState<Controllers>({});

  const controllerRef = useRef(controllers)
  controllerRef.current = controllers
  const logicFlowContext = useLogicFlowContext();

  const getSchemaControllers = useCallback((schema: INodeSchema<IFieldSchema, IControllerMeta> | undefined, controllers: Controllers, passedByMetas: ControllerMetas) => {
    const controllerMeta = schema?.["x-controller"];
    if (controllerMeta?.global) {
      const controller = new DefaultController(controllerMeta, logicFlowContext);
      controllers[controller.id] = controller
      //补全所有的父控制器
      for (const id of Object.keys(passedByMetas)) {
        const meta = passedByMetas[id]
        if (meta) {
          controllers[id] = new DefaultController(meta, logicFlowContext);
        }
      }
    } else if (controllerMeta) {
      passedByMetas[controllerMeta.id] = controllerMeta
    }

    for (const child of schema?.children || []) {
      getSchemaControllers(child as INodeSchema<IFieldSchema, IControllerMeta>, controllers, passedByMetas);
    }

    for (const slotName of Object.keys(schema?.slots || {})) {
      const child = schema?.slots?.[slotName]
      getSchemaControllers(child as INodeSchema<IFieldSchema, IControllerMeta>, controllers, passedByMetas);
    }

    return controllers
  }, [logicFlowContext])

  useEffect(() => {
    //第一步构建所有controller
    const controllers = getSchemaControllers(schema, {}, {})
    //初始化构建的controller
    for (const id of Object.keys(controllers)) {
      controllers[id]?.init(controllers);
    }
    setControllers(controllers)
  }, [getSchemaControllers, schema])

  return controllers
}