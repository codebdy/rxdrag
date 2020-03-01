import {HTMLUl} from "../../html/html-ul"
import {HTMLSpan} from "../../html/html-span"
import {BSListGroupItem} from "./bs-list-group-item"
import {BSBadge} from "./bs-badge"

import flushSchema from "../../schemas/components/list/flush"

export class BSListGroup extends HTMLUl{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsListGroup'
    this.toolboxInfo.elementName = "List Group"
    this.className = 'BSListGroup'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "list group"
    this.addClass('list-group')
    this.addSchema(flushSchema, 'listOptions')
  }

  make(){
    return new BSListGroup
  }

  configSelf(){
    this.pushChild(
      new BSListGroupItem()
      .addClass('active')
      .setInnerHTML('Cras justo odio')
    )
    this.pushChild(
      new BSListGroupItem()
      .addClass('disabled')
      .setInnerHTML('Dapibus ac facilisis in')
    )
    this.pushChild(
      new BSListGroupItem()
      .addClass('action')
      .setInnerHTML('Morbi leo risus')
    )
    this.pushChild(
      new BSListGroupItem()
      .addClass('action')
      .addClass('d-flex')
      .addClass('justify-content-between')
      .addClass('align-items-center')
      .pushChild(
        new HTMLSpan()
        .setInnerHTML('Porta ac consectetur ac')
      )
      .pushChild(
        new BSBadge()
        .setInnerHTML('8')
        .addClass('badge-primary')
        .addClass('badge-pill')
      )
    )
    this.pushChild(
      new BSListGroupItem()
      .addClass('action')
      .setInnerHTML('Porta ac consectetur ac ')
    )
    this.pushChild(
      new BSListGroupItem()
      .addClass('action')
      .setInnerHTML('Vestibulum at eros')
    )
  }

}

