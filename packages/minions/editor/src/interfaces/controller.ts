
export interface IEventArgMeta {
  name: string,
  label?: string,
}

export interface IEventMeta {
  name: string,
  label: string,
  args?: IEventArgMeta[]
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
}

//控制器物料定义
export interface IControllerMaterial {
  props?: IPropsMeta[],
  events?: IEventMeta[],
  reactions?: IReactionMeta[],
}