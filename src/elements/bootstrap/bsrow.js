import {BSElement} from "./bselement"

export class BSRow extends BSElement{
  constructor(parent) {
    super()
    this.toolboxInfo.groupId = 'groupGrid'
    this.toolboxInfo.elementId = 'row'
    this.toolboxInfo.elementName = "Row"
    this.className = 'BSRow'
    this.heightDropMargin = 15;
    this.acceptedChildren=['BSCol','BSW100']

    this.$meta.baseClass = 'row' 
    this.editMarginStyle.margin = "0"

    this.$meta.gutters = ''

    this.$schema.groups = {
      'rowOptions':{
        label:'Row Options'
      }
    }
    
    this.$schema.fields={
      baseClass:{
        label:'Gutters',
        widget:'OpSwitch',
        required:true,
        group:'rowOptions',
        onValue:'',
        offValue:'no-gutters',
      }
    } 

  }
 
  make(){
    return new BSRow
  }
  clone(){
    let copy = super.clone()
    copy.$meta.gutters = this.$meta.gutters
    return copy
  }
 
  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Row"
    model.classList.push(this.$meta.baseClass)
    model.classList.push(this.$meta.gutters)
    return model
  }
}
