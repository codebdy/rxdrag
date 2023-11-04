import { IMaterial } from "@rxdrag/react-core";
import { treeListItemIcon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { boxSchema } from "./schema";
import { TreeListItem } from "@rxdrag/react-antd-components"

const name = "TreeListItem"
export const TreeListItemMaterial: IMaterial = {
  componentName: name,
  component: TreeListItem,
  designer: TreeListItem,
  designerLocales: locales,
  propsSchema: boxSchema,
  designerProps: {
    selectable: false,
    dataSource: [{
      id:"designer",
    }]
  },
  resource: {
    name: name,
    icon: treeListItemIcon,
    color: "#dfa324",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
  }
}
