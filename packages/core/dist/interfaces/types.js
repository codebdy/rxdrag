export var NodeStatus;
(function(NodeStatus) {
    NodeStatus["Normal"] = "normal";
    NodeStatus["Disabled"] = "disabled";
})(NodeStatus || (NodeStatus = {}));
export var NodeType;
(function(NodeType) {
    NodeType["Node"] = "node";
    NodeType["Resource"] = "resource";
    NodeType["AuxWidget"] = "aux-widget";
})(NodeType || (NodeType = {}));
//===========================================>>>
// HTML Dom 附加属性，驱动模块根据该属性识别节点
export const RXID_ATTR_NAME = "rx-id";
export const RX_NODE_TYPE_ATTR_NAME = "rx-node-type" //对应枚举NodeType
;
export const RX_STATUS_ATTR_NAME = "rx-status" //对应枚举NodeStatus
;
export var DocumentSelectionMode;
(function(DocumentSelectionMode) {
    DocumentSelectionMode["Normal"] = "normal";
    DocumentSelectionMode["RangeSelection"] = "rangeSelection";
})(DocumentSelectionMode || (DocumentSelectionMode = {}));

//# sourceMappingURL=types.js.map