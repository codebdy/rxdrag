import { IActivityDefine } from './meta';

export type InputHandler = (inputValue?: unknown) => void;

export interface IJointer {
  id: string;
  name: string;
  push: InputHandler;
  connect: (jointer: IJointer | InputHandler) => void;
  //disconnect: (jointer: IJointer | InputHandler) => void;
}

export interface IActivity {
  id: string;
  inputs: IJointer[];
  outputs: IJointer[];
  meta?: IActivityDefine;
  destory(): void;
}
