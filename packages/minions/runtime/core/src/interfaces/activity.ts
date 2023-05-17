import { IActivityDefine } from "@rxdrag/minions-schema";

export type InputHandler = (inputValue?: unknown) => void;

export interface IJointer {
  id: string;
  name: string;
  push: InputHandler;
  connect: (jointerInput: InputHandler) => void;
}

export interface IActivity {
  id: string;
  inputs: IJointer[];
  outputs: IJointer[];
  meta?: IActivityDefine;
  destory(): void;
}

export type ActivityFactory<ConfigMeta = unknown, ActivityFactoryOptions = unknown> = (
  meta: IActivityDefine<ConfigMeta>,
  options: ActivityFactoryOptions
) => IActivity;