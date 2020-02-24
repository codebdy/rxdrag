import {OptionFragment} from "../../option-fragment"

var navbarExpandSchema = {
  group:'navbarOptions',
  isResponsive:true,
  xs:{
    label:'Expand',
    widget:'OpSwitch',
    onValue:'navbar-expand',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
  sm:{
    label:'Expand',
    widget:'OpSwitch',
    onValue:'navbar-expand-sm',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
  md:{
    label:'Expand',
    widget:'OpSwitch',
    onValue:'navbar-expand-md',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
  lg:{
    label:'Expand',
    widget:'OpSwitch',
    onValue:'navbar-expand-lg',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
  xl:{
    label:'Expand',
    widget:'OpSwitch',
    onValue:'navbar-expand-xl',
    offValue:'',
    defaultValue:'',
  },
  //---------------------
}//<--

class NavbarExpand extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, navbarExpandSchema)

    this.fieldName = 'navbarExpand'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonNavbarExpand = (node, groupName)=>{
  let navbarExpand = new NavbarExpand
  navbarExpand.addon(node, groupName)
  return navbarExpand
}

export {addonNavbarExpand}


