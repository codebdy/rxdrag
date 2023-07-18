
//数据推送接口
export type InputHandler = (inputValue: unknown, context?:unknown) => void;

export interface IJointer {
  //当key使用，不参与业务逻辑
  id: string;
  name: string;
  //接收上一级Jointer推送来的数据
  push: InputHandler;
  //添加下游Jointer
  connect: (jointerInput: InputHandler) => void;
}

export interface IActivityJointers {
  //入端口对应的连接器
  inputs: IJointer[];
  //处端口对应的连接器
  outputs: IJointer[];

  //通过端口名获取出连接器
  getOutput(name: string): IJointer | undefined
  //通过端口名获取入连接器
  getInput(name: string): IJointer | undefined
}

//活动接口，一个实例对应编排图一个元件节点，用于实现元件节点的业务逻辑
export interface IActivity<ConfigMeta = unknown> {
  id: string;
  //连接器，跟元件节点的端口异议对应
  jointers: IActivityJointers,
  //元件节点配置，每个Activity的配置都不一样，故而用泛型
  config?: ConfigMeta;
  //销毁
  destory(): void;
}