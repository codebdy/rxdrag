import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"

var tableResponsiveSchema = {
  group:'tableOptions',
  isResponsive:true,
  xs:{
    label:'Responsive',
    widget:'OpSwitch',
    onValue:'table-responsive',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
  sm:{
    label:'Responsive',
    widget:'OpSwitch',
    onValue:'table-responsive-sm',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
  md:{
    label:'Responsive',
    widget:'OpSwitch',
    onValue:'table-responsive-md',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
  lg:{
    label:'Responsive',
    widget:'OpSwitch',
    onValue:'table-responsive-lg',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
  xl:{
    label:'Responsive',
    widget:'OpSwitch',
    onValue:'table-responsive-xl',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
}//<--

class TableResponsive extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, tableResponsiveSchema)

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'tableResponsive'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonTableResponsive = (node, groupName)=>{
  let tableResponsive = new TableResponsive
  tableResponsive.addon(node, groupName)
  return tableResponsive
}

export {addonTableResponsive}


