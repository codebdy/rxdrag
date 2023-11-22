import { State } from "../reducers";
import { IDesignerEngine, IDesignerShell, IMonitor, IDocument, IResourceManager, ID, IComponentManager, IComponentMaterial, IBehaviorManager } from "../interfaces";
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
import { IDecoratorManager } from "../interfaces/decorator";
import { DecoratorManager } from "./DecoratorManager";
import { IViewSchema } from "@rxdrag/schema";
import { ISetterManager } from "../interfaces/setter";
import { SetterManager } from "./SetterManager";
import { BehaviorManager } from "./BehaviorManager";

export class DesignerEngine<ComponentType = unknown, IconType = unknown> implements IDesignerEngine<ComponentType, IconType> {
	private documentsById: {
		[id in ID]: IDocument
	} = {}
	private resourceManager: IResourceManager<IconType>
	private localesManager: IRxDragLocalesManager
	private actions: IActions
	private componentManager: IComponentManager<ComponentType>
	private behaviorManager: IBehaviorManager
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
		this.behaviorManager = new BehaviorManager(this)
		for (const pluginFactory of plugins) {
			this.registerPlugin(pluginFactory)
		}
	}
	getBehaviorManager(): IBehaviorManager {
		return this.behaviorManager;
	}
	clearDocuments(): void {
		for (const id of Object.keys(this.documentsById)) {
			this.getDocument(id)?.destroy()
		}
		this.documentsById = {}
	}
	removeDocument(id: string): void {
		this.getDocument(id)?.destroy()
		delete this.documentsById[id]
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

	createDocument(documentSchema: IViewSchema): IDocument {
		const doc = new DocumentImpl(documentSchema.id, this, this.store)
		this.documentsById[doc.id] = doc
		doc.initialize(documentSchema)
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

	registerPlugin(pluginFactory: IPluginFactory): void {
		const plugin = pluginFactory(this)
		this.plugins[plugin.name] = plugin
	}
	getPlugin(name: string): IPlugin | null {
		return this.plugins[name] || null
	}

	registerMaterials(materials: IComponentMaterial<ComponentType, IconType>[]): void {
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

			if (material.setterLocales) {
				this.localesManager?.registerSetterLocales(material.setterLocales)
			}

			for (const key of Object.keys(material.slots || {})) {
				const slotMaterial = material.slots?.[key]
				if (slotMaterial === true || slotMaterial === undefined || isStr(slotMaterial)) {
					continue
				}
				this.registerMaterials([slotMaterial as IComponentMaterial<ComponentType, IconType>])
			}

			setters && this.setterManager.registerSetters(setters)

			if (material.resource && !this.resourceManager?.getResourceByName(material.resource.name)) {
				this.resourceManager?.registerResources(material.resource)
			}
		}
	}
}
