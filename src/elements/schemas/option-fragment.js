export class OptionFragment{
  constructor(){
    this.schema = {
    }

    //只在初始化时有用，不接收返回值
    this.metaFragment = {
    }

    this.fieldName = ''
  }

  addon(node){
    this.node = node
    node.addons.push(this)
    node.addToGroup('utilities')
    node.$meta[this.fieldName] = this.metaFragment
    node.$schema.fields[this.fieldName] = this.schema
  }

  copyMeta(from, to){
  }

  toViewModel(model){
  }
}