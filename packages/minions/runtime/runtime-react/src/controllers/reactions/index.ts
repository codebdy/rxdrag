import { ControllerReaction } from "../../interfaces";
import { disable, enable } from "./button";
import { getValue, reset, setValue, validate } from "./form";
import { setDataSource, setFilters, setPagination, setSorter } from "./list";
import { open, close } from "./popup"

export const predefinedReactions: Record<string, ControllerReaction> = {
  disable,
  enable,
  open,
  close,
  setDataSource,
  setPagination,
  setFilters,
  setSorter,
  validate,
  getValue,
  setValue,
  reset,
}