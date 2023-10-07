import { ControllerReaction } from "../../interfaces";
import { disable, enable } from "./button";
import { setDataSource } from "./list";
import { open, close } from "./popup"

export const predefinedReactions: Record<string, ControllerReaction> = {
  disable,
  enable,
  open,
  close,
  setDataSource,
}