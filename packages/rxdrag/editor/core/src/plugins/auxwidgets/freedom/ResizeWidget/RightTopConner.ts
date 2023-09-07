import { IDesignerEngine } from "../../../../interfaces";
import { CornerHandler } from "./CornerHandler";
import { HandlerSize } from "./consts";

const svgIcon = `
<svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4276 7.27084V9.76488H16.8313C16.8313 9.76488 20.0443 9.66693 21.1857 10.8084C22.3272 11.9499 22.2351 15.1686 22.2351 15.1686V20.5724H24.7291L21.4037 24.7292L18.0783 20.5724H20.5724V16C20.5724 16 20.7917 13.2247 19.7951 12.228C18.7985 11.2314 16 11.4276 16 11.4276H11.4276V13.9216L7.27081 10.5962L11.4276 7.27084Z" fill="white"/>
<path d="M11.9276 7.27084V6.23052L11.1152 6.8804L6.95847 10.2058L6.47042 10.5962L6.95847 10.9867L11.1152 14.3121L11.9276 14.9619V13.9216V11.9276H16H16.0175L16.0347 11.9264L16.0347 11.9264L16.0348 11.9264L16.0349 11.9264L16.0355 11.9263L16.04 11.926L16.0604 11.9248C16.0789 11.9237 16.1071 11.9222 16.1439 11.9206C16.2175 11.9174 16.3251 11.9138 16.4579 11.9125C16.7242 11.9098 17.0875 11.9162 17.4782 11.952C17.8709 11.988 18.278 12.0525 18.6369 12.1611C19.0025 12.2717 19.2752 12.4153 19.4415 12.5816C19.6075 12.7476 19.7496 13.0185 19.8579 13.381C19.9643 13.737 20.0261 14.1407 20.0593 14.5302C20.0923 14.9176 20.0959 15.2777 20.0912 15.5417C20.0888 15.6733 20.0843 15.7799 20.0805 15.8528C20.0786 15.8892 20.0769 15.9172 20.0757 15.9355L20.0743 15.9557L20.074 15.9601L20.0739 15.9606L20.0739 15.9608L20.0739 15.9609L20.0739 15.9609L20.0724 15.9803V16V20.0724H18.0783H17.038L17.6879 20.8848L21.0133 25.0415L21.4037 25.5295L21.7942 25.0415L25.1196 20.8848L25.7694 20.0724H24.7291H22.7351V15.1749L22.7352 15.1708L22.7358 15.1405C22.7362 15.1146 22.7367 15.0772 22.7368 15.0297C22.7371 14.9348 22.7362 14.7993 22.7314 14.6335C22.7219 14.3028 22.6969 13.848 22.6345 13.3539C22.5724 12.8619 22.4716 12.3184 22.3063 11.8152C22.1432 11.3188 21.9038 10.8194 21.5393 10.4549C21.1747 10.0903 20.6756 9.85126 20.1795 9.68867C19.6767 9.52386 19.1339 9.42385 18.6425 9.36245C18.1491 9.3008 17.6949 9.27655 17.3647 9.2676C17.1992 9.26311 17.0639 9.26244 16.9691 9.26291C16.9217 9.26314 16.8844 9.26367 16.8585 9.26415L16.8283 9.26479L16.8246 9.26488H11.9276V7.27084Z" stroke="#363B3E"/>
</svg>
`
const iconUrl ='data:image/svg+xml;base64,' 
				+ window.btoa(decodeURIComponent(svgIcon))

const rotateCursor = `
url('${iconUrl}') 12 12, pointer
`

export class RightTopConner extends CornerHandler {
  constructor(container: HTMLDivElement, protected engine: IDesignerEngine) {
    super(container, engine)
    this.htmlElement.style.transform = "translate(50%, -50%)"
    this.htmlElement.style.cursor = "ne-resize"
    this.htmlElement.style.right = "0"
    this.htmlElement.style.top = "0"

    let rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = rotateCursor
    rightRotate.style.width = HandlerSize * 2 + 'px'
    rightRotate.style.height = HandlerSize * 3 + 'px'
    rightRotate.style.right = "-1px"
    rightRotate.style.bottom = "0"
    rightRotate.style.transform = "translate(100%, 0)"

    this.hemlElementInner.appendChild(rightRotate)

    rightRotate = document.createElement('div')
    rightRotate.style.position = "absolute"
    rightRotate.style.cursor = rotateCursor
     rightRotate.style.width = HandlerSize * 3 + 'px'
    rightRotate.style.height = HandlerSize * 2 + 'px'
    rightRotate.style.left = "0"
    rightRotate.style.top = "-1px"
    rightRotate.style.transform = "translate(0, -100%)"
    this.hemlElementInner.appendChild(rightRotate)
  }
}