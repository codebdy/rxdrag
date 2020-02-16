import textColor from "./text"
import backgroundColor from "./background"

export class UtilColor{
  constructor(){
    this.schema = {
      group:'utilities',
      label:'Color',
      isRowGroup:true,
      fields:{
        textColor : textColor,
        backgroundColor : backgroundColor,
      }
    }

    //只在初始化时有用，不接收返回值
    this.metaFragment = {
      textColor : '',
      backgroundColor : '',
    }

    this.fieldName = 'utilColor'
  }

  addon(node){
    this.node = node
    node.addons.push(this)
    node.addToGroup('utilities')
    node.$meta[this.fieldName] = this.metaFragment
    node.$schema.fields[this.fieldName] = this.schema
  }

  copyMeta(from, to){
    to.textColor = from.textColor
    to.backgroundColor = from.backgroundColor
  }

  toViewModel(model){
    let metaFragment = this.node.$meta[this.fieldName]
    model.classList.add(metaFragment.textColor)
    model.classList.add(metaFragment.backgroundColor)
  }
}
