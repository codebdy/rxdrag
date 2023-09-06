import { ActivedOutline, GhostWidget, DraggedAttenuator } from "./auxwidgets";
import { MoveableFollowerWidget } from "./auxwidgets/freedom";
import { ActiveController, DragOverController, DragStopController, SelectionController, StartDragController } from "./controllers";

export const freedomPlugins = [
  StartDragController,
  SelectionController,
  DragStopController,
  DragOverController,
  ActiveController,
  ActivedOutline,
  GhostWidget,
  MoveableFollowerWidget,
  DraggedAttenuator,
]
