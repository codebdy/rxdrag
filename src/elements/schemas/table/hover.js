import {OptionFragment} from "../option-fragment"

class TableHover extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Hoverable',
      widget:'OpSwitch',
      required:true,
      group:'tableOptions',
      onValue:'table-hover',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'tableHover'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonTableHover = (node, groupName)=>{
  let tableHover = new TableHover
  tableHover.addon(node, groupName)
  return tableHover
}

export {addonTableHover}

