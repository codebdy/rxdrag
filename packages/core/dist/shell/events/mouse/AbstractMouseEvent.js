import { getRecentRxElement } from "shell/utils/getRecentRxElement";
import { NodeType, RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME, RX_STATUS_ATTR_NAME } from "interfaces";
export class AbstractMouseEvent {
    transformCoordinates() {
        var _this_data;
        const { frameElement  } = ((_this_data = this.data) === null || _this_data === void 0 ? void 0 : _this_data.view) || {};
        if (frameElement) {
            var _this_data_view, _this_data_view1;
            const frameRect = frameElement.getBoundingClientRect();
            const scale = frameRect.width / frameElement['offsetWidth'];
            this.data.topClientX = this.data.clientX * scale + frameRect.x;
            this.data.topClientY = this.data.clientY * scale + frameRect.y;
            this.data.topPageX = this.data.pageX + frameRect.x - (((_this_data_view = this.data.view) === null || _this_data_view === void 0 ? void 0 : _this_data_view.scrollX) || 0);
            this.data.topPageY = this.data.pageY + frameRect.y - (((_this_data_view1 = this.data.view) === null || _this_data_view1 === void 0 ? void 0 : _this_data_view1.scrollY) || 0);
            const topElement = document.elementFromPoint(this.data.topPageX, this.data.topClientY);
            if (topElement !== frameElement) {
                this.data.target = topElement;
            }
        } else {
            this.data.topClientX = this.data.clientX;
            this.data.topClientY = this.data.clientY;
            this.data.topPageX = this.data.pageX;
            this.data.topPageY = this.data.pageY;
        }
    }
    constructor(data, e){
        this.getRxProps = (target)=>{
            const rxId = target.getAttribute(RXID_ATTR_NAME);
            const nodeType = target.getAttribute(RX_NODE_TYPE_ATTR_NAME);
            const nodeStatus = target.getAttribute(RX_STATUS_ATTR_NAME);
            if (rxId) {
                return {
                    rxId,
                    nodeType: nodeType || NodeType.Node,
                    nodeStatus
                };
            }
        };
        this.data = data || {
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            target: null,
            view: e.view
        };
        this.orginalEvent = e;
        const rxTarget = getRecentRxElement(data.target);
        this.data.targetRx = rxTarget && this.getRxProps(rxTarget);
        this.transformCoordinates();
    }
}

//# sourceMappingURL=AbstractMouseEvent.js.map