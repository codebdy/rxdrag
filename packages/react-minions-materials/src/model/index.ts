import { formIcon, formValidateIcon, formReadIcon, fieldIcon, fieldValidateIcon } from "@rxdrag/react-shared";
import { IActivityMaterial, ActivityType } from "@rxdrag/schema";
import { createUuid } from "@rxdrag/shared";
import { readFieldValueMaterial } from "./readFieldValue";
import { subscribeFieldMaterial } from "./subscribeField";
import { ReactNode } from "react";

export const dataModelReactions: IActivityMaterial<ReactNode>[] = [
  {
    name: "setFormValue",
    icon: formIcon,
    label: "$setFormValue",
    reactionType: ActivityType.SingleActivity,
    meta: {
      inPorts: [
        {
          id: createUuid(),
          name: "input",
          label: "",
        },
      ],
    }
  },
  {
    name: "validateForm",
    icon: formValidateIcon,
    label: "$validateForm",
    reactionType: ActivityType.SingleActivity,
    meta: {
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
          name: "success",
          label: "$success",
        },
        {
          id: createUuid(),
          name: "failure",
          label: "$failure",
        },
      ],
    }
  },
  {
    name: "readFormValue",
    icon: formReadIcon,
    label: "$readFormValue",
    reactionType: ActivityType.SingleActivity,
    meta: {
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
    }
  },
  {
    name: "setFieldValue",
    icon: fieldIcon,
    label: "$setFieldValue",
    reactionType: ActivityType.SingleActivity,
    meta: {
      inPorts: [
        {
          id: createUuid(),
          name: "input",
          label: "",
        },
      ],
    }
  },
  {
    name: "validateField",
    icon: fieldValidateIcon,
    label: "$validateField",
    reactionType: ActivityType.SingleActivity,
    meta: {
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
          name: "success",
          label: "$success",
        },
        {
          id: createUuid(),
          name: "failure",
          label: "$failure",
        },
      ],
    }
  },
  readFieldValueMaterial,
  subscribeFieldMaterial,
]