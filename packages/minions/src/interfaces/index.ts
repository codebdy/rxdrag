
export type Navigate = (url: string) => void

export interface IReactionFactoryOptions {
  controllers?: ComponentControllers,
  materials?: IReactionMaterial[],
  form?: IForm,
  fieldPath?: string,
  //路由跳转
  navigate?: Navigate
}


