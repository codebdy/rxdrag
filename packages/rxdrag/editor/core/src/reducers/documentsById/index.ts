import { REMOVE_DOCUMENT } from "../../actions/registry"
import { DocumentActionPayload, IDocumentAction } from "../../interfaces"
import { documentReduce, DocumentState } from "./document"
export type DocumentByIdState = {
  [key: string]: DocumentState | undefined
}

export function documentsById(
  state: DocumentByIdState,
  action: IDocumentAction<DocumentActionPayload>,
): DocumentByIdState {
  if (action) {
    if (action.payload?.documentId) {
      if (action.type === REMOVE_DOCUMENT) {
        return {
          ...state,
          [action.payload?.documentId]: undefined
        }
      }
      const newState = {
        ...state,
        [action.payload?.documentId]: documentReduce(state[action.payload?.documentId], action)
      }
      return newState
    }
  }
  return state
}
