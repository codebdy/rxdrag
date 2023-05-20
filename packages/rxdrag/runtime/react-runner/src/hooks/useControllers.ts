import { useContext } from "react";
import { Controllers } from "@rxdrag/minions";
import { EmpertyControllers, ControllerMetasContext } from "../contexts";

export function useControllers() {
  const schema = useContext<Controllers>(ControllerMetasContext) || EmpertyControllers
  return schema;
}