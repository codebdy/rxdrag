import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { IControllerMeta, IPropConfig, ListenProp } from "@rxdrag/minions-runtime-react";
import { IRxDragActivityMaterial, LogicflowContextParam } from "../../interfaces";
import { propSchema } from "../setProp/schema";
import { getControllerComponentInfo } from "../utils";
import { listenPropIcon } from "@rxdrag/react-shared";

export const listenPropMaterial: IRxDragActivityMaterial<IPropConfig, LogicflowContextParam> = {
  label: "$listenProp",
  activityType: NodeType.Activity,
  defaultPorts: {
    outPorts: [
      {
        id: createId(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: propSchema,
  icon: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context?.engine)
    return material?.resource?.icon || listenPropIcon
  },

  color: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context?.engine)
    return material?.resource?.color
  },

  title: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { node, material } = getControllerComponentInfo(config, context?.engine)
    const ctrl = node?.meta["x-controller"] as IControllerMeta | undefined
    return ctrl?.name || material?.resource?.title || ctrl?.id
  },
  subTitle: (config?: IPropConfig, context?: LogicflowContextParam) => {
    const { material } = getControllerComponentInfo(config, context?.engine)
    const prop = config?.prop
    const label = material?.controller?.props?.find(pro => pro.name === prop)?.label
    const localesMgr = context?.engine?.getLocalesManager()
    const transedLabel = label?.startsWith("$")
      ? localesMgr?.getComponentSettingsMessage(material?.componentName || "", label.substring(1))
      : label
    return context?.t?.("propsChange") + " : " + (transedLabel || prop || "")
  },
  activityName: ListenProp.NAME,
}
