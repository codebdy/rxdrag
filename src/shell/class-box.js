import {RXComponent} from "../basic/rxcomponent"
import {OptionRow} from "./controls/option-row"

export class ClassBox extends RXComponent{
  constructor(){
    super()
    this.cssClass('bottom-view')
    this.pushChild(
      new RXComponent()
      .cssClass('view-header')
      .setInnerHTML('Over View')
    )
    this.viewContent = new RXComponent()
                      .cssClass('view-content')
                      .cssClass('over-view')
    this.pushChild(
      new RXComponent()
      .cssClass('view-body')
      .pushChild(this.viewContent)
    )
    
    this.valueChanged = (node)=>{}
  }

  editNode(node){
    this.clear()
    this.node = node
    this.showContent(node)
    //this.showContent_old(node)
    /*this.children.forEach((child)=>{
      child.render(this.$dom)
    })*/
  }

  cancelEdit(){
    this.node = ''
    //this.children.clear()
    //this.state.activedGroup = ''
    //this.setInnerHTML('')
    this.viewContent.clearChild()
    this.viewContent.refresh()
  }

  showContent(node){
    var meta = node.meta
    var schema = node.schema

    console.log(schema.overView)

    for(var fieldName in schema.overView){
      let fieldSchema = schema.overView[fieldName]
      let metaValue = meta[fieldName]
      let row = new OptionRow(metaValue, fieldSchema, fieldName)

      row.listenValueChaged((value, fdName)=>{
        node.meta[fdName] = value
        this.valueChanged(node)
      })

      this.viewContent.pushChild(row)
    }

    this.viewContent.refresh()
  }
}