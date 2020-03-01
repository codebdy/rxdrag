import {HTMLUl} from "../../html/html-ul"
import {BSNavItem} from "./bs-nav-item"
import {BSNavLink} from "./bs-nav-link"

import tabsSchema from "../../schemas/components/nav/tabs"
import pillsSchema from "../../schemas/components/nav/pills"

export class BSNav extends HTMLUl{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNav'
    this.toolboxInfo.elementName = "Nav"
    this.className = 'BSNav'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']
    this.unshiftGroup({
      id:'navOptions',
      label:'Nav Options',
    })

    this.label = "nav"
    this.addClass('nav')
    this.addSchema(tabsSchema, 'navOptions')
    this.addSchema(pillsSchema, 'navOptions')
  }

  make(){
    return new BSNav
  }

  configSelf(){
    this.pushChild(
      new BSNavItem()
      .pushChild(
        new BSNavLink()
        .addClass('active')
        .setInnerHTML('Active')
        .setAttribute('href', '#')
      )
    )
    this.pushChild(
      new BSNavItem()
      .pushChild(
        new BSNavLink()
        .setInnerHTML('Link')
        .setAttribute('href', '#')
      )
    )
    this.pushChild(
      new BSNavItem()
      .pushChild(
        new BSNavLink()
        .setInnerHTML('Link')
        .setAttribute('href', '#')
      )
    )
    this.pushChild(
      new BSNavItem()
      .pushChild(
        new BSNavLink()
        .setInnerHTML('Disabled')
        .setAttribute('href', '#')
      )
    )
  }

}

