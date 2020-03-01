import {HTMLDiv} from "../../html/html-div"
import {HTMLH} from "../../html/html-h"

import {BSDropdownButton} from "./bs-dropdown-button"
import {BSDropdownMenu} from "./bs-dropdown-menu"

export class BSDropdown extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsDropdown'
    this.toolboxInfo.elementName = "Dropdown"
    this.className = 'BSDropdown'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    this.acceptedChildren=[]

    this.label = "dropdown"
    this.addClass('dropdown')
    this.button = new BSDropdownButton()
                  .setDropdown(this)
                  .loadConfig()
    this.menu = new BSDropdownMenu()
                  .setDropdown(this)
                  .loadConfig()
  }

  make(){
    return new BSDropdown
  }

  tongle(){
    this.view.$dom.classList.toggle('show')
    this.menu.view.$dom.classList.toggle('show')
  }

  configSelf(){
    this.pushChild(this.button)
    this.pushChild(this.menu)
  }

  clone(){
    let copy = this.make()
    copy.button = this.button.clone().setDropdown(copy)
    copy.menu = this.menu.clone().setDropdown(copy)
    copy.configSelf()
    return copy
  }

}
