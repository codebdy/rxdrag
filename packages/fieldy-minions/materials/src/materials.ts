import { readFieldValueMaterial } from "./readFieldValue";
import { subscribeFieldMaterial } from "./subscribeField";
import { ReactNode } from "react";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { setFieldValueMaterial } from "./setFieldValue";
import { IFieldyActivityMaterial } from "./types";
import { validateFieldMaterial } from "./validaeField";
import { setFormValueMaterial } from "./setFormValue";
import { readFormValueMaterial } from "./readFormValue";
import { subscribeFormMaterial } from "./subscribeForm";
import { validateFormMaterial } from "./validateForm";
import { resetFormMaterial } from "./resetForm";
import { resetFieldMaterial } from "./resetField";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fieldyActivities: IFieldyActivityMaterial<any>[] = [
  setFormValueMaterial,
  readFormValueMaterial,
  subscribeFormMaterial,
  validateFormMaterial,
  resetFormMaterial,
  setFieldValueMaterial,
  readFieldValueMaterial,
  subscribeFieldMaterial,
  validateFieldMaterial,
  resetFieldMaterial,
]

export const fieldyActivityMaterialCategory: ActivityMaterialCategory<ReactNode> = {
  name: '$dataModel',
  materials: fieldyActivities,
}
