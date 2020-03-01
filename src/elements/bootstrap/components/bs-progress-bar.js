import {HTMLDiv} from "../../html/html-div"

//import {BSTextarea} from "./bs-textarea"

export class BSProgressBar extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsProgressBar'
    this.toolboxInfo.elementName = "ProgressBar"
    this.className = 'BSProgressBar'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = ''

    this.acceptedChildren=[]

    this.label = "progress bar"
    this.addClass('progress-bar')
    this.addClass('w-75')
  }

  make(){
    return new BSProgressBar
  }

  configSelf(){
    this.setAttribute('role', 'progressbar')
    this.setAttribute('aria-valuenow', '75')
    this.setAttribute('aria-valuemin', '0')
    this.setAttribute('aria-valuemax', '100')
  }

}
