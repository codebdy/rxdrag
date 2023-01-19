export const START_LINE = 'ReactionsEditor/START_LINE'
export const END_LINE = 'ReactionsEditor/END_LINE'

export enum ActionType {
  START_LINE = 'ReactionsEditor/START_LINE',
  END_LINE = 'ReactionsEditor/END_LINE'
}

export interface Action {
  type: ActionType
}
