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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fieldyActivities: IFieldyActivityMaterial<any>[] = [
  setFormValueMaterial,
  readFormValueMaterial,
  subscribeFormMaterial,
  validateFormMaterial,
  setFieldValueMaterial,
  readFieldValueMaterial,
  subscribeFieldMaterial,
  validateFieldMaterial,
]

export const fieldyActivityMaterialCategory: ActivityMaterialCategory<ReactNode>=   {
  name: '$dataModel',
  materials: fieldyActivities,
}
