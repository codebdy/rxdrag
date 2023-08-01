import { ILocalesManager } from "@rxdrag/locales"
import { INodeSchema } from "@rxdrag/schema"
import { IDocument, NodeBehavior } from "./document"
import { IDesignerShell } from "./shell"
import { IMonitor } from "./monitor"
import { IResourceManager } from "./resource"
import { ID } from "./types"
import { IAction, IActions } from "./action"
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
	getLocalesManager(): ILocalesManager
	getDecoratorManager(): IDecoratorManager
	getActions(): IActions

	registerPlugin(pluginFactory: IPluginFactory): void
	getPlugin(name: string): IPlugin | null

	dispatch(action: IAction<unknown>): void
	destroy(): void

	getNodeBehavior(nodeId: ID): NodeBehavior
}
