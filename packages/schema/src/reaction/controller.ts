import { IReactionMeta } from './meta';

export type InputHandler = (inputValue?: any) => void;

export interface IJointer {
  id: string;
  name: string;
  push: InputHandler;
  connect: (jointer: IJointer | InputHandler) => void;
  //disconnect: (jointer: IJointer | InputHandler) => void;
}

export interface IReaction {
  id: string;
  inputs: IJointer[];
  outputs: IJointer[];
  meta?: IReactionMeta;
  destory(): void;
}
