import {HTMLP} from "../../html/html-p"

export class BSCardText extends HTMLP{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCardText'
    this.toolboxInfo.elementName = "CardText"
    this.className = 'BSCardText'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "card text"
    this.addClass('card-text')
  }

  make(){
    return new BSCardText
  }

  configSelf(){
    this.setInnerHTML(`Some quick example text to build on the card title and make up the bulk of the card's content.`)
  }

}
