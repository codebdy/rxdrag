import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"

let colOffsetSchema = {
  group:'columnOptions',
  isResponsive:true,
  xs:{
    label:'Offset',
    widget:'OpSelect',
    columns:2,
    list:{
      'offset-1':'1',
      'offset-2':'2',
      'offset-3':'3',
      'offset-4':'4',
      'offset-5':'5',
      'offset-6':'6',
      'offset-7':'7',
      'offset-8':'8',
      'offset-9':'9',
      'offset-10':'10',
      'offset-11':'11',
    },
  },
  //---------------------
  sm:{
    label:'Offset',
    widget:'OpSelect',
    columns:2,
    list:{
      'offset-sm-1':'1',
      'offset-sm-2':'2',
      'offset-sm-3':'3',
      'offset-sm-4':'4',
      'offset-sm-5':'5',
      'offset-sm-6':'6',
      'offset-sm-7':'7',
      'offset-sm-8':'8',
      'offset-sm-9':'9',
      'offset-sm-10':'10',
      'offset-sm-11':'11',
    },
  },
  //---------------------
  md:{
    label:'Offset',
    widget:'OpSelect',
    columns:2,
    list:{
      'offset-md-1':'1',
      'offset-md-2':'2',
      'offset-md-3':'3',
      'offset-md-4':'4',
      'offset-md-5':'5',
      'offset-md-6':'6',
      'offset-md-7':'7',
      'offset-md-8':'8',
      'offset-md-9':'9',
      'offset-md-10':'10',
      'offset-md-11':'11',
    },
  },
  //---------------------
  lg:{
    label:'Offset',
    widget:'OpSelect',
    columns:2,
    list:{
      'offset-lg-1':'1',
      'offset-lg-2':'2',
      'offset-lg-3':'3',
      'offset-lg-4':'4',
      'offset-lg-5':'5',
      'offset-lg-6':'6',
      'offset-lg-7':'7',
      'offset-lg-8':'8',
      'offset-lg-9':'9',
      'offset-lg-10':'10',
      'offset-lg-11':'11',
    },
  },
  //---------------------
  xl:{
    label:'Offset',
    widget:'OpSelect',
    columns:2,
    list:{
      'offset-xl-1':'1',
      'offset-xl-2':'2',
      'offset-xl-3':'3',
      'offset-xl-4':'4',
      'offset-xl-5':'5',
      'offset-xl-6':'6',
      'offset-xl-7':'7',
      'offset-xl-8':'8',
      'offset-xl-9':'9',
      'offset-xl-10':'10',
      'offset-xl-11':'11',
    },
  },
  //---------------------
}//<--offset

class ColOffset extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, colOffsetSchema)

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'colOffset'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonOffset = (node, groupName)=>{
  let colOffset = new ColOffset
  colOffset.addon(node, groupName)
  return colOffset
}

export {addonOffset}
