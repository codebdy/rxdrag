import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { IControllerMeta, IPropConfig, ListenProp } from "@rxdrag/minions-runtime-react";
import { IRxDragActivityMaterial } from "../../interfaces";
import { propSchema } from "../setProp/schema";
import { listenPropIcon } from "../../../icons";
import { IControllerMaterial } from "@rxdrag/minions-controller-editor"


export function createListenPropMaterial(ctrlMeta: IControllerMeta, ctrlMaterial: IControllerMaterial): IRxDragActivityMaterial<IPropConfig> {
  return {
    icon: listenPropIcon,
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
    defaultConfig: {
      param: {
        controllerId: ctrlMeta.id
      }
    },
    schema: propSchema,
    subTitle: (config?: IPropConfig) => {
      return `${ctrlMeta.name}/${ctrlMaterial.props?.find(prop => prop.name === config?.param?.prop)?.label || ""}`
    },
    activityName: ListenProp.NAME,
  }
}