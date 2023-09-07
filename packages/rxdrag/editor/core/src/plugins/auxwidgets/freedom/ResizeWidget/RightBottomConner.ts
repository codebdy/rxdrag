import { IDesignerEngine } from "../../../../interfaces";
import { CornerHandler } from "./CornerHandler";
import { HandlerSize } from "./consts";

const svgIcon = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.7292 11.4276L22.2351 11.4276L22.2351 16.8314C22.2351 16.8314 22.3331 20.0443 21.1916 21.1858C20.0501 22.3273 16.8313 22.2351 16.8313 22.2351L11.4276 22.2351L11.4276 24.7292L7.27084 21.4038L11.4276 18.0784L11.4276 20.5724L16 20.5724C16 20.5724 18.7753 20.7918 19.772 19.7951C20.7686 18.7985 20.5724 16 20.5724 16L20.5724 11.4276L18.0784 11.4276L21.4038 7.27084L24.7292 11.4276Z" fill="white"/>
<path d="M24.7292 11.9276L25.7695 11.9276L25.1196 11.1152L21.7942 6.9585L21.4038 6.47045L21.0133 6.9585L17.6879 11.1152L17.0381 11.9276L18.0784 11.9276L20.0724 11.9276L20.0724 16L20.0724 16.0175L20.0736 16.0347L20.0736 16.0347L20.0736 16.0348L20.0736 16.035L20.0737 16.0355L20.074 16.04L20.0752 16.0604C20.0763 16.0789 20.0778 16.1072 20.0794 16.144C20.0826 16.2176 20.0862 16.3252 20.0875 16.4579C20.0902 16.7242 20.0838 17.0875 20.048 17.4782C20.012 17.871 19.9475 18.278 19.8389 18.6369C19.7283 19.0025 19.5847 19.2753 19.4184 19.4416C19.2524 19.6076 18.9815 19.7497 18.619 19.858C18.263 19.9643 17.8593 20.0261 17.4698 20.0593C17.0824 20.0923 16.7222 20.096 16.4583 20.0912C16.3267 20.0888 16.2201 20.0844 16.1472 20.0806C16.1108 20.0787 16.0828 20.0769 16.0645 20.0757L16.0443 20.0743L16.0399 20.074L16.0394 20.074L16.0392 20.074L16.0391 20.074L16.0391 20.074L16.0197 20.0724L16 20.0724L11.9276 20.0724L11.9276 18.0784L11.9276 17.0381L11.1152 17.6879L6.95849 21.0133L6.47045 21.4038L6.95849 21.7942L11.1152 25.1196L11.9276 25.7695L11.9276 24.7292L11.9276 22.7351L16.8251 22.7351L16.8292 22.7352L16.8595 22.7358C16.8854 22.7362 16.9228 22.7367 16.9703 22.7368C17.0652 22.7371 17.2007 22.7362 17.3665 22.7315C17.6972 22.722 18.152 22.697 18.6461 22.6346C19.1381 22.5724 19.6815 22.4717 20.1848 22.3063C20.6812 22.1432 21.1806 21.9038 21.5451 21.5393C21.9097 21.1747 22.1487 20.6756 22.3113 20.1796C22.4761 19.6767 22.5761 19.1339 22.6375 18.6425C22.6992 18.1491 22.7234 17.695 22.7324 17.3648C22.7369 17.1993 22.7376 17.0639 22.7371 16.9691C22.7368 16.9217 22.7363 16.8844 22.7358 16.8585L22.7352 16.8283L22.7351 16.8246L22.7351 11.9276L24.7292 11.9276Z" stroke="#363B3E"/>
</svg>

`
const iconUrl = 'data:image/svg+xml;base64,'
  + window.btoa(decodeURIComponent(svgIcon))

const rotateCursor = `
url('${iconUrl}') 12 12, pointer
`

export class RightBottomConner extends CornerHandler {
  constructor(container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(container, engine)
    this.htmlElement.style.transform = "translate(50%, 50%)"
    this.htmlElement.style.cursor = "nw-resize"
    this.htmlElement.style.right = "0"
    this.htmlElement.style.bottom = "0"

    let rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = rotateCursor
    rightRotate.style.width = HandlerSize * 2 + 'px'
    rightRotate.style.height = HandlerSize * 3 + 'px'
    rightRotate.style.right = "-1px"
    rightRotate.style.top = "0"
    rightRotate.style.transform = "translate(100%, 0)"

    this.hemlElementInner.appendChild(rightRotate)

    rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = rotateCursor
    rightRotate.style.width = HandlerSize * 3 + 'px'
    rightRotate.style.height = HandlerSize * 2 + 'px'
    rightRotate.style.left = "0"
    rightRotate.style.bottom = "-1px"
    rightRotate.style.transform = "translate(0, 100%)"
    this.hemlElementInner.appendChild(rightRotate)
  }
}