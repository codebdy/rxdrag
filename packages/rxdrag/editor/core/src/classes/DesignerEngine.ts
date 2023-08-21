import { State } from "../reducers";
import { IDesignerEngine, IDesignerShell, IMonitor, IDocument, IResourceManager, ID, IComponentManager, NodeBehavior, AbleCheckFunction, IComponentConfig } from "../interfaces";
import { Store } from "redux";
import { ResourceManager } from "./ResourceManager";
import { DocumentImpl } from "../classes/DocumentImpl";
import { invariant, isStr } from "@rxdrag/shared";
import { IActions, IAction } from "../interfaces/action";
import { Actions } from "../actions";
import { IRxDragLocalesManager, RxDragLocalesManager } from "@rxdrag/locales";
import { CHANGE_ACTIVED_DOCUMENT, SET_LANGUAGE } from "../actions/registry";
import { DefaultLang } from "../reducers/lang";
import { ComponentManager } from "./ComponentManager";
import { IPlugin, IPluginFactory } from "../interfaces/plugin";
import { isFn } from "@rxdrag/shared";
import { IDecoratorManager } from "../interfaces/decorator";
import { DecoratorManager } from "./DecoratorManager";
import { INodeSchema } from "@rxdrag/schema";
import { ISetterManager } from "../interfaces/setter";
import { SetterManager } from "./SetterManager";

export class DesignerEngine<ComponentType = unknown, IconType = unknown> implements IDesignerEngine<ComponentType, IconType> {
	private documentsById: {
		[id in ID]: IDocument
	} = {}
	private resourceManager: IResourceManager<IconType>
	private localesManager: IRxDragLocalesManager
	private actions: IActions
	private componentManager: IComponentManager<ComponentType>
	private decoratorManager: IDecoratorManager
	private setterManager: ISetterManager<ComponentType>

	private plugins: {
		[name: string]: IPlugin | undefined
	} = {}
	public constructor(private store: Store<State>,
		private shell: IDesignerShell,
		private monitor: IMonitor,
		plugins: IPluginFactory[],
		lang?: string
	) {
		this.localesManager = new RxDragLocalesManager(lang || DefaultLang)
		this.resourceManager = new ResourceManager<IconType>(this.localesManager)
		this.decoratorManager = new DecoratorManager(this as IDesignerEngine)
		this.setterManager = new SetterManager<ComponentType>()
		this.actions = new Actions(this)
		this.componentManager = new ComponentManager<ComponentType>(this)
		for (const pluginFactory of plugins) {
			this.registerPlugin(pluginFactory)
		}
	}
	getSetterManager(): ISetterManager<ComponentType> {
		return this.setterManager
	}

	getDecoratorManager(): IDecoratorManager {
		return this.decoratorManager
	}

	getComponentManager(): IComponentManager<ComponentType> {
		return this.componentManager
	}
	getLocalesManager(): IRxDragLocalesManager {
		return this.localesManager
	}
	getLanguage(): string {
		return this.getMonitor().getState().lang
	}
	setLanguage(lang: string): void {
		this.getLocalesManager().setLang(lang)
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

	getResourceManager(): IResourceManager<IconType> {
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public dispatch(action: IAction<any>): void {
		this.store.dispatch(action)
	}

	public destroy(): void {
		for (const key of Object.keys(this.plugins)) {
			this.plugins[key]?.destroy()
		}
		this.shell.destroy()
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

	registerMaterials(materials: IComponentConfig<ComponentType, IconType>[]): void {
		for (const material of materials) {
			//const designers = { [material.componentName]: material.designer }
			const setters = material.setters
			this.componentManager?.registerComponents(material)
			if (material.designerLocales) {
				this.localesManager?.registerComponentLocales(material.componentName, material.designerLocales)
			}
			if (material.resource?.resourceLocales) {
				this.localesManager?.registerResourceLocales(material.resource.resourceLocales)
			}

			if (material.toolsLocales) {
				this.localesManager?.registerSetterLocales(material.toolsLocales)
			}

			for (const key of Object.keys(material.slots || {})) {
				const slotMaterial = material.slots?.[key]
				if (slotMaterial === true || slotMaterial === undefined || isStr(slotMaterial)) {
					continue
				}
				this.registerMaterials([slotMaterial as IComponentConfig<ComponentType, IconType>])
			}

			setters && this.setterManager.registerSetters(setters)

			if (material.resource && !this.resourceManager?.getResourceByName(material.resource.name)) {
				this.resourceManager?.registerResources(material.resource)
			}
		}
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
