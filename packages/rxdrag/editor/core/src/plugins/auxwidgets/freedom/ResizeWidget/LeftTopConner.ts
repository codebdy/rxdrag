import { IDesignerEngine } from "../../../../interfaces";
import { CornerHandler } from "./CornerHandler";
import { HandlerSize } from "./consts";

const svgIcon = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.27084 20.5724L9.76489 20.5724L9.76489 15.1686C9.76489 15.1686 9.66694 11.9557 10.8084 10.8142C11.9499 9.67273 15.1687 9.76488 15.1687 9.76488L20.5724 9.76488L20.5724 7.27084L24.7292 10.5962L20.5724 13.9216L20.5724 11.4276L16 11.4276C16 11.4276 13.2247 11.2082 12.228 12.2049C11.2314 13.2015 11.4276 16 11.4276 16L11.4276 20.5724L13.9216 20.5724L10.5962 24.7292L7.27084 20.5724Z" fill="white"/>
<path d="M7.27084 20.0724L6.23053 20.0724L6.88041 20.8848L10.2058 25.0415L10.5962 25.5295L10.9867 25.0415L14.3121 20.8848L14.9619 20.0724L13.9216 20.0724L11.9276 20.0724L11.9276 16L11.9276 15.9825L11.9264 15.9653L11.9264 15.9653L11.9264 15.9652L11.9264 15.965L11.9263 15.9645L11.926 15.96L11.9248 15.9396C11.9237 15.9211 11.9222 15.8928 11.9206 15.856C11.9174 15.7824 11.9138 15.6748 11.9125 15.5421C11.9098 15.2758 11.9162 14.9125 11.952 14.5218C11.988 14.129 12.0525 13.722 12.1611 13.3631C12.2717 12.9975 12.4153 12.7247 12.5816 12.5584C12.7476 12.3924 13.0185 12.2503 13.381 12.142C13.737 12.0357 14.1407 11.9739 14.5302 11.9407C14.9176 11.9077 15.2778 11.904 15.5417 11.9088C15.6733 11.9112 15.7799 11.9156 15.8528 11.9194C15.8892 11.9213 15.9172 11.9231 15.9355 11.9243L15.9557 11.9257L15.9601 11.926L15.9606 11.926L15.9608 11.926L15.9609 11.926L15.9609 11.926L15.9803 11.9276L16 11.9276L20.0724 11.9276L20.0724 13.9216L20.0724 14.9619L20.8848 14.3121L25.0415 10.9867L25.5296 10.5962L25.0415 10.2058L20.8848 6.8804L20.0724 6.23053L20.0724 7.27084L20.0724 9.26488L15.1749 9.26488L15.1708 9.26478L15.1405 9.2642C15.1146 9.26376 15.0772 9.26331 15.0297 9.26316C14.9348 9.26285 14.7993 9.26376 14.6335 9.26853C14.3028 9.27804 13.848 9.30304 13.3539 9.36543C12.8619 9.42758 12.3184 9.52834 11.8152 9.69368C11.3188 9.85677 10.8194 10.0962 10.4549 10.4607C10.0903 10.8253 9.85126 11.3244 9.68868 11.8204C9.52387 12.3233 9.42386 12.8661 9.36246 13.3575C9.30081 13.8509 9.27656 14.305 9.2676 14.6352C9.26312 14.8007 9.26244 14.9361 9.26292 15.0309C9.26315 15.0783 9.26368 15.1156 9.26415 15.1415L9.26479 15.1717L9.26489 15.1754L9.26489 20.0724L7.27084 20.0724Z" stroke="#363B3E"/>
</svg>

`
const iconUrl = 'data:image/svg+xml;base64,'
  + window.btoa(decodeURIComponent(svgIcon))

const rotateCursor = `
url('${iconUrl}') 12 12, pointer
`

export class LeftTopConner extends CornerHandler {
  constructor(container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(container, engine)
    this.htmlElement.style.transform = "translate(-50%, -50%)"
    this.htmlElement.style.cursor = "nw-resize"
    this.htmlElement.style.left = "0"
    this.htmlElement.style.top = "0"

    let rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = rotateCursor
    rightRotate.style.width = HandlerSize * 2 + 'px'
    rightRotate.style.height = HandlerSize * 3 + 'px'
    rightRotate.style.left = "-1px"
    rightRotate.style.bottom = "-1px"
    rightRotate.style.transform = "translate(-100%, 0)"

    this.hemlElementInner.appendChild(rightRotate)

    rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = rotateCursor
    rightRotate.style.width = HandlerSize * 3 + 'px'
    rightRotate.style.height = HandlerSize * 2 + 'px'
    rightRotate.style.right = "-1px"
    rightRotate.style.top = "-1px"
    rightRotate.style.transform = "translate(0, -100%)"
    this.hemlElementInner.appendChild(rightRotate)
  }
}