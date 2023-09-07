import { IDesignerEngine } from "../../../../interfaces";
import { CornerHandler } from "./CornerHandler";
import { HandlerSize } from "./consts";

const svgIcon = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.5724 24.7292L20.5724 22.2351L15.1686 22.2351C15.1686 22.2351 11.9557 22.3331 10.8142 21.1916C9.67273 20.0501 9.76488 16.8313 9.76488 16.8313L9.76488 11.4276L7.27084 11.4276L10.5962 7.27084L13.9216 11.4276L11.4276 11.4276L11.4276 16C11.4276 16 11.2082 18.7753 12.2049 19.772C13.2015 20.7686 16 20.5724 16 20.5724L20.5724 20.5724L20.5724 18.0784L24.7292 21.4038L20.5724 24.7292Z" fill="white"/>
<path d="M20.0724 24.7292L20.0724 25.7695L20.8848 25.1196L25.0415 21.7942L25.5295 21.4038L25.0415 21.0133L20.8848 17.6879L20.0724 17.0381L20.0724 18.0784L20.0724 20.0724L16 20.0724L15.9825 20.0724L15.9653 20.0736L15.9653 20.0736L15.9652 20.0736L15.965 20.0736L15.9645 20.0737L15.96 20.074L15.9396 20.0752C15.9211 20.0763 15.8928 20.0778 15.856 20.0794C15.7824 20.0826 15.6748 20.0862 15.5421 20.0875C15.2758 20.0902 14.9125 20.0838 14.5218 20.048C14.129 20.012 13.722 19.9475 13.3631 19.8389C12.9975 19.7283 12.7247 19.5847 12.5584 19.4184C12.3924 19.2524 12.2503 18.9815 12.142 18.619C12.0357 18.263 11.9739 17.8593 11.9407 17.4698C11.9077 17.0824 11.904 16.7222 11.9088 16.4583C11.9112 16.3267 11.9156 16.2201 11.9194 16.1472C11.9213 16.1108 11.9231 16.0828 11.9243 16.0645L11.9257 16.0443L11.926 16.0399L11.926 16.0394L11.926 16.0392L11.926 16.0391L11.926 16.0391L11.9276 16.0197L11.9276 16L11.9276 11.9276L13.9216 11.9276L14.9619 11.9276L14.3121 11.1152L10.9867 6.95849L10.5962 6.47045L10.2058 6.95849L6.8804 11.1152L6.23053 11.9276L7.27084 11.9276L9.26488 11.9276L9.26488 16.8251L9.26478 16.8292L9.2642 16.8595C9.26377 16.8854 9.26331 16.9228 9.26316 16.9703C9.26285 17.0652 9.26376 17.2007 9.26853 17.3665C9.27804 17.6972 9.30304 18.152 9.36544 18.6461C9.42758 19.1381 9.52834 19.6815 9.69368 20.1848C9.85677 20.6812 10.0962 21.1806 10.4607 21.5451C10.8253 21.9097 11.3244 22.1487 11.8204 22.3113C12.3233 22.4761 12.8661 22.5761 13.3575 22.6375C13.8509 22.6992 14.305 22.7234 14.6352 22.7324C14.8007 22.7369 14.9361 22.7376 15.0309 22.7371C15.0783 22.7368 15.1156 22.7363 15.1415 22.7358L15.1717 22.7352L15.1754 22.7351L20.0724 22.7351L20.0724 24.7292Z" stroke="#363B3E"/>
</svg>

`
const iconUrl ='data:image/svg+xml;base64,' 
				+ window.btoa(decodeURIComponent(svgIcon))

const rotateCursor = `
url('${iconUrl}') 12 12, pointer
`
export class LeftBottomConner extends CornerHandler {
  constructor(container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(container, engine)
    this.htmlElement.style.transform = "translate(-50%, 50%)"
    this.htmlElement.style.cursor = "ne-resize"
    this.htmlElement.style.left = "0"
    this.htmlElement.style.bottom = "0"

    let rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = rotateCursor
    rightRotate.style.width = HandlerSize * 2 + 'px'
    rightRotate.style.height = HandlerSize * 3 + 'px'
    rightRotate.style.left = "-1px"
    rightRotate.style.top = "0"
    rightRotate.style.transform = "translate(-100%, 0)"

    this.hemlElementInner.appendChild(rightRotate)

    rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = rotateCursor
    rightRotate.style.width = HandlerSize * 3 + 'px'
    rightRotate.style.height = HandlerSize * 2 + 'px'
    rightRotate.style.right = "0"
    rightRotate.style.bottom = "-1px"
    rightRotate.style.transform = "translate(0, 100%)"
    this.hemlElementInner.appendChild(rightRotate)
  }
}