import { NodeType } from "@rxdrag/minions-schema";
import { propSchema } from "./schema"
import { createId } from "@rxdrag/shared";
import { IControllerMeta, IPropConfig, SetProp } from "@rxdrag/minions-runtime-react";

import { IRxDragActivityMaterial } from "../../interfaces";
import { setPropIcon } from "../../../icons";
import { LogicflowContextParam } from "../../../types";
import { getControllerComponentInfo } from "../utils";

export const setPropMaterial: IRxDragActivityMaterial<IPropConfig, LogicflowContextParam> = {
  icon: setPropIcon,
  label: "$setProp",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: propSchema,
  title: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config, context)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },
  subTitle: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config, context)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
    // const controllerName = context?.controllers?.find(controller => controller.id === config?.param?.controllerId)?.name
    // return controllerName ? (controllerName + "/" + (config?.param?.prop || "")) : ""
  },
  activityName: SetProp.NAME,
}
