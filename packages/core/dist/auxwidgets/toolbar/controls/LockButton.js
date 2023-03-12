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
import { AbstractButton } from "./AbstractButton";
const lockIcon = `
<svg style="width:13px;height:13px" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" ><path d="M512 768c-17.664 0-32-14.304-32-32l0-96c0-17.696 14.336-32 32-32s32 14.304 32 32l0 96C544 753.696 529.664 768 512 768z"></path><path d="M832 960 192 960c-52.928 0-96-43.072-96-96L96 512c0-52.928 43.072-96 96-96l640 0c52.928 0 96 43.072 96 96l0 352C928 916.928 884.928 960 832 960zM192 480c-17.632 0-32 14.368-32 32l0 352c0 17.664 14.368 32 32 32l640 0c17.664 0 32-14.336 32-32L864 512c0-17.632-14.336-32-32-32L192 480z"></path><path d="M736 480c-17.696 0-32-14.336-32-32L704 318.016C704 209.248 601.76 128 510.336 128 416.768 128 320 198.912 320 317.568L320 448c0 17.664-14.336 32-32 32s-32-14.336-32-32L256 317.568C256 158.848 385.312 64 510.336 64 632.224 64 768 168.32 768 318.016L768 448C768 465.664 753.696 480 736 480z"></path></svg>
`;
const unlockIcon = `
<svg style="width:13px;height:13px" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M785.066667 416H381.866667v-121.6c0-74.666667 61.866667-134.4 138.666666-134.4 59.733333 0 113.066667 36.266667 132.266667 91.733333 6.4 17.066667 23.466667 25.6 40.533333 19.2 17.066667-6.4 25.6-23.466667 19.2-40.533333-27.733333-81.066667-104.533333-134.4-192-134.4-110.933333 0-202.666667 89.6-202.666666 198.4v121.6h-78.933334c-55.466667 0-100.266667 44.8-100.266666 100.266667v311.466666c0 55.466667 44.8 100.266667 100.266666 100.266667h546.133334c55.466667 0 100.266667-44.8 100.266666-100.266667V516.266667c0-55.466667-44.8-100.266667-100.266666-100.266667z m36.266666 411.733333c0 19.2-17.066667 36.266667-36.266666 36.266667H238.933333c-19.2 0-36.266667-17.066667-36.266666-36.266667V516.266667c0-19.2 17.066667-36.266667 36.266666-36.266667h546.133334c19.2 0 36.266667 17.066667 36.266666 36.266667v311.466666z"></path><path d="M512 544c-17.066667 0-32 14.933333-32 32v106.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-106.666667c0-17.066667-14.933333-32-32-32z"></path></svg>
`;
export class LockButton extends AbstractButton {
    onRender(node) {
        const behavior = this.engine.getNodeBehavior(node.id);
        if (!behavior.isLockable()) {
            this.teardown();
            return null;
        }
        this.locked = node.meta.locked;
        const htmlEl = this.createHtmlElement();
        htmlEl.innerHTML = node.meta.locked ? unlockIcon : lockIcon;
        htmlEl.addEventListener("click", this.handleLock);
        this.htmlEl = htmlEl;
        return htmlEl;
    }
    teardown() {
        if (this.htmlElement) {
            this.htmlElement.removeEventListener("click", this.handleLock);
        }
        super.teardown();
    }
    constructor(engine){
        super("default.lock-button", engine);
        this.engine = engine;
        this.handleLock = ()=>{
            const node = this.engine.getMonitor().getCurrentNode();
            if (node && this.htmlEl) {
                const doc = this.engine.getNodeDocument(node.id);
                this.locked = !this.locked;
                doc === null || doc === void 0 ? void 0 : doc.changeNodeMeta(node.id, _objectSpreadProps(_objectSpread({}, node.meta), {
                    locked: this.locked
                }));
                this.htmlEl.innerHTML = this.locked ? unlockIcon : lockIcon;
            }
        };
    }
}

//# sourceMappingURL=LockButton.js.map