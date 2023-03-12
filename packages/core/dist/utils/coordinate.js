function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
import { before } from "./array-helper";
import { calcElementLayout } from "./element";
const dropInMargin = 8;
export var RelativePosition;
(function(RelativePosition) {
    RelativePosition["In"] = "in";
    RelativePosition["Left"] = "left";
    RelativePosition["Top"] = "top";
    RelativePosition["Right"] = "right";
    RelativePosition["Bottom"] = "bottom";
})(RelativePosition || (RelativePosition = {}));
export class Rect {
    get left() {
        return this.rect.x;
    }
    get right() {
        return this.rect.x + this.rect.width;
    }
    get top() {
        return this.rect.y;
    }
    get bottom() {
        return this.rect.y + this.rect.height;
    }
    isIn(eventData) {
        if (!eventData) {
            return false;
        }
        return this.left <= eventData.clientX && this.right >= eventData.clientX && this.top <= eventData.clientY && this.bottom >= eventData.clientY;
    }
    isOnLeft(event) {
        if (!event) {
            return false;
        }
        return this.left > event.clientX;
    }
    isOnRight(event) {
        if (!event) {
            return false;
        }
        return this.right < event.clientX;
    }
    isOnTop(event) {
        if (!event) {
            return false;
        }
        return this.top > event.clientY;
    }
    isOnBottom(event) {
        if (!event) {
            return false;
        }
        return this.bottom < event.clientY;
    }
    atOutPosition(event, layout) {
        if (!event || !this.isIn(event)) {
            return null;
        }
        let xRatio = (event.clientX - this.rect.x) / (this.rect.x + this.rect.width - event.clientX);
        let yRatio = (event.clientY - this.rect.y) / (this.rect.y + this.rect.height - event.clientY);
        if (layout === "horizontal") {
            if (xRatio <= 1) {
                return RelativePosition.Left;
            } else {
                return RelativePosition.Right;
            }
        } else {
            if (yRatio <= 1) {
                return RelativePosition.Top;
            } else {
                return RelativePosition.Bottom;
            }
        }
    }
    constructor(rect){
        this.rect = rect;
    }
}
export class PositionJudger {
    get dropInMargin() {
        var _this_node, _this_node_meta;
        let nodeName = (_this_node = this.node) === null || _this_node === void 0 ? void 0 : (_this_node_meta = _this_node.meta) === null || _this_node_meta === void 0 ? void 0 : _this_node_meta.componentName;
        if (!nodeName) {
            return 0;
        }
        return this.node.parentId ? dropInMargin : 0;
    }
    //在此区域内，算是拖入
    get dragInRect() {
        var _this_engine_getShell_getElement;
        const rect = (_this_engine_getShell_getElement = this.engine.getShell().getElement(this.node.id)) === null || _this_engine_getShell_getElement === void 0 ? void 0 : _this_engine_getShell_getElement.getBoundingClientRect();
        if (!rect) {
            return undefined;
        }
        return new Rect(_objectSpreadProps(_objectSpread({}, rect), {
            x: rect.x + this.dropInMargin,
            width: rect.width - this.dropInMargin * 2,
            y: rect.top + this.dropInMargin,
            height: rect.height - this.dropInMargin * 2
        }));
    }
    get rect() {
        var _this_engine_getShell_getElement;
        const rect = (_this_engine_getShell_getElement = this.engine.getShell().getElement(this.node.id)) === null || _this_engine_getShell_getElement === void 0 ? void 0 : _this_engine_getShell_getElement.getBoundingClientRect();
        if (!rect) {
            return undefined;
        }
        return new Rect(rect);
    }
    isDragIn(eventData) {
        var _this_dragInRect;
        return (_this_dragInRect = this.dragInRect) === null || _this_dragInRect === void 0 ? void 0 : _this_dragInRect.isIn(eventData);
    }
    firstChildAfterMouse(event, node) {
        let theNode = node || this.node;
        if (!theNode) {
            return;
        }
        for (let childId of theNode.children){
            const child = this.engine.getMonitor().getNode(childId);
            if (child && this.isAfterMouse(event, child)) {
                return child;
            }
        }
        return undefined;
    }
    isAfterMouse(event, node) {
        var _this_engine_getShell_getElement;
        let theNode = node || this.node;
        if (!theNode) {
            return false;
        }
        const { clientX , clientY  } = event;
        let rect = (_this_engine_getShell_getElement = this.engine.getShell().getElement(theNode.id)) === null || _this_engine_getShell_getElement === void 0 ? void 0 : _this_engine_getShell_getElement.getBoundingClientRect();
        if (!rect) {
            return false;
        }
        if (rect.left >= clientX) {
            return true;
        }
        if (rect.top >= clientY) {
            return true;
        }
        return false;
    }
    judgePosition(eventData) {
        if (this.isDragIn(eventData)) {
            var _this_node_children, _this_node_children1;
            //如果没有子节点
            if (!((_this_node_children = this.node.children) === null || _this_node_children === void 0 ? void 0 : _this_node_children.length)) {
                return {
                    targetId: this.node.id,
                    position: RelativePosition.In
                };
            }
            //鼠标后第一个子节点
            const afterChild = this.firstChildAfterMouse(eventData);
            const parent = (afterChild === null || afterChild === void 0 ? void 0 : afterChild.parentId) ? this.engine.getMonitor().getNode(afterChild === null || afterChild === void 0 ? void 0 : afterChild.parentId) : undefined;
            let beforeId = (afterChild === null || afterChild === void 0 ? void 0 : afterChild.id) ? before(afterChild.id, parent === null || parent === void 0 ? void 0 : parent.children) : (_this_node_children1 = this.node.children) === null || _this_node_children1 === void 0 ? void 0 : _this_node_children1[this.node.children.length - 1];
            let beforeChild = this.engine.getMonitor().getNode(beforeId);
            if (beforeChild && beforeChild.id !== this.node.id) {
                const element = this.engine.getShell().getElement(beforeChild.id);
                if (element) {
                    const layout = calcElementLayout(element);
                    if (layout === "horizontal") {
                        return {
                            targetId: beforeChild.id,
                            position: RelativePosition.Right
                        };
                    } else {
                        return {
                            targetId: beforeChild.id,
                            position: RelativePosition.Bottom
                        };
                    }
                } else {
                //console.error("can not find node element")
                }
            } else if (afterChild) {
                const element = this.engine.getShell().getElement(afterChild.id);
                if (element) {
                    const layout = calcElementLayout(element);
                    if (layout === "horizontal") {
                        return {
                            targetId: afterChild.id,
                            position: RelativePosition.Left
                        };
                    } else {
                        return {
                            targetId: afterChild.id,
                            position: RelativePosition.Top
                        };
                    }
                } else {
                //console.error("can not find node element")
                }
            }
            return null;
        } else {
            if (!this.node.parentId) {
                //console.log('undefined1')
                return null;
            }
            const element = this.engine.getShell().getElement(this.node.id);
            if (element) {
                var _this_rect;
                const layout = calcElementLayout(element);
                return {
                    targetId: this.node.id,
                    position: ((_this_rect = this.rect) === null || _this_rect === void 0 ? void 0 : _this_rect.atOutPosition(eventData, layout || "vertical")) || null
                };
            } else {
                //console.error("can not find node element")
                return null;
            }
        }
    }
    constructor(node, engine){
        this.node = node;
        this.engine = engine;
    }
}

//# sourceMappingURL=coordinate.js.map