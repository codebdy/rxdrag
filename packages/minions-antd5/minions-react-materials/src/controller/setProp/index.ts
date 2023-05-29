import { IActivityMaterial, ActivityType } from "@rxdrag/minions-schema";
import { setPropSchema } from "./schema"
import { ReactNode } from "react"
import { createUuid } from "@rxdrag/shared";
import { ISetPropConfig, SetPropActivity } from "@rxdrag/minions-runtime-react";
import { setPropIcon } from "../../icons";

export const setPropMaterial: IActivityMaterial<ReactNode> = {
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
  subTitle: (config?: ISetPropConfig) => {
    return config?.prop
  },
  activityName: SetPropActivity.NAME,
}
