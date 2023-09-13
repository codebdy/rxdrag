import { ControllerFactories } from '@rxdrag/react-runner';
import { LOGICFLOW_TYPE_NAME, LogicFlowControllerFactory, SCRIPT_TYPE_NAME, ScriptControllerFactory } from "@rxdrag/minions-runtime-react";

export const controllerFactories: ControllerFactories = {
  [LOGICFLOW_TYPE_NAME]: LogicFlowControllerFactory,
  [SCRIPT_TYPE_NAME]: ScriptControllerFactory,
}