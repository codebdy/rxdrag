import { IMaterial } from "@rxdrag/react-core";
import { treeListIcon } from "./icon";
import { boxLocales, boxResourceLocales } from "./locales";
import { boxSchema } from "./schema";
import { TreeList } from "@rxdrag/react-antd-components"
import { TreeListDesigner } from "./designer";
import { TreeListPopupSelect } from "./setters";

const name = "TreeList"
export const TreeListMaterial: IMaterial = {
  componentName: name,
  component: TreeList,
  designer: TreeListDesigner,
  designerLocales: boxLocales,
  propsSchema: boxSchema,
  resource: {
    name: name,
    icon: treeListIcon,
    color: "#dfa324",
    resourceLocales: boxResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
  },
  setters: {
    TreeListPopupSelect: TreeListPopupSelect
  }
}
