import { State } from "core/reducers";
import { IDesignerEngine, IDesignerShell, IMonitor, INodeSchema, IBlocksSchema, IDocument, IResourceManager, ID, IComponentManager } from "core/interfaces";
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

export class DesignerEngine implements IDesignerEngine {
	private documentsById: {
		[id: ID]: IDocument
	} = {}
	private resourceManager: IResourceManager
	private localesManager: ILocalesManager
	private actions: IActions
	private componentManager: IComponentManager
	private plugins: {
		[name: string]: IPlugin | undefined
	} = {}
	public constructor(private store: Store<State>,
		private driverHub: IDesignerShell,
		private monitor: IMonitor,
		plugins: IPluginFactory[],
		lang?: string
	) {
		this.localesManager = new LocalesManager(lang || DefualtLang)
		this.resourceManager = new ResourceManager(this.localesManager)
		this.actions = new Actions(this)
		this.componentManager = new ComponentManager(this)
		for (const pluginFactory of plugins) {
			this.registerPlugin(pluginFactory)
		}
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
	createDocument(schema: INodeSchema | IBlocksSchema): IDocument {
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
		return this.driverHub
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
		this.driverHub.destory()
	}
	registerPlugin(pluginFactory: IPluginFactory): void {
		const plugin = pluginFactory(this)
		this.plugins[plugin.name] = plugin
	}
	getPlugin(name: string): IPlugin | null {
		return this.plugins[name] || null
	}
}