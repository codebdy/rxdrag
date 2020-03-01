import {BSButton} from "./bs-button"

export class BSPopover extends BSButton{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsPopover'
    this.toolboxInfo.elementName = "Popover"
    this.className = 'BSPopover'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "popover"
  }

  make(){
    return new BSPopover
  }

  configSelf(){
    this.addClass('btn-secondary')
    this.setAttribute('data-container','body')
    this.setAttribute('data-toggle','popover')
    this.setAttribute('data-placement','right')
    this.setAttribute('data-content','Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')
    this.setAttribute('title','Dismissible popover')
  }

}

