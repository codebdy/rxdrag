import { DocumentActionPayload, IDocumentAction } from "core/interfaces"
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
      return {
        ...state,
        [action.payload?.documentId]: documentReduce(state[action.payload?.documentId], action)
      }
    }
  }
  return state
}
