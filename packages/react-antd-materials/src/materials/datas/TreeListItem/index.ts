import { IMaterial } from "@rxdrag/react-core";
import { treeListItemIcon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";
import { TreeListItem } from "@rxdrag/react-antd-components"
import { TreeListItemActionsMaterial } from "../TreeListItemActions";
import { IconViewMaterial } from "../../displays";

const name = "TreeListItem"
export const TreeListItemMaterial: IMaterial = {
  componentName: name,
  component: TreeListItem,
  designer: TreeListItem,
  designerLocales: locales,
  propsSchema: schema,
  designerProps: {
    fixed: true,
  },
  resource: {
    name: name,
    icon: treeListItemIcon,
    color: "#dfa324",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
        slots: {
          icon: {
            componentName: "IconView",
            "props": {
              "icon": {
                "iconKey": "QuestionOutlined"
              }
            },
          },
          action: {
            componentName: "TreeListItemActions",
          }
        }
      }
    ]
  },
  slots: {
    icon: IconViewMaterial,
    actions: TreeListItemActionsMaterial,
  },
  behaviorRule: {
    droppable: true,
  }
}
