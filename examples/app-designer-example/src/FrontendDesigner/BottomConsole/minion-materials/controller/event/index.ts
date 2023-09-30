import { EventActivity, IEventConfig } from "@rxdrag/minions-runtime-react";
import { NodeType } from "@rxdrag/minions-schema";
import { methodIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor";

export const eventMaterial: IRxDragActivityMaterial<IEventConfig, IControllerEditorContextParam> = {
  activityName: EventActivity.NAME,
  icon: methodIcon,
  label: "$event",
  activityType: NodeType.Activity,
  defaultPorts: {
  },
}
