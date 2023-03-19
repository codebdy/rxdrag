import { useContext } from "react";
import { ToggleAblePaneContext, ToggleAblePaneParams } from "../context";

export function useToggleState(){
  const params = useContext<ToggleAblePaneParams>(ToggleAblePaneContext)
  return params;
}