import { Canvases, IRect, IShellPane } from 'core'
import { IDesignerShell } from 'core'
import { EventEngine } from 'core/interfaces/event'


export class DesignerShell extends EventEngine implements IDesignerShell {
	dragging: boolean = false
	private container?: IShellPane
	private canvases: Canvases = {}

	setContainer(el: IShellPane): void {
		this.container = el
	}

	getContainer(): IShellPane | undefined {
		return this.container
	}

	getCanvas(documentId: string): IShellPane | undefined {
		return this.canvases[documentId]
	}

	getAllCanvases(): Canvases {
		return this.canvases
	}

	addCanvas(canvas: IShellPane): void {
		this.canvases[canvas.id] = canvas
	}

	removeCanvas(documentId: string): void {
		const canvas = this.canvases[documentId]
		canvas?.destory()
		delete this.canvases[documentId]
	}

	getTopRect(nodeId: string): IRect | null {
		const rect = this.container?.getTopRect(nodeId)
		if (rect) {
			return rect
		}

		for (const key of Object.keys(this.canvases)) {
			const canvas = this.canvases[key]
			const rect = canvas?.getTopRect(nodeId)

			if (rect) {
				return rect
			}
		}

		return null
	}

	getElement(nodeId: string): HTMLElement | null {
		const ele = this.container?.getElement(nodeId)
		if (ele) {
			return ele as HTMLElement
		}

		for (const key of Object.keys(this.canvases)) {
			const canvas = this.canvases[key]
			const ele = canvas?.getElement(nodeId)

			if (ele) {
				return ele
			}
		}

		return null
	}

	public destory(): void {
		this.container?.destory()
		for (const key of Object.keys(this.canvases)) {
			this.canvases[key]?.destory()
		}
	}
}
