import {HTMLDiv} from "../../html/html-div"

export class BSCardBody extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCardBody'
    this.toolboxInfo.elementName = "CardBody"
    this.className = 'BSCardBody'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "card body"
    this.addClass('card-body')
  }

  make(){
    return new BSCardBody
  }

}
