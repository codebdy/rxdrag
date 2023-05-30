import { useContext } from "react";
import { EmpertyControllers, ControllersContext } from "../contexts";
import { Controllers } from "@rxdrag/minions-runtime-react";

export function useControllers() {
  const schema = useContext<Controllers>(ControllersContext) || EmpertyControllers
  return schema;
}