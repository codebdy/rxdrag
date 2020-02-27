import {RXComponent} from "../basic/rxcomponent"
import {ToolGroup, ToolboxState} from "./controls/tool-group"
import {OptionRow, OptionResponsiveRow} from "./controls/option-row"
import {OptionRowGroup} from "./controls/option-row-group"
import {getFieldMetaValue, setFiedlMetaValue} from "./class-data-extractor"


export class OptionBoxGroup extends ToolGroup{
  constructor(title, id, groupsState){
    super(title, id, groupsState)
  }

  add(optionRow){
    this.groupBody.pushChild(optionRow)
    return this
  }
}

export class OptionBox extends RXComponent{
  constructor(){
    super()
    this.screenWidth = 'md'
    this.state = new ToolboxState
    this.cssClass('toolbox')
    this.noFocusInnerHtml = `<div style="padding:20px;">No elements selected</div>`
    this.innerHTML = this.noFocusInnerHtml
    this.valueChanged = (node)=>{}
  }

  resizeScreen(screenWidth){
    this.screenWidth = screenWidth
    if(this.node){
      //this.initGroup(this.node.schema.groups)
      this.editNode(this.node)
      let activedGroup = this.state.activedGroup
      this.state.activedGroup = ''
      this.state.activedGroup = activedGroup
    }
  }

  editNode(node){
    this.clear()
    this.node = node
    this.showContent(node)
    //this.showContent_old(node)
    this.children.forEach((child)=>{
      child.render(this.$dom)
    })
  }

  cancelEdit(){
    this.node = ''
    this.children.clear()
    this.state.activedGroup = ''
    this.setInnerHTML(this.noFocusInnerHtml)
  }

  showContent(node){
    var schema = node.schema
    this.initGroup(schema.groups)
    schema.fields.forEach((fieldSchema)=>{
      let row = this.creatRow(node, fieldSchema)
      row.listenValueChaged((value, fdSchema)=>{
        setFiedlMetaValue(value, node, fdSchema)
        this.valueChanged(node)
      })
      this.getGroup(fieldSchema.group).add(row)
    })

    if(this.children.length > 0){
      this.children.first()
                   .cssClass('no-title-top-border')
                   .active()
    }
  }

  creatRow(node, fieldSchema){
    let metaValue = getFieldMetaValue(node, fieldSchema)
    var row
    if(fieldSchema.isRowGroup){
      row = new OptionRowGroup(node, fieldSchema, this.screenWidth)
    }
    else if(fieldSchema.isResponsive){
      row = new OptionResponsiveRow(metaValue, fieldSchema, this.screenWidth)
    }
    else{
      row = new OptionRow(metaValue, fieldSchema)
    }

    return row
  }

  initGroup(groups){
    groups.forEach((group)=>{
      let groupCtrl = new OptionBoxGroup(group.label, group.id, this.state)
      this[group.id] = groupCtrl
      this.pushChild(groupCtrl)
    })
  }


  getGroup(group){
    console.log(group)
    if(this[group]){
      return this[group]
    }
  }

  clear(){
    this.children.clear()
    this.setInnerHTML('')
  }

}

