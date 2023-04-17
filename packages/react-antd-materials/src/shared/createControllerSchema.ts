import { DESTORY_EVENT_NAME, INIT_EVENT_NAME } from "@rxdrag/minions"


export function createControllerSchema() {
  return [
    {
      componentName: "ReactionsInput",
      "x-field": {
        name: "x-controller",
        params: {
          withBind: true,
        }
      },
      props: {
        title: "$controller",
        events: [
          {
            name: INIT_EVENT_NAME,
            label: "$init",
          },
          {
            name: DESTORY_EVENT_NAME,
            label: "$destory",
          },
          {
            name: "onClick",
            label: "$onClick",
          },
        ],
      },
    },
  ]
}