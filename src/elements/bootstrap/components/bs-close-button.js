import {RXElement} from "../../rxelement"

export class BSCloseButton extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCloseButton'
    this.toolboxInfo.elementName = "Close Button"
    this.className = 'BSCloseButton'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}


    this.meta.tag = 'button'
    this.meta.innerHTML = '<span aria-hidden="true">&times;</span>'
    this.label = "close"
    this.acceptedChildren=[]

    this.addClass('close')
    this.setAttribute('type', 'button')
    this.setAttribute('data-dismiss', 'alert')
    this.setAttribute('aria-label', 'close')

  }

  make(){
    return new BSCloseButton
  }

}
