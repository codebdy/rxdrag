import { IDocument, INodeSchema, NodeBehavior } from "./document"
import { IDesignerShell } from "./shell"
import { IMonitor } from "./monitor"
import { IResourceManager } from "./resource"
import { ID } from "./types"
import { IAction, IActions } from "core/interfaces/action"
import { ILocalesManager } from "./loacales"
import { IComponentManager } from "./component"
import { IPlugin, IPluginFactory } from "./plugin"
import { IDecoratorManager } from "./decorator"

export interface IDesignerEngine {
	getLanguage(): string
	setLanguage(lang: string): void
	setSelectionMode(mode: SelectionMode): void
	createDocument(schema: INodeSchema): IDocument,
	getDocument(id: ID): IDocument | null,
	getNodeDocument(nodeId: ID): IDocument | null,
	getAllDocuments(): IDocument[] | null

	getMonitor(): IMonitor
	getShell(): IDesignerShell
	getComponentManager(): IComponentManager
	getResourceManager(): IResourceManager
	getLoacalesManager(): ILocalesManager
	getDecoratorManager(): IDecoratorManager
	getActions(): IActions

	registerPlugin(pluginFactory: IPluginFactory): void
	getPlugin(name: string): IPlugin | null

	dispatch(action: IAction<any>): void
	destory(): void

	getNodeBehavior(nodeId: ID): NodeBehavior
}
