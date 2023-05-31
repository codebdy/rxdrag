import { ActivityType } from "@rxdrag/minions-schema";
import { setPropSchema } from "./schema"
import { createUuid } from "@rxdrag/shared";
import { ISetPropConfig, SetPropActivity } from "@rxdrag/minions-runtime-react";
import { setPropIcon } from "../../icons";

import { IRxDragActivityMaterial } from "../../interfaces";
import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor";

export const setPropMaterial: IRxDragActivityMaterial<ISetPropConfig, IControllerEditorContextParam> = {
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
  schema: setPropSchema,
  subTitle: (config?: ISetPropConfig, context?: IControllerEditorContextParam) => {
    const controllerName = context?.controllers?.find(controler => controler.id === config?.param?.controllerId)?.name
    return controllerName ? (controllerName + "/" + config?.param?.prop || "") : ""
  },
  activityName: SetPropActivity.NAME,
}
