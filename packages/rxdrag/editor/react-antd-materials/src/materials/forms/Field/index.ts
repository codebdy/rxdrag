import { Field } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { FieldDesigner } from "./designer";
import { fieldLocales } from "./locales";
import { fieldSchema } from "./schema";

// Field功能预计删除
const name = "Field"
export const FieldMaterial: IComponentMaterial = {
  componentName: name,
  component: Field,
  designer: FieldDesigner,
  designerLocales: fieldLocales,
  propsSchema: fieldSchema,
  behaviorRule: {
    droppable: false,
    noPlaceholder: true,
    noRef: true,
    lockable: true,
  },
}

