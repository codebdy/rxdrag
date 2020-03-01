import {HTMLDiv} from "../../html/html-div"

import {BSProgressBar} from "./bs-progress-bar"

export class BSProgress extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsProgress'
    this.toolboxInfo.elementName = "Progress"
    this.className = 'BSProgress'

    this.editMarginStyle.padding = ''

    this.acceptedChildren=''
    this.rejectChildren = ['BSProgressBar']

    this.label = "progress"
    this.addClass('progress')
  }

  make(){
    return new BSProgress
  }

  configSelf(){
    this.pushChild(new BSProgressBar().loadConfig())
  }

}
