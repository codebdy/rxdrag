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
import { NodeType, RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME } from "interfaces";
import { makeRxId } from "utils/make-rxId";
export class ResourceManager {
    getResource(id) {
        //判断id
        for (const key of Object.keys(this.resources)){
            if (this.resources[key].id === id) {
                return this.resources[key];
            }
        }
        return null;
    }
    getResourceByName(name) {
        return this.resources[name];
    }
    registerResources(...resources) {
        const convertedResources = [];
        for (const resource of resources){
            const rxId = makeRxId();
            const node = _objectSpreadProps(_objectSpread({}, resource), {
                id: rxId,
                title: this.locales.getResouceMessage(resource.name || resource.name) || undefined,
                rxProps: {
                    [RXID_ATTR_NAME]: rxId,
                    [RX_NODE_TYPE_ATTR_NAME]: NodeType.Resource
                }
            });
            this.resources[resource.name] = node;
            convertedResources.push(node);
        }
        return convertedResources;
    }
    clear() {
        this.resources = {};
    }
    constructor(locales){
        this.locales = locales;
        this.resources = {};
    }
}

//# sourceMappingURL=ResourceManager.js.map