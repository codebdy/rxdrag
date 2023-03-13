export interface IReactionMaterial {
  //唯一名称
  name: string,
  label: string,
  reactionType: ReactionType,
  icon?: React.ReactNode,
  color?: string,
  //reaction?: IReaction,
  schema?: INodeSchema,
  meta?: IReactionNodeData,
  subTitle?: (config?: IConfigMeta) => string | undefined,
  reaction?: ReactionFactory
}

export type Navigate = (url: string) => void

export interface IReactionFactoryOptions {
  controllers?: ComponentControllers,
  materials?: IReactionMaterial[],
  form?: IForm,
  fieldPath?: string,
  //路由跳转
  navigate?: Navigate
}

export type ReactionFactory = (meta: IReactionMeta<IConfigMeta>, options: IReactionFactoryOptions) => IReaction
