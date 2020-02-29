import {HTMLDiv} from "../../html/html-div"

export class BSCardHeader extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCardHeader'
    this.toolboxInfo.elementName = "CardHeader"
    this.className = 'BSCardHeader'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTHeader', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "card header"
    this.addClass('card-header')
  }

  make(){
    return new BSCardHeader
  }

}
