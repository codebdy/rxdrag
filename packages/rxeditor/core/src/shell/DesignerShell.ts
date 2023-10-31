import { Canvases, IRect, IShellPane } from '../interfaces'
import { IDesignerShell } from '../interfaces'
import { EventEngine } from '../interfaces/event'


export class DesignerShell extends EventEngine implements IDesignerShell {
	dragStartEvent = undefined
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
		canvas?.destroy()
		delete this.canvases[documentId]
	}

	getNodeRect(nodeId: string): IRect | null {
		const rect = this.container?.getNodeRect(nodeId)
		if (rect) {
			return rect
		}

		for (const key of Object.keys(this.canvases)) {
			const canvas = this.canvases[key]
			const rect = canvas?.getNodeRect(nodeId)

			if (rect) {
				return rect
			}
		}

		return null
	}

	getElements(nodeId: string): HTMLElement[] | null {
		const eles = this.container?.getElements(nodeId)
		if (eles && eles.length) {
			return eles
		}

		for (const key of Object.keys(this.canvases)) {
			const canvas = this.canvases[key]
			const ele = canvas?.getElements(nodeId)

			if (ele?.length) {
				return ele
			}
		}

		return null
	}

	public destroy(): void {
		this.container?.destroy()
		for (const key of Object.keys(this.canvases)) {
			this.canvases[key]?.destroy()
		}
	}
}
