import { IMaterial } from "@rxdrag/react-core";
import { treeListItemIcon } from "./icon";
import { locales } from "./locales";
import { schema } from "./schema";
import { TreeListItemActions } from "@rxdrag/react-antd-components"

const name = "TreeListItemActions"
export const TreeListItemActionsMaterial: IMaterial = {
  componentName: name,
  component: TreeListItemActions,
  designer: TreeListItemActions,
  designerLocales: locales,
  propsSchema: schema,
  resource: {
    name: name,
    icon: treeListItemIcon,
    color: "#dfa324",
    //resourceLocales: resourceLocales,
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
