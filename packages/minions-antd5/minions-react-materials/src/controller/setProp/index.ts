import { ActivityType } from "@rxdrag/minions-schema";
import { propSchema } from "./schema"
import { createUuid } from "@rxdrag/shared";
import { IPropConfig, SetProp } from "@rxdrag/minions-runtime-react";
import { setPropIcon } from "../../icons";

import { IRxDragActivityMaterial } from "../../interfaces";
import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor";

export const setPropMaterial: IRxDragActivityMaterial<IPropConfig, IControllerEditorContextParam> = {
  icon: setPropIcon,
  label: "$setProp",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
  },
  schema: propSchema,
  subTitle: (config?: IPropConfig, context?: IControllerEditorContextParam) => {
    const controllerName = context?.controllers?.find(controler => controler.id === config?.param?.controllerId)?.name
    return controllerName ? (controllerName + "/" + (config?.param?.prop || "")) : ""
  },
  activityName: SetProp.NAME,
}