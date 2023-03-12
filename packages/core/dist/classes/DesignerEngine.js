import { ResourceManager } from "./ResourceManager";
import { DocumentImpl } from "classes/DocumentImpl";
import { invariant } from "utils/util-invariant";
import { Actions } from "actions";
import { LocalesManager } from "./LocalesManager";
import { CHANGE_ACTIVED_DOCUMENT, SET_LANGUAGE } from "actions/registry";
import { DefualtLang } from "reducers/lang";
import { ComponentManager } from "./ComponentManager";
import { isFn } from "utils/types";
import { DecoratorManager } from "./DecoratorManager";
export class DesignerEngine {
    getDecoratorManager() {
        return this.decoratorManager;
    }
    getComponentManager() {
        return this.componentManager;
    }
    getLoacalesManager() {
        return this.localesManager;
    }
    getLanguage() {
        return this.getMonitor().getState().lang;
    }
    setLanguage(lang) {
        this.getLoacalesManager().setLanguage(lang);
        this.dispatch({
            type: SET_LANGUAGE,
            payload: lang
        });
    }
    getNodeDocument(nodeId) {
        const documentId = this.monitor.getNodeDocumentId(nodeId);
        invariant(documentId, "can not find node document id");
        return documentId ? this.getDocument(documentId) : null;
    }
    getAllDocuments() {
        const docs = [];
        for (const key of Object.keys(this.documentsById)){
            docs.push(this.documentsById[key]);
        }
        return docs;
    }
    setSelectionMode(mode) {
        throw new Error("Method not implemented.");
    }
    createDocument(schema) {
        const doc = new DocumentImpl(schema, this, this.store);
        this.documentsById[doc.id] = doc;
        this.dispatch({
            type: CHANGE_ACTIVED_DOCUMENT,
            payload: doc.id
        });
        return doc;
    }
    getDocument(id) {
        return this.documentsById[id];
    }
    getResourceManager() {
        return this.resourceManager;
    }
    getMonitor() {
        return this.monitor;
    }
    getShell() {
        return this.shell;
    }
    getActions() {
        return this.actions;
    }
    dispatch(action) {
        this.store.dispatch(action);
    }
    destory() {
        for (const key of Object.keys(this.plugins)){
            var _this_plugins_key;
            (_this_plugins_key = this.plugins[key]) === null || _this_plugins_key === void 0 ? void 0 : _this_plugins_key.destory();
        }
        this.shell.destory();
    }
    getNodeBehavior(nodeId) {
        return {
            isDisabled: ()=>checkAbility("disabled", false, nodeId, this),
            isSelectable: ()=>checkAbility("selectable", true, nodeId, this),
            isDroppable: ()=>checkAbility("droppable", false, nodeId, this),
            isDraggable: ()=>checkAbility("draggable", true, nodeId, this),
            isDeletable: ()=>checkAbility("deletable", true, nodeId, this),
            isCloneable: ()=>checkAbility("cloneable", true, nodeId, this),
            isNoPlaceholder: ()=>checkAbility("noPlaceholder", false, nodeId, this),
            isNoRef: ()=>checkAbility("noRef", false, nodeId, this),
            isLockable: ()=>checkAbility("lockable", false, nodeId, this)
        };
    }
    registerPlugin(pluginFactory) {
        const plugin = pluginFactory(this);
        this.plugins[plugin.name] = plugin;
    }
    getPlugin(name) {
        return this.plugins[name] || null;
    }
    constructor(store, shell, monitor, plugins, lang){
        this.store = store;
        this.shell = shell;
        this.monitor = monitor;
        this.documentsById = {};
        this.plugins = {};
        this.localesManager = new LocalesManager(lang || DefualtLang);
        this.resourceManager = new ResourceManager(this.localesManager);
        this.decoratorManager = new DecoratorManager(this);
        this.actions = new Actions(this);
        this.componentManager = new ComponentManager(this);
        for (const pluginFactory of plugins){
            this.registerPlugin(pluginFactory);
        }
    }
}
export const checkAbility = (name, defaultValue, nodeId, engine)=>{
    const nodeRules = engine.getComponentManager().getNodeBehaviorRules(nodeId);
    for (const rule of nodeRules){
        const able = ableCheck(defaultValue, nodeId, rule[name], engine);
        if (able !== defaultValue) {
            return able;
        }
    }
    return defaultValue;
};
const ableCheck = (defaultValue, nodeId, able, engine)=>{
    if (able === undefined) {
        return defaultValue;
    }
    if (isFn(able)) {
        return able(nodeId, engine);
    }
    return able || false;
};

//# sourceMappingURL=DesignerEngine.js.map