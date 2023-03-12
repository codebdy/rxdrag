import { State } from "core/reducers";
import { IDesignerEngine, IDesignerShell, IMonitor, INodeSchema, IDocument, IResourceManager, ID, IComponentManager, NodeBehavior, AbleCheckFunction } from "core/interfaces";
import { Store } from "redux";
import { ResourceManager } from "./ResourceManager";
import { DocumentImpl } from "core/classes/DocumentImpl";
import { invariant } from "core/utils/util-invariant";
import { IActions, IAction } from "core/interfaces/action";
import { Actions } from "core/actions";
import { ILocalesManager } from "core/interfaces/loacales";
import { LocalesManager } from "./LocalesManager";
import { CHANGE_ACTIVED_DOCUMENT, SET_LANGUAGE } from "core/actions/registry";
import { DefualtLang } from "core/reducers/lang";
import { ComponentManager } from "./ComponentManager";
import { IPlugin, IPluginFactory } from "core/interfaces/plugin";
import { isFn } from "core/utils/types";
import { IDecoratorManager } from "core/interfaces/decorator";
import { DecoratorManager } from "./DecoratorManager";

export class DesignerEngine implements IDesignerEngine {
	private documentsById: {
		[id: ID]: IDocument
	} = {}
	private resourceManager: IResourceManager
	private localesManager: ILocalesManager
	private actions: IActions
	private componentManager: IComponentManager
	private decoratorManager: IDecoratorManager
	private plugins: {
		[name: string]: IPlugin | undefined
	} = {}
	public constructor(private store: Store<State>,
		private shell: IDesignerShell,
		private monitor: IMonitor,
		plugins: IPluginFactory[],
		lang?: string
	) {
		this.localesManager = new LocalesManager(lang || DefualtLang)
		this.resourceManager = new ResourceManager(this.localesManager)
		this.decoratorManager = new DecoratorManager(this)
		this.actions = new Actions(this)
		this.componentManager = new ComponentManager(this)
		for (const pluginFactory of plugins) {
			this.registerPlugin(pluginFactory)
		}
	}
	getDecoratorManager(): IDecoratorManager {
		return this.decoratorManager
	}

	getComponentManager(): IComponentManager {
		return this.componentManager
	}
	getLoacalesManager(): ILocalesManager {
		return this.localesManager
	}
	getLanguage(): string {
		return this.getMonitor().getState().lang
	}
	setLanguage(lang: string): void {
		this.getLoacalesManager().setLanguage(lang)
		this.dispatch({
			type: SET_LANGUAGE,
			payload: lang
		})
	}

	getNodeDocument(nodeId: string): IDocument | null {
		const documentId = this.monitor.getNodeDocumentId(nodeId)
		invariant(documentId, "can not find node document id")
		return documentId ? this.getDocument(documentId) : null
	}

	getAllDocuments(): IDocument[] | null {
		const docs = []
		for (const key of Object.keys(this.documentsById)) {
			docs.push(this.documentsById[key])
		}
		return docs
	}

	setSelectionMode(mode: SelectionMode): void {
		throw new Error("Method not implemented.");
	}
	createDocument(schema: INodeSchema): IDocument {
		const doc = new DocumentImpl(schema, this, this.store)
		this.documentsById[doc.id] = doc
		this.dispatch({
			type: CHANGE_ACTIVED_DOCUMENT,
			payload: doc.id
		})
		return doc
	}
	getDocument(id: string): IDocument | null {
		return this.documentsById[id]
	}

	getResourceManager(): IResourceManager {
		return this.resourceManager
	}

	public getMonitor(): IMonitor {
		return this.monitor
	}

	public getShell(): IDesignerShell {
		return this.shell
	}

	public getActions(): IActions {
		return this.actions
	}

	public dispatch(action: IAction<any>): void {
		this.store.dispatch(action)
	}

	public destory(): void {
		for (const key of Object.keys(this.plugins)) {
			this.plugins[key]?.destory()
		}
		this.shell.destory()
	}

	getNodeBehavior(nodeId: ID): NodeBehavior {
		return {
			isDisabled: () => checkAbility("disabled", false, nodeId, this),
			isSelectable: () => checkAbility("selectable", true, nodeId, this),
			isDroppable: () => checkAbility("droppable", false, nodeId, this),
			isDraggable: () => checkAbility("draggable", true, nodeId, this),
			isDeletable: () => checkAbility("deletable", true, nodeId, this),
			isCloneable: () => checkAbility("cloneable", true, nodeId, this),
			isNoPlaceholder: () => checkAbility("noPlaceholder", false, nodeId, this),
			isNoRef: () => checkAbility("noRef", false, nodeId, this),
			isLockable: () => checkAbility("lockable", false, nodeId, this),
		}
	}

	registerPlugin(pluginFactory: IPluginFactory): void {
		const plugin = pluginFactory(this)
		this.plugins[plugin.name] = plugin
	}
	getPlugin(name: string): IPlugin | null {
		return this.plugins[name] || null
	}
}

export const checkAbility = (
	name: "disabled" | "selectable" | "droppable" | "draggable" | "deletable" | "cloneable" | "noPlaceholder" | "noRef" | "lockable",
	defaultValue: boolean,
	nodeId: ID,
	engine: IDesignerEngine
) => {
	const nodeRules = engine.getComponentManager().getNodeBehaviorRules(nodeId)
	for (const rule of nodeRules) {
		const able = ableCheck(defaultValue, nodeId, rule[name], engine)
		if (able !== defaultValue) {
			return able
		}
	}

	return defaultValue
}


const ableCheck = (defaultValue: boolean, nodeId: ID, able: boolean | AbleCheckFunction | undefined, engine: IDesignerEngine): boolean => {
	if (able === undefined) {
		return defaultValue
	}
	if (isFn(able)) {
		return able(nodeId, engine)
	}
	return able || false
}
