
export type InputHandler = (inputValue?: unknown) => void;

export interface IJointer {
  //当key使用，不参与业务逻辑
  id: string;
  name: string;
  push: InputHandler;
  connect: (jointerInput: InputHandler) => void;
}

export interface IActivityJointers {
  inputs: IJointer[];
  outputs: IJointer[];

  getOutput(name: string): IJointer | undefined
  getInput(name: string): IJointer | undefined
}

export interface IActivity<ConfigMeta = unknown> {
  id: string;
  jointers: IActivityJointers,
  config?: ConfigMeta;
  destory(): void;
}