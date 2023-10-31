import { ActivedOutline, GhostWidget, DraggedAttenuator } from "./auxwidgets";
import { SelectedOutline, InsertionCursor, Toolbar } from "./auxwidgets/liquid";
import { StartDragController, SelectionController, DragStopController, DragOverController, ActiveController } from "./controllers";

export const liquidPlugins = [
  StartDragController,
  SelectionController,
  DragStopController,
  DragOverController,
  ActiveController,
  ActivedOutline,
  SelectedOutline,
  GhostWidget,
  DraggedAttenuator,
  InsertionCursor,
  Toolbar,
]