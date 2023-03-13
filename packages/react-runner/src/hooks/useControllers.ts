import { useContext } from "react";
import { Controllers } from "runner/minions";
import { EmpertyControllers, ControllersContext } from "../contexts";

export function useControllers() {
  const schema = useContext<Controllers>(ControllersContext) || EmpertyControllers
  return schema;
}