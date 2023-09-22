import { ActivedOutline, DraggedAttenuator } from "./auxwidgets";
import { FreedomGhost, MoveableFollowerWidget, ResizeWidget } from "./auxwidgets/freedom";
import { ActiveController, SelectionController, StartDragController } from "./controllers";
import { FreedomDragStopController } from "./controllers/freedom/FreedomDragStopController";

export const freedomPlugins = [
  StartDragController,
  SelectionController,
  FreedomDragStopController,
  ActiveController,
  ActivedOutline,
  FreedomGhost,
  MoveableFollowerWidget,
  DraggedAttenuator,
  ResizeWidget,
]
