import {BSButton} from "./bs-button"

export class BSDropdownButton extends BSButton{
  constructor(carousel, i, active) {
    super()
    this.carousel = carousel
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsDropdownButton'
    this.toolboxInfo.elementName = "DropdownButton"
    this.className = 'BSDropdownButton'
    this.editMarginStyle.padding = ''

    this.label = "dropdown button"

    this.addClass('btn-secondary')
    this.addClass('dropdown-toggle')
    this.setAttribute('type', 'button')
    this.setAttribute('id', 'dropdown-button-' + this.id)
    this.setAttribute('data-toggle', 'dropdown')
    this.setAttribute('aria-haspopup', 'true')
    this.setAttribute('aria-expanded', 'false')
    this.setInnerHTML('Dropdown button')


    this.onclick = (event)=>{
      event.stopPropagation()
      this.state.onClick(event)
      this.dropdown.tongle()
    }
  }

  make(){
    return new BSDropdownButton
  }

  setDropdown(dropdown){
    this.dropdown = dropdown
    this.setAttribute('id', 'dropdown-button-' + dropdown.id)
    return this
  }

}
