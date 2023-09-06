import { ActivedOutline, DraggedAttenuator } from "./auxwidgets";
import { FreedomGhost, MoveableFollowerWidget } from "./auxwidgets/freedom";
import { ActiveController, DragOverController, DragStopController, SelectionController, StartDragController } from "./controllers";

export const freedomPlugins = [
  StartDragController,
  SelectionController,
  DragStopController,
  DragOverController,
  ActiveController,
  ActivedOutline,
  FreedomGhost,
  MoveableFollowerWidget,
  DraggedAttenuator,
]
