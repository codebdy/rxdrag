import { makeRxId } from "core/utils/make-rxId";
import { NodeType, RXID_ATTR_NAME, RxProps, RX_NODE_TYPE_ATTR_NAME } from "./types";

export function createAuxProps(): RxProps {
  const rxId = makeRxId()
  return {
    [RXID_ATTR_NAME]: rxId,
    [RX_NODE_TYPE_ATTR_NAME]: NodeType.AuxWidget
  }
}