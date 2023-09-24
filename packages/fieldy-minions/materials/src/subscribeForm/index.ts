import { SubscribeForm } from "@rxdrag/fieldy-minions-activities";
import { IFieldyActivityMaterial } from "../types";
import { NodeType } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { subscribeFormIcon } from "../icons";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { formSchema } from "../readFormValue/schema";

export const subscribeFormMaterial: IFieldyActivityMaterial = {
    activityName: SubscribeForm.NAME,
    icon: subscribeFormIcon,
    label: "$subscribeForm",
    activityType: NodeType.Activity,
    defaultPorts: {
      outPorts: [
        {
          id: createId(),
          name: DEFAULT_OUTPUT_NAME,
          label: "",
        },
      ],
    },
    schema: formSchema,
  }