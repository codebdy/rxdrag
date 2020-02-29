import {HTMLA} from "../../html/html-a"

export class BSCardLink extends HTMLA{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsCardLink'
    this.toolboxInfo.elementName = "CardLink"
    this.className = 'BSCardLink'

    this.label = "card link"
    this.addClass('card-link')
  }

  make(){
    return new BSCardLink
  }

}
