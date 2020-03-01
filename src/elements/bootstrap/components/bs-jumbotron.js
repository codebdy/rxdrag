import {HTMLDiv} from "../../html/html-div"

import {BSHeading} from "../content/bs-heading"
import {BSParagraph} from "../content/bs-paragraph"
import {HTMLHr} from "../../html/html-hr"
import {HTMLA} from "../../html/html-a"

export class BSJumbotron extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsJumbotron'
    this.toolboxInfo.elementName = "Jumbotron"
    this.className = 'BSJumbotron'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "jumbotron"
    this.addClass('jumbotron')
  }

  make(){
    return new BSJumbotron
  }

  configSelf(){
    this.addClass('text-center')
    this.pushChild(new BSHeading().addClass('display-4').setInnerHTML('Hello, world!'))
    this.pushChild(
      new BSParagraph()
      .addClass('lead')
      .setInnerHTML('This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.')
    )
    this.pushChild(
      new HTMLHr()
      .addClass('my-4')
    )
    this.pushChild(
      new BSParagraph()
      .setInnerHTML('It uses utility classes for typography and spacing to space content out within the larger container.')
    )
    this.pushChild(new HTMLA()
      .addClass('btn')
      .addClass('btn-primary')
      .addClass('btn-lg')
      .setAttribute('href','#')
      .setAttribute('role','button')
      .setInnerHTML('Learn more')
    )
  }

}
