import {HTMLDiv} from "../../html/html-div"

export class BSCardFooter extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCardFooter'
    this.toolboxInfo.elementName = "CardFooter"
    this.className = 'BSCardFooter'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTFooter', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "card footer"
    this.addClass('card-footer')
  }

  make(){
    return new BSCardFooter
  }

}
