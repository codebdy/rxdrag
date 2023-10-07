export interface IEventMeta {
  name: string,
  label: string,
  //其它公司在用，本项目暂时不使用
  async?: boolean,
  //其它公司在用，本项目暂时不使用
  isRunBack?: boolean
}

export interface IPropsMeta {
  name: string,
  label?: string,
}

//组件交互单元，用于在编排中通过控制器控制组件行为
//在行为流画布上，体现为一个编排元件，入口为name
//比如'打开'对话框
export interface IReactionMeta {
  name: string,
  label?: string,
  //这个不能放在设计器部分，需要放在运行时
  //action: (options: { input: unknown, context: unknown, controller: IController }) => void
}

//控制器物料定义
export interface IControllerMaterial {
  props?: IPropsMeta[],
  events?: (IEventMeta)[],
  reactions?: IReactionMeta[],
}