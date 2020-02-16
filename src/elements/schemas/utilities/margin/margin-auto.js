import {OptionFragment} from "../../option-fragment"
import responsiveMeta from "../../responsive"

var utilMarginAutoSchema = {
  group:'utilities',
  isResponsive:true,
  xs:{
    label:'Margin Auto',
    widget:'OpSelect',
    list:{
      'm-auto':'All',
      'mx-auto':'Horizontal',
      'my-auto':'Vertical',
      'ml-auto':'Left',
      'mr-auto':'Right',
      'mt-auto':'Top',
      'mb-auto':'Bottom',
    },
  },
  //---------------------
  sm:{
    label:'Margin Auto',
    widget:'OpSelect',
    list:{
      'm-sm-auto':'All',
      'mx-sm-auto':'Horizontal',
      'my-sm-auto':'Vertical',
      'ml-sm-auto':'Left',
      'mr-sm-auto':'Right',
      'mt-sm-auto':'Top',
      'mb-sm-auto':'Bottom',
    },
  },
  //---------------------
  md:{
    label:'Margin Auto',
    widget:'OpSelect',
    list:{
      'm-md-auto':'All',
      'mx-md-auto':'Horizontal',
      'my-md-auto':'Vertical',
      'ml-md-auto':'Left',
      'mr-md-auto':'Right',
      'mt-md-auto':'Top',
      'mb-md-auto':'Bottom',
    },
  },
  //---------------------
  lg:{
    label:'Margin Auto',
    widget:'OpSelect',
    list:{
      'm-lg-auto':'All',
      'mx-lg-auto':'Horizontal',
      'my-lg-auto':'Vertical',
      'ml-lg-auto':'Left',
      'mr-lg-auto':'Right',
      'mt-lg-auto':'Top',
      'mb-lg-auto':'Bottom',
    },
  },
  //---------------------
  xl:{
    label:'Margin Auto',
    widget:'OpSelect',
    list:{
      'm-xl-auto':'All',
      'mx-xl-auto':'Horizontal',
      'my-xl-auto':'Vertical',
      'ml-xl-auto':'Left',
      'mr-xl-auto':'Right',
      'mt-xl-auto':'Top',
      'mb-xl-auto':'Bottom',
    },
  },
  //---------------------
}//<--marginAuto

class UtilMarginAuto extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilMarginAutoSchema)

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'utilMarginAuto'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonUtilMarginAuto = (node)=>{
  let utilMarginAuto = new UtilMarginAuto
  utilMarginAuto.addon(node)
  return utilMarginAuto
}

export {addonUtilMarginAuto}

