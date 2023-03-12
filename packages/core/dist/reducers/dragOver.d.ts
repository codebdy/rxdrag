import { DrageOverOptions, IAction } from "interfaces/action";
export type DragOverState = DrageOverOptions | null;
export declare function reduce(state: DragOverState | undefined, action: IAction<DrageOverOptions>): DragOverState;
