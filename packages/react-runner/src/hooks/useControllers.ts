import { useContext } from "react";
import { ControllerEngineContext } from "../contexts";
import { ControllerEngine } from "../RuntimeRoot";

const EmpertyControllers = {}

export function useControllers() {
  const controllers = useContext<ControllerEngine | undefined>(ControllerEngineContext)?.controllers || EmpertyControllers
  return controllers;
}