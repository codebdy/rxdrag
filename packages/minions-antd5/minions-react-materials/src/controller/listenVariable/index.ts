
export const listenVariableMaterial: IActivityMaterial<ReactNode> = {
  icon: listenVariableIcon,
  label: "$listenVariable",
  activityType: ActivityType.Activity,
  defaultPorts: {
    outPorts: [
      {
        id: createUuid(),
        name: "output",
        label: "",//"$startUp",
      },
    ],
  },
  schema: variableSchema,
  subTitle: (config?: IVariableConfig) => {
    return config?.variable
  },
  activityName: ListenVariableActivityName,
}
