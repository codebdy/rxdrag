function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
import { RXID_ATTR_NAME } from "interfaces";
import { makeRxId } from "utils/make-rxId";
import { isArr } from "utils/types";
export function parseNodeSchema(engine, documentId, schema, nodesById, isSlot, parentId) {
    const { children , slots ={}  } = schema, metaData = _objectWithoutProperties(schema, [
        "children",
        "slots"
    ]);
    const rxId = makeRxId();
    const locales = engine.getLoacalesManager();
    const components = engine.getComponentManager();
    const comDesigner = components.getComponentDesigner(metaData.componentName);
    const node = {
        id: rxId,
        isSlot,
        documentId,
        parentId: parentId,
        title: locales.getComponentMessage(schema.componentName, "title") || schema.componentName,
        description: locales.getComponentMessage(schema.componentName, "description") || undefined,
        children: [],
        meta: metaData,
        rxProps: {
            [RXID_ATTR_NAME]: rxId
        },
        designerSchema: comDesigner === null || comDesigner === void 0 ? void 0 : comDesigner.designerSchema,
        designerProps: comDesigner === null || comDesigner === void 0 ? void 0 : comDesigner.designerProps,
        //designerParams: comDesigner?.designerParams,
        slots: {}
    };
    for (const child of children || []){
        const childNode = parseNodeSchema(engine, documentId, child, nodesById, false, node.id);
        node.children.push(childNode.id);
    }
    for (const key of Object.keys(slots)){
        const slot = slots[key];
        if (slot && node.slots) {
            const slotNode = parseNodeSchema(engine, documentId, slot, nodesById, true, node.id);
            node.slots[key] = slotNode.id;
        }
    }
    nodesById[node.id] = node;
    return node;
}
export function paseNodes(engine, documentId, elements) {
    const nodesById = {};
    const els = isArr(elements) ? elements : [
        elements
    ];
    const nodes = els.map((element)=>parseNodeSchema(engine, documentId, element, nodesById, false));
    return {
        rootNodes: nodes,
        nodesById
    };
}

//# sourceMappingURL=parseNodeSchema.js.map