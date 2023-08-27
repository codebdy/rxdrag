import { IDispatchable, ICustomEvent, ISubscribable } from "./event"
import { ID, IRect } from "./types"

export interface IShellPane {
	id: ID
	getRootElement(): HTMLElement
	getElements(id: ID): HTMLElement[] | null
	//顶层容器的区域，主要为了iframe换算坐标
	getDocumentBodyRect(): IRect | null
	getNodeRect(nodeId: ID): IRect | null
	appendAux(child: HTMLElement): void
	contains(child: HTMLElement): boolean
	destroy(): void
}

export interface IDriver {
	teardown(): void
}

export type Canvases = {
	[documentId in ID]: IShellPane | undefined
}


//处理鼠标键盘事件，将其转换为 Engine 事件。
export interface IDesignerShell extends ISubscribable, IDispatchable<ICustomEvent<unknown>> {
	//状态
	dragging: boolean

	getContainer(): IShellPane | undefined
	setContainer(container: IShellPane): void

	getCanvas(documentId: ID): IShellPane | undefined
	getAllCanvases(): Canvases
	addCanvas(canvas: IShellPane): void
	removeCanvas(documentId: ID): void

	//一个组件可能会由多个Elements组成
	getElements(nodeId: ID): HTMLElement[] | null
	getTopRect(nodeId: ID): IRect | null
	destroy(): void
}

export type IDriverFactory = (
	shell: IDesignerShell,
	element: Element | Node | HTMLElement,
) => IDriver
