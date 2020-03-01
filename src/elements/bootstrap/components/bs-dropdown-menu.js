import {HTMLDiv} from "../../html/html-div"
import {HTMLA} from "../../html/html-a"

export class BSDropdownMenu extends HTMLDiv{
  constructor(carousel, i, active) {
    super()
    this.carousel = carousel
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsDropdownMenu'
    this.toolboxInfo.elementName = "Dropdown Menu"
    this.className = 'BSDropdownMenu'
    this.editMarginStyle.padding = ''

    this.label = "dropdown menu"

    this.addClass('dropdown-menu')
  }

  make(){
    return new BSDropdownMenu
  }

  setDropdown(dropdown){
    this.dropdown = dropdown
    this.setAttribute('aria-labelledby', 'dropdown-button-' + dropdown.id)
    return this
  }

  configSelf(){
    this.pushChild(
      new HTMLA()
      .addClass('dropdown-item')
      .setAttribute('href',"#")
      .setInnerHTML('Action')
    )
    this.pushChild(
      new HTMLA()
      .addClass('dropdown-item')
      .setAttribute('href',"#")
      .setInnerHTML('Another action')
    )
    this.pushChild(
      new HTMLA()
      .addClass('dropdown-item')
      .setAttribute('href',"#")
      .setInnerHTML('Something else here')
    )
  }

}
