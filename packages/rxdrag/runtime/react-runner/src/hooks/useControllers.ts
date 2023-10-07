import { useContext } from "react";
import { EmpertyControllers, ControllersContext } from "../contexts";
import { IController } from "@rxdrag/minions-runtime-react";

export function useControllers() {
  const schema = useContext<Record<string, IController>>(ControllersContext) || EmpertyControllers
  return schema;
}