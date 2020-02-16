import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"
let rowHAlignSchema = {
  group:'rowOptions',
  isResponsive:true,
  xs:{
    label:'Align Cols(H)',
    widget:'OpSelect',
    list:{
      'justify-content-start':'Start',
      'justify-content-end':'End',
      'justify-content-center':'Center',
      'justify-content-between':'Between',
      'justify-content-around':'Around',
    },
  },
  //---------------------
  sm:{
    label:'Align Cols(H)',
    widget:'OpSelect',
    list:{
      'justify-content-sm-start':'Start',
      'justify-content-sm-end':'End',
      'justify-content-sm-center':'Center',
      'justify-content-sm-between':'Between',
      'justify-content-sm-around':'Around',
    },
  },
  //---------------------
  md:{
    label:'Align Cols(H)',
    widget:'OpSelect',
    list:{
      'justify-content-md-start':'Start',
      'justify-content-md-end':'End',
      'justify-content-md-center':'Center',
      'justify-content-md-between':'Between',
      'justify-content-md-around':'Around',
    },
  },
  //---------------------
  lg:{
    label:'Align Cols(H)',
    widget:'OpSelect',
    list:{
      'justify-content-lg-start':'Start',
      'justify-content-lg-end':'End',
      'justify-content-lg-center':'Center',
      'justify-content-lg-between':'Between',
      'justify-content-lg-around':'Around',
    },
  },
  //---------------------
  xl:{
    label:'Align Cols(H)',
    widget:'OpSelect',
    list:{
      'justify-content-xl-start':'Start',
      'justify-content-xl-end':'End',
      'justify-content-xl-center':'Center',
      'justify-content-xl-between':'Between',
      'justify-content-xl-around':'Around',
    },
  },
  //---------------------
}//<--hAlign

class RowHAlign extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, rowHAlignSchema)

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'rowHAlign'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonRowHAlign = (node)=>{
  let rowHAlign = new RowHAlign
  rowHAlign.addon(node)
  return rowHAlign
}

export {addonRowHAlign}

