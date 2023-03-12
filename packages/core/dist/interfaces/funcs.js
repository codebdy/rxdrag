import { makeRxId } from "utils/make-rxId";
import { NodeType, RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME } from "./types";
export function createAuxProps() {
    const rxId = makeRxId();
    return {
        [RXID_ATTR_NAME]: rxId,
        [RX_NODE_TYPE_ATTR_NAME]: NodeType.AuxWidget
    };
}

//# sourceMappingURL=funcs.js.map