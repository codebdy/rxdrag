import {BSElement} from "./bselement"

export class BSW100 extends BSElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupGrid'
    this.toolboxInfo.elementId = 'bsw100'
    this.toolboxInfo.elementName = "Row Break"
    this.className = 'BSW100'
    this.editMarginStyle.padding = '10px'
    this.widthDropMargin = 15;
    this.acceptedChildren=[]


  }

  make(){
    return new BSW100
  }

  clone(){
    let copy = super.clone()
    copy.$meta.size.xs = this.$meta.size.xs
    copy.$meta.size.sm = this.$meta.size.sm
    copy.$meta.size.md = this.$meta.size.md
    copy.$meta.size.lg = this.$meta.size.lg
    copy.$meta.size.xl = this.$meta.size.xl
    return copy
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "w-100"
    model.classList.add('w-100')
    //model.classList.push.apply(model.classList, this.$meta.baseClass)
    //model.attributes.contentEditable = false
    return model
  }
}
