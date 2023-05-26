import { createUuid } from "@rxdrag/shared";
import { readFieldValueMaterial } from "./readFieldValue";
import { subscribeFieldMaterial } from "./subscribeField";
import { ReactNode } from "react";
import { IActivityMaterial, ActivityType, ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { fieldIcon, fieldValidateIcon, formIcon, formReadIcon, formValidateIcon } from "./icons";


export const fieldyActivities: IActivityMaterial<ReactNode>[] = [
  // {
  //   name: "setFormValue",
  //   icon: formIcon,
  //   label: "$setFormValue",
  //   activityType: ActivityType.Activity,
  //   meta: {
  //     inPorts: [
  //       {
  //         id: createUuid(),
  //         name: "input",
  //         label: "",
  //       },
  //     ],
  //   }
  // },
  // {
  //   name: "validateForm",
  //   icon: formValidateIcon,
  //   label: "$validateForm",
  //   activityType: ActivityType.Activity,
  //   meta: {
  //     inPorts: [
  //       {
  //         id: createUuid(),
  //         name: "input",
  //         label: "",
  //       },
  //     ],
  //     outPorts: [
  //       {
  //         id: createUuid(),
  //         name: "success",
  //         label: "$success",
  //       },
  //       {
  //         id: createUuid(),
  //         name: "failure",
  //         label: "$failure",
  //       },
  //     ],
  //   }
  // },
  // {
  //   name: "readFormValue",
  //   icon: formReadIcon,
  //   label: "$readFormValue",
  //   activityType: ActivityType.Activity,
  //   meta: {
  //     inPorts: [
  //       {
  //         id: createUuid(),
  //         name: "input",
  //         label: "",
  //       },
  //     ],
  //     outPorts: [
  //       {
  //         id: createUuid(),
  //         name: "output",
  //         label: "",
  //       },
  //     ],
  //   }
  // },
  // {
  //   name: "setFieldValue",
  //   icon: fieldIcon,
  //   label: "$setFieldValue",
  //   activityType: ActivityType.Activity,
  //   meta: {
  //     inPorts: [
  //       {
  //         id: createUuid(),
  //         name: "input",
  //         label: "",
  //       },
  //     ],
  //   }
  // },
  // {
  //   name: "validateField",
  //   icon: fieldValidateIcon,
  //   label: "$validateField",
  //   activityType: ActivityType.Activity,
  //   meta: {
  //     inPorts: [
  //       {
  //         id: createUuid(),
  //         name: "input",
  //         label: "",
  //       },
  //     ],
  //     outPorts: [
  //       {
  //         id: createUuid(),
  //         name: "success",
  //         label: "$success",
  //       },
  //       {
  //         id: createUuid(),
  //         name: "failure",
  //         label: "$failure",
  //       },
  //     ],
  //   }
  // },
  readFieldValueMaterial,
  subscribeFieldMaterial,
]

export const fieldyActivityMaterialCategory: ActivityMaterialCategory<ReactNode>=   {
  name: '$dataModel',
  materials: fieldyActivities,
}
