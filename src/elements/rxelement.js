import {Node} from "../core/node"
import {RXArray} from "../basic/rxarray"
import parkMiniEditbar from "../core/park-mini-editbar"
import textfieldSchema from "./schemas/general/textfield"
import tagSchema from "./schemas/overview/tag"
import classesSchema from "./schemas/overview/classes"
import attributesSchema from "./schemas/overview/attributes"
import headingPseudoSchema from "./schemas/heading/pseudo-heading"
import headingDisplaySchema from "./schemas/heading/display"

import utilColorSchema from "./schemas/utilities/color"
import utilTextSchema from "./schemas/utilities/text"

import utilBorderSchema from "./schemas/utilities/border"
import utilPaddingSchema from "./schemas/utilities/padding"
import utilMarginSchema from "./schemas/utilities/margin"
import utilClearfixSchema from "./schemas/utilities/clearfix"
import utilDisplaySchema from "./schemas/utilities/display"
import utilEmbedSchema from "./schemas/utilities/embed"
import utilResponsiveItemSchema from "./schemas/utilities/embed/responsive-item"
import utilFlexSchema from "./schemas/utilities/flex"
import utilFloatSchema from "./schemas/utilities/float"

import utilTextHideSchema from "./schemas/utilities/text-hide"
import utilOverflowSchema from "./schemas/utilities/overflow"
import utilPositionSchema from "./schemas/utilities/position"
import utilScreenReadersSchema from "./schemas/utilities/screen-readers"
import utilShadowSchema from "./schemas/utilities/shadow"
import utilSizingSchema from "./schemas/utilities/sizing"
import utilStretchedLinkSchema from "./schemas/utilities/stretched-link"
import utilVerticalAlignmentSchema from "./schemas/utilities/vertical-align"
import utilVisibilitySchema from "./schemas/utilities/visibility"

/*

import {addonHeadingDisplay} from "./schemas/heading/display"
import {addonGridRow} from "./schemas/content/row"
import {addonWidth} from "./schemas/column/col-width"
import {addonOffset} from "./schemas/column/col-offset"
import {addonAlignSelf} from "./schemas/column/col-align-self"
import {addonOrder} from "./schemas/column/col-order"
import utilMarginAuto} from "./schemas/column/margin-auto"
import {addonTypyLead} from "./schemas/content/lead"
import {addonTypyInitialism} from "./schemas/content/Initialism"
import {addonTypyBlockquote} from "./schemas/content/blockquote"
import {addonTypyBlockquoteFooter} from "./schemas/content/blockquote-footer"*/

export class RXElement extends Node{
  constructor() {
    super()

    this.addons = []

    this.addedFeilds = []
    this.addedFieldGroups = []
    //基础数据，持久化也是这部分数据
    this.meta = {
      tag : 'div',
      classList : [],
      styles : {},
      attributes : {},
    }
    
    //Schema 信息，用于构建Option编辑部件
    this.schema = {
      fields:[],
      overView:[],
      groups:[],
    } 

    this.pushGroup({
      id:'textOptions',
      label:'Text Options',
    })
    this.pushGroup({
      id:'utilities',
      label:'Bootstrap Utilities',
    })
    this.pushGroup({
      id:'componentsOptions',
      label:'Components',
    })

    this.addToGroup = (groupName)=>{
      this.schema.groups[groupName] = this.groups[groupName]
    }

    //addonGeneralTextfield(this)
    this.addOverViewSchema(tagSchema)
    this.addOverViewSchema(classesSchema)
    this.addOverViewSchema(attributesSchema)

    this.addSchema(textfieldSchema, 'textOptions')
    this.addSchema(headingPseudoSchema, 'textOptions')
    this.addSchema(headingDisplaySchema, 'textOptions')
    this.addSchema(utilColorSchema, 'textOptions')
    this.addSchema(utilTextSchema, 'textOptions')

    this.addSchema(utilBorderSchema, 'utilities')
    this.addSchema(utilPaddingSchema, 'utilities')
    this.addSchema(utilMarginSchema, 'utilities')
    this.addSchema(utilClearfixSchema, 'utilities')
    this.addSchema(utilDisplaySchema, 'utilities')
    this.addSchema(utilEmbedSchema, 'utilities')
    this.addSchema(utilResponsiveItemSchema, 'utilities')
    this.addSchema(utilFlexSchema, 'utilities')
    this.addSchema(utilFloatSchema, 'utilities')

    this.addSchema(utilTextHideSchema, 'utilities')
    this.addSchema(utilOverflowSchema, 'utilities')
    this.addSchema(utilPositionSchema, 'utilities')
    this.addSchema(utilScreenReadersSchema, 'utilities')
    this.addSchema(utilShadowSchema, 'utilities')
    this.addSchema(utilSizingSchema, 'utilities')
    this.addSchema(utilStretchedLinkSchema, 'utilities')
    this.addSchema(utilVerticalAlignmentSchema, 'utilities')
    this.addSchema(utilVisibilitySchema, 'utilities')

  }

  pushGroup(group){
    this.schema.groups.push(group)
  }

  unshiftGroup(group){
    this.schema.groups.unshift(group)
  }

  addSchema(schemaFragment, groupName){
    if(groupName){
      schemaFragment.group = groupName
    }
    //this.schema.groups[groupName] = this.groups[groupName]
    this.schema.fields.push(Object.assign({}, schemaFragment))
  }

  unshiftSchema(schemaFragment, groupName){
    if(groupName){
      schemaFragment.group = groupName
    }
    //this.schema.groups[groupName] = this.groups[groupName]
    this.schema.fields.unshift(Object.assign({}, schemaFragment))
  }

  addOverViewSchema(schema){
    this.schema.overView.push(schema)
  }

  clone(){
    let copy = super.clone()
    copy.meta = JSON.parse(JSON.stringify(this.meta))
    //copy.schema = JSON.parse(JSON.stringify(this.schema))
    //copy.meta.tag = this.meta.tag
    //copy.meta.innerHTML = this.meta.innerHTML

    this.addons.forEach((addon)=>{
      addon.copyMeta(this.meta, copy.meta)
    })

    return copy
  }

  /*copyMetaTo(from, to){
    for(var name in from){
      to[name] = from[name]
    }
  }*/
 
  toViewModel(){
    let model = super.toViewModel()
    this.baseMetaToModel(model)
    this.metaToModel(model)

    if(this.meta.generalTextfield === 'contentEditable'){
      parkMiniEditbar(model, this)
      model.styles.padding = ''
    }
    else if(rxEditor.state.showEditMargin){
      model.styles.padding = this.editMarginStyle.padding
    }

    if(rxEditor.state.showEditMargin){
      model.styles.margin = this.editMarginStyle.margin
    }

    return model
  }

  isTextfield(){
    if(this.meta.generalTextfield === 'contentEditable'){
      return true
    }
  }

  toPreviewModel(){
    let model = super.toPreviewModel()
    this.baseMetaToModel(model)
    this.metaToModel(model)
    return model
  }

  baseMetaToModel(model){
    let meta = this.meta
    model.name = meta.tag
    model.innerHTML = meta.innerHTML
    model.classList.push.apply(model.classList, meta.classList)
    Object.assign(model.styles, meta.styles)
    Object.assign(model.attributes, meta.attributes)

    this.addons.forEach((addon)=>{
      addon.metaToModel(model, meta)
    })
  }

  metaToModel(model){
  }

  setInnerHTML(innerHTML){
    this.meta.innerHTML = innerHTML
    return this
  }

  setField(fieldName, value){
    this.meta[fieldName] = value
    return this
  }

  addClass(className){
    this.meta.classList.push(className)
    return this
  }

  setAttribute(attrName, value){
    this.meta.attributes[attrName] = value
    return this
  }

  setEditPadding(padding){
    this.editMarginStyle.padding = padding
    return this
  }

  becomeToTextfield(){
    this.setField('generalTextfield', 'contentEditable')
    return this
  }

  noTextField(){
    this.setField('generalTextfield', '')
    return this
  }

}