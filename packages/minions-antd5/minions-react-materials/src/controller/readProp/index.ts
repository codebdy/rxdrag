import { NodeType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { IPropConfig, ReadProp } from "@rxdrag/minions-runtime-react";
import { readPropIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor";
import { propSchema } from "../setProp/schema";

export const readPropMaterial: IRxDragActivityMaterial<IPropConfig, IControllerEditorContextParam> = {
  icon: readPropIcon,
  label: "$readProp",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: "input",
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",
      },
    ],
  },
  schema: propSchema,
  subTitle: (config?: IPropConfig, context?: IControllerEditorContextParam) => {
    const controllerName = context?.controllers?.find(controller => controller.id === config?.param?.controllerId)?.name
    return controllerName ? (controllerName + "/" + (config?.param?.prop || "")) : ""
  },
  activityName: ReadProp.NAME,
}
