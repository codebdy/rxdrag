import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"

let rowVAlignSchema = {
  group:'rowOptions',
  isResponsive:true,
  xs:{
    widget:'OpSelect',
    label:'Align Cols(V)',
    list:{
      'align-items-start':'Start',
      'align-items-end':'End',
      'align-items-center':'Center',
      'align-items-baseline':'Between',
      'align-items-stretch':'Around',
    },
  },
  //---------------------
  sm:{
    widget:'OpSelect',
    label:'Align Cols(V)',
    list:{
      'align-items-sm-start':'Start',
      'align-items-sm-end':'End',
      'align-items-sm-center':'Center',
      'align-items-sm-baseline':'Between',
      'align-items-sm-stretch':'Around',
    },
  },
  //---------------------
  md:{
    widget:'OpSelect',
    label:'Align Cols(V)',
    list:{
      'align-items-md-start':'Start',
      'align-items-md-end':'End',
      'align-items-md-center':'Center',
      'align-items-md-baseline':'Between',
      'align-items-md-stretch':'Around',
    },
  },
  //---------------------
  lg:{
    widget:'OpSelect',
    label:'Align Cols(V)',
    list:{
      'align-items-lg-start':'Start',
      'align-items-lg-end':'End',
      'align-items-lg-center':'Center',
      'align-items-lg-baseline':'Between',
      'align-items-lg-stretch':'Around',
    },
  },
  //---------------------
  xl:{
    widget:'OpSelect',
    label:'Align Cols(V)',
    list:{
      'align-items-xl-start':'Start',
      'align-items-xl-end':'End',
      'align-items-xl-center':'Center',
      'align-items-xl-baseline':'Between',
      'align-items-xl-stretch':'Around',
    },
  },
  //---------------------
 }//<--vAlign

 class RowVAlign extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, rowVAlignSchema)

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'utilVAlign'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonRowVAlign = (node)=>{
  let rowVAlign = new RowVAlign
  rowVAlign.addon(node)
  return rowVAlign
}

export {addonRowVAlign}

