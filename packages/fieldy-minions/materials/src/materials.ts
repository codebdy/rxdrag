import { readFieldValueMaterial } from "./readFieldValue";
import { subscribeFieldMaterial } from "./subscribeField";
import { ReactNode } from "react";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { setFieldValueMaterial } from "./setFieldValue";
import { IFieldActivityMaterial } from "./types";
import { validateFieldMaterial } from "./validaeField";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fieldyActivities: IFieldActivityMaterial<any>[] = [
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
  setFieldValueMaterial,
  readFieldValueMaterial,
  subscribeFieldMaterial,
  validateFieldMaterial,
]

export const fieldyActivityMaterialCategory: ActivityMaterialCategory<ReactNode>=   {
  name: '$dataModel',
  materials: fieldyActivities,
}
