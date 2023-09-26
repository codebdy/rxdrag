import { DESTROY_EVENT_NAME, INIT_EVENT_NAME } from "@rxdrag/minions-runtime-react";

export interface IComponentEvent {
  name: string,
  label?: string,
}

export function createControllerSchema(events?: IComponentEvent[]) {
  return [
    {
      componentName: "ControllerSetter",
      "x-field": {
        name: "x-controller",
      },
      props: {
        title: "$controller",
        events: [
          {
            name: INIT_EVENT_NAME,
            label: "$init",
          },
          {
            name: DESTROY_EVENT_NAME,
            label: "$destroy",
          },
          ...events || [],
        ],
      },
    },
  ]
}