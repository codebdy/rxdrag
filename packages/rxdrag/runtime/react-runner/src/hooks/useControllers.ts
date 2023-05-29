import { useContext } from "react";
import { EmpertyControllers, ControllerMetasContext } from "../contexts";
import { Controllers } from "@rxdrag/minions-runtime-react";

export function useControllers() {
  const schema = useContext<Controllers>(ControllerMetasContext) || EmpertyControllers
  return schema;
}