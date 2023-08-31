import { RECOVER_SNAPSHOT, SELECT_NODES } from "../actions/registry"
import { IAction, ID, RecoverSnapshotPayload, SelectNodesPayload } from "../interfaces"

export type State = ID[] | null

export function selectedIds(
	state: State = null,
	action: IAction<SelectNodesPayload | RecoverSnapshotPayload>,
): State {
	const { payload } = action
	switch (action.type) {
		case SELECT_NODES:
			return (payload as SelectNodesPayload)?.targetIds || null
		case RECOVER_SNAPSHOT:
			return (payload as RecoverSnapshotPayload)?.snapshot.selectedIds
		default:
			return state
	}
}
