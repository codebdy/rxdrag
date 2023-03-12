import { IComponentMaterial } from "core-react";
import { Field } from "react-shells/ant5/components/Field";
import { fieldLocales } from "./locales";
import { fieldSchema } from "./schema";

const name = "Field"
export const FieldMaterial: IComponentMaterial = {
  componentName: name,
  component: Field,
  designer: Field,
  designerLocales: fieldLocales,
  designerSchema: fieldSchema,
  behaviorRule: {
    droppable: false,
    noPlaceholder: true,
    noRef: true,
    lockable: true,
  },
}
