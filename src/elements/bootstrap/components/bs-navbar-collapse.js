import {HTMLDiv} from "../../html/html-div"

import {BSNavbarNav} from "./bs-navbar-nav"
import {HTMLForm} from "../../html/html-form"
import {HTMLInput} from "../../html/html-input"
import {BSButton} from "./bs-button"

export class BSNavbarCollapse extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavbarCollapse'
    this.toolboxInfo.elementName = "NavbarCollapse"
    this.className = 'BSNavbarCollapse'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "navbar collapse"
    this.addClass('navbar-collapse')
    this.addClass('collapse')
  }

  make(){
    return new BSNavbarCollapse
  }

  setCollapseId(collapseId){
    this.collapseId = collapseId
    return this
  }

  configSelf(){
    console.log(this.collapseId)
    this.setAttribute('id', this.collapseId)
    this.pushChild(
      new BSNavbarNav().loadConfig()
    )

    this.pushChild(
      new HTMLForm()
      .addClass('form-inline')
      .addClass('my-2')
      .addClass('my-lg-0')
      .pushChild(
        new HTMLInput()
        .addClass('form-control')
        .addClass('mr-sm-2')
        .setAttribute('type','search')
        .setAttribute('placeholder', 'Search')
        .setAttribute('aria-label', 'search')
      )
      .pushChild(
        new BSButton()
        .addClass('btn')
        .addClass('btn-outline-success')
        .addClass('my-2')
        .addClass('my-sm-0')
        .setAttribute('type', 'submit')
        .setInnerHTML('Search')
      )

    )
  }

}
