import { DraggedAttenuator } from "./auxwidgets";
import { FreedomActiviedOutline, FreedomGhost, MoveableFollowerWidget, ResizeWidget } from "./auxwidgets/freedom";
import { ActiveController, SelectionController, StartDragController } from "./controllers";
import { FreedomDragStopController } from "./controllers/freedom/FreedomDragStopController";

export const freedomPlugins = [
  StartDragController,
  SelectionController,
  FreedomDragStopController,
  ActiveController,
  FreedomActiviedOutline,
  FreedomGhost,
  MoveableFollowerWidget,
  DraggedAttenuator,
  ResizeWidget,
]
