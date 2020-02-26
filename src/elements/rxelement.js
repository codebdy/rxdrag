import {Node} from "../core/node"
import {RXArray} from "../basic/rxarray"
import parkMiniEditbar from "../core/park-mini-editbar"
import {addonTag} from "./schemas/overview/tag"
import {addonClasses} from "./schemas/overview/classes"
import {addonAttributes} from "./schemas/overview/attributes"
import {addonHTMLId} from "./schemas/overview/id"
import {addonGeneralTextfield} from "./schemas/general/textfield"
import {addonUtilColor} from "./schemas/utilities/color"
import {addonUtilBorder} from "./schemas/utilities/border"
import {addonUtilPadding} from "./schemas/utilities/padding"
import {addonUtilMargin} from "./schemas/utilities/margin"
import {addonUtilClearfix} from "./schemas/utilities/clearfix"
import {addonUtilDisplay} from "./schemas/utilities/display"
import {addonUtilEmbed} from "./schemas/utilities/embed"
import {addonUtilResponsiveItem} from "./schemas/utilities/embed/responsive-item"
import {addonUtilFlex} from "./schemas/utilities/flex"
import {addonUtilFloat} from "./schemas/utilities/float"
import {addonUtilTextHide} from "./schemas/utilities/text-hide"
import {addonUtilOverflow} from "./schemas/utilities/overflow"
import {addonUtilPosition} from "./schemas/utilities/position"
import {addonUtilScreenReaders} from "./schemas/utilities/screen-readers"
import {addonUtilShadow} from "./schemas/utilities/shadow"
import {addonUtilSizing} from "./schemas/utilities/sizing"
import {addonUtilStretchedLink} from "./schemas/utilities/stretched-link"
import {addonUtilText} from "./schemas/utilities/text"
import {addonUtilVerticalAlignment} from "./schemas/utilities/vertical-align"
import {addonUtilVisibility} from "./schemas/utilities/visibility"

import {addonHeadingPseudo} from "./schemas/heading/pseudo-heading"
import {addonHeadingDisplay} from "./schemas/heading/display"
import {addonGridRow} from "./schemas/content/row"
import {addonWidth} from "./schemas/column/col-width"
import {addonOffset} from "./schemas/column/col-offset"
import {addonAlignSelf} from "./schemas/column/col-align-self"
import {addonOrder} from "./schemas/column/col-order"
import {addonUtilMarginAuto} from "./schemas/column/margin-auto"
import {addonTypyLead} from "./schemas/content/lead"
import {addonTypyInitialism} from "./schemas/content/Initialism"
import {addonTypyBlockquote} from "./schemas/content/blockquote"
import {addonTypyBlockquoteFooter} from "./schemas/content/blockquote-footer"

export class RXElement extends Node{
  constructor() {
    super()

    this.addons = []

    this.addedFeilds = []
    this.addedFieldGroups = []
    //基础数据，持久化也是这部分数据
    this.$meta = {
      tag : 'div',
      classList : [],
      styles : {},
      attributes : {},
    }
    
    //Schema 信息，用于构建Option编辑部件
    this.$schema = {
      fields:[],
      overView:{},
    } 

    this.$schema.groups = {}

    this.groups = {
      'utilities':{
        label:'Bootstrap Utilities',
      },
      'generalOptions':{
        label:'General Options'
      },
      'typographyOptions':{
        label:'Typography Options'
      },
      'componentsOptions':{
        label:'Components',
      },
      'customizedOptions':{
        label:'Customized',
      },
    }

    this.addToGroup = (groupName)=>{
      this.$schema.groups[groupName] = this.groups[groupName]
    }

    //在每个子类中添加
    //addonGeneralTextfield(this)
    addonTag(this)
    addonHTMLId(this)
    addonClasses(this)
    addonAttributes(this)
    addonHeadingPseudo(this, 'typographyOptions')
 /*   addonHeadingDisplay(this, 'typographyOptions')
    addonGridRow(this, 'typographyOptions')
    let col = addonWidth(this, 'typographyOptions')
    col.schema.xs.label = 'Column'
    col.schema.sm.label = 'Column'
    col.schema.md.label = 'Column'
    col.schema.lg.label = 'Column'
    col.schema.xl.label = 'Column'
    addonOffset(this, 'typographyOptions')
    addonAlignSelf(this, 'typographyOptions')
    addonOrder(this, 'typographyOptions')
    addonUtilMarginAuto(this, 'typographyOptions')
    addonTypyLead(this)
    addonTypyInitialism(this)
    addonTypyBlockquote(this)
    addonTypyBlockquoteFooter(this)

    addonUtilColor(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    addonUtilClearfix(this)
    addonUtilDisplay(this)
    addonUtilEmbed(this)
    addonUtilResponsiveItem(this) //need to move to other tags
    addonUtilFlex(this)
    addonUtilFloat(this)
    addonUtilTextHide(this)
    addonUtilOverflow(this)
    addonUtilPosition(this)
    addonUtilScreenReaders(this)
    addonUtilShadow(this)
    addonUtilSizing(this)
    addonUtilStretchedLink(this) //need to move to a tag
    addonUtilText(this)
    addonUtilVerticalAlignment(this)
    addonUtilVisibility(this)*/

  }

  clone(){
    let copy = super.clone()
    copy.$meta = JSON.parse(JSON.stringify(this.$meta))
    //copy.$meta.tag = this.$meta.tag
    //copy.$meta.innerHTML = this.$meta.innerHTML

    this.addons.forEach((addon)=>{
      addon.copyMeta(this.$meta, copy.$meta)
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

    if(this.$meta.generalTextfield === 'contentEditable'){
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
    if(this.$meta.generalTextfield === 'contentEditable'){
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
    let meta = this.$meta
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
    this.$meta.innerHTML = innerHTML
    return this
  }

  setField(fieldName, value){
    this.$meta[fieldName] = value
    return this
  }

  addClass(className){
    this.$meta.classList.push(className)
    return this
  }

  setAttribute(attrName, value){
    this.$meta.attributes[attrName] = value
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