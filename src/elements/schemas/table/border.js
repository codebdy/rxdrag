import {OptionFragment} from "../option-fragment"

let tableBorderSchema = {
  label:'Border',
  group:'tableOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'table-bordered':'Bordered',
    'table-borderless':'Borderless',
  },
}

class TableBorder extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, tableBorderSchema)

    this.metaFragment = '' 

    this.fieldName = 'tableBorder'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonTableBorder = (node, groupName)=>{
  let tableBorder = new TableBorder
  tableBorder.addon(node, groupName)
  return tableBorder
}

export {addonTableBorder}

