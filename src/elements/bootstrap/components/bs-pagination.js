import {HTMLUl} from "../../html/html-ul"
import {HTMLSpan} from "../../html/html-span"
import {HTMLA} from "../../html/html-a"
import {BSPageItem} from "./bs-page-item"
import sizingSchema from "../../schemas/components/pagination/sizing"

export class BSPagination extends HTMLUl{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsPagination'
    this.toolboxInfo.elementName = "Pagination"
    this.className = 'BSPagination'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "pagination"
    this.unshiftGroup({
      id:'paginationOptions',
      label:'Pagination Options',
    })
    this.addSchema(sizingSchema, 'paginationOptions')

    this.addClass('pagination')
  }

  make(){
    return new BSPagination
  }

  configSelf(){
    this.pushChild(
      new BSPageItem()
      .addClass('disabled')
      .pushChild(
        new HTMLSpan()
        .addClass('page-link')
        .setInnerHTML('Previous')
      )
    )
    this.pushChild(
      new BSPageItem()
      .pushChild(
        new HTMLA()
        .addClass('page-link')
        .setAttribute('href', "#")
        .setInnerHTML('1')
      )
    )
    this.pushChild(
      new BSPageItem()
      .addClass('active')
      .pushChild(
        new HTMLSpan()
        .addClass('page-link')
        .setInnerHTML('2')
        .pushChild(
          new HTMLSpan()
          .addClass('sr-only')
          .setInnerHTML('(current)')
        )
      )
    )

    this.pushChild(
      new BSPageItem()
      .pushChild(
        new HTMLA()
        .addClass('page-link')
        .setAttribute('href', "#")
        .setInnerHTML('3')
      )
    )
    this.pushChild(
      new BSPageItem()
      .pushChild(
        new HTMLA()
        .addClass('page-link')
        .setAttribute('href', "#")
        .setInnerHTML('Next')
      )
    )

  }

}

