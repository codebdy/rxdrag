import { ActivityType } from "@rxdrag/minions-schema";
import { setPropSchema } from "./schema"
import { createUuid } from "@rxdrag/shared";
import { ISetPropConfig, SetPropActivity } from "@rxdrag/minions-runtime-react";
import { setPropIcon } from "../../icons";

import { IControllerMaterialContext } from "../context";
import { IRxDragActivityMaterial } from "../../interfaces";

export const setPropMaterial: IRxDragActivityMaterial<ISetPropConfig, IControllerMaterialContext> = {
  icon: setPropIcon,
  label: "$setProp",
  activityType: ActivityType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",//"$startUp",
      },
    ],
  },
  schema: setPropSchema,
  subTitle: (config?: ISetPropConfig, context?: IControllerMaterialContext) => {
    const controllerName = context?.controllers?.find(controler => controler.id === config?.param?.controllerId)?.name
    return controllerName ? (controllerName + "/" + config?.param?.prop || "") : ""
  },
  activityName: SetPropActivity.NAME,
}
