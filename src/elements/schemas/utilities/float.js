import {OptionFragment} from "../option-fragment"

var utilFloatSchema = {
  group:'utilities',
  isResponsive:true,
  xs:{
    label:'Float',
    widget:'OpSelect',
    list:{
      'float-left':'Left',
      'float-right':'Right',
      'float-none':'None',
    },
  },
  //---------------------
  sm:{
    label:'Float',
    widget:'OpSelect',
    list:{
      'float-sm-left':'Left',
      'float-sm-right':'Right',
      'float-sm-none':'None',
    },
  },
  //---------------------
  md:{
    label:'Float',
    widget:'OpSelect',
    list:{
      'float-md-left':'Left',
      'float-md-right':'Right',
      'float-md-none':'None',
    },
  },
  //---------------------
  lg:{
    label:'Float',
    widget:'OpSelect',
    list:{
      'float-lg-left':'Left',
      'float-lg-right':'Right',
      'float-lg-none':'None',
    },
  },
  //---------------------
  xl:{
    label:'Float',
    widget:'OpSelect',
    list:{
      'float-xl-left':'Left',
      'float-xl-right':'Right',
      'float-xl-none':'None',
    },
  },
  //---------------------
}//<--

class UtilFloat extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilFloatSchema)

    this.fieldName = 'utilFloat'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonUtilFloat = (node, groupName)=>{
  let utilFloat = new UtilFloat
  utilFloat.addon(node, groupName)
  return utilFloat
}

export {addonUtilFloat}


