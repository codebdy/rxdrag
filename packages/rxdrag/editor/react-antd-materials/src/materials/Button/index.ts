import { Button } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { IconViewMaterial } from "../displays/IconView";
import { buttonIcon } from "./icon";
import { buttonLocales, buttonResourceLocales } from "./locales";
import { buttonSchema } from "./schema";

const name = "Button"
export const ButtonMaterial: IMaterial = {
  componentName: name,
  component: Button,
  designer: Button,
  designerLocales: buttonLocales,
  propsSchema: buttonSchema,
  resource: {
    name: name,
    icon: buttonIcon,
    color: "#dfa324",
    resourceLocales: buttonResourceLocales,
    elements: [
      {
        componentName: name,
        props: {
          type: "primary",
          title: name,
        }
      }
    ]
  },

  slots: {
    icon: IconViewMaterial,
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: true,
    lockable: true,
  },
  controller: {
    props: [
      {
        name: "danger",
        label: "$danger",
      },
      {
        name: "disabled",
        label: "$disabled",
      },
      {
        name: "title",
        label: "$title",
      },
      {
        name: "type",
        label: "$type",
      },
    ],
    events: [
      {
        name: "onClick",
        label: "$onClick",
      },
      {
        name: "onTest",
        label: "$onTest",
        args: [
          {
            name: "arg1",
            label: "$arg1",
          },
          {
            name: "arg2",
            label: "$arg2",
          },

          {
            name: "arg3",
            label: "$arg3",
          },
        ]
      }
    ],
    reactions: [
      {
        name: "enable",
        label: "$enable"
      },
      {
        name: "disable",
        label: "$disable"
      }
    ]
  }
}
