import {OptionFragment} from "../option-fragment"

class TableStriped extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Striped',
      widget:'OpSwitch',
      required:true,
      group:'tableOptions',
      onValue:'table-striped',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'tableStriped'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonTableStriped = (node, groupName)=>{
  let tableStriped = new TableStriped
  tableStriped.addon(node, groupName)
  return tableStriped
}

export {addonTableStriped}

