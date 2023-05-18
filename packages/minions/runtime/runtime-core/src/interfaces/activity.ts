
export type InputHandler = (inputValue?: unknown) => void;

export interface IJointer {
  id: string;
  name: string;
  push: InputHandler;
  connect: (jointerInput: InputHandler) => void;
}

export interface IActivityJointers {
  inputs: IJointer[];
  outputs: IJointer[];

  getOutputByName(name: string): IJointer|undefined
  getOutputById(id: string): IJointer|undefined
  getInputByName(name: string): IJointer|undefined
  getInputById(id: string): IJointer|undefined
}

export interface IActivity<ConfigMeta = unknown> {
  id: string;
  jointers: IActivityJointers,
  config?: ConfigMeta;
  destory(): void;
}

export type ActivityFactory<ConfigMeta = unknown, ActivityFactoryOptions = unknown> = (
  config: ConfigMeta,
  options: ActivityFactoryOptions
) => IActivity;