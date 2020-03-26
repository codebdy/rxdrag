import {OptionGroup} from './OptionGroup'
import {OptionRowSmallGroup} from './OptionRowSmallGroup'

import backgroundColor from "./general/background-color"
import pseudoHeading from "./general/text/pseudo-heading"
import displaySize from "./general/text/display-size"
import textColor from "./general/text/color"
import textJustify from "./general/text/justify"
import textAlign from "./general/text/align"
import textVAlign from "./general/text/vertical-align"
import textWrapping from "./general/text/wrapping"
import textWordBreak from "./general/text/word-break"
import textTruncate from "./general/text/truncate"
import textTransform from "./general/text/transform"
import textWeight from "./general/text/weight"
import textResetColor from "./general/text/reset-color"
import textDecoration from "./general/text/decoration"
import textLead from "./general/text/lead"

import borderColor from "./general/border/Color"
import borderAdd from "./general/border/add"
import borderRemove from "./general/border/remove"
import borderRadius from "./general/border/radius"

import generalShadow from "./general/shadow"

import marginAll from "./general/margin/margin-all"
import marginH from "./general/margin/margin-h"
import marginV from "./general/margin/margin-v"
import marginT from "./general/margin/margin-t"
import marginR from "./general/margin/margin-r"
import marginB from "./general/margin/margin-b"
import marginL from "./general/margin/margin-l"

import paddingAll from "./general/padding/padding-all"
import paddingH from "./general/padding/padding-h"
import paddingV from "./general/padding/padding-v"
import paddingT from "./general/padding/padding-t"
import paddingR from "./general/padding/padding-r"
import paddingB from "./general/padding/padding-b"
import paddingL from "./general/padding/padding-l"

import utilClearfix from "./utilities/clearfix"
import utilDisplay from "./utilities/display"

import embedResponsive from "./utilities/embed/responsive"
import embedAspectRatio from "./utilities/embed/aspect-ratio"
import embedResponsiveItem from "./utilities/embed/responsive-item"

import flexDisplay from "./utilities/flex/display"
import flexDirection from "./utilities/flex/direction"
import flexJustifyContent from "./utilities/flex/justify-content"
import flexAlignItems from "./utilities/flex/align-items"
import flexAlignSelf from "./utilities/flex/align-self"
import flexFill from "./utilities/flex/fill"
import flexGrow from "./utilities/flex/grow"
import flexShrink from "./utilities/flex/shrink"
import flexMarginAuto from "./utilities/flex/margin-auto"
import flexWrap from "./utilities/flex/wrap"
import flexOrder from "./utilities/flex/order"
import flexAlignContent from "./utilities/flex/align-content"

import utilFloat from "./utilities/float"
import utilTextHide from "./utilities/text-hide"
import utilOverflow from "./utilities/overflow"
import utilPosition from "./utilities/position"
import utilSr from "./utilities/screen-readers"

import sizingWidth from "./utilities/sizing/width"
import sizingHeight from "./utilities/sizing/height"

import utilStretchedLink from "./utilities/stretched-link"
import utilVisibility from "./utilities/visibility"


export class RXSchema{
  constructor(){
    this.optionGroups = []

    let generalOptions = new OptionGroup(i18n.t('optionbox.general-options'))
    generalOptions.addSelectRow(backgroundColor)

    let borderSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.border'))

    borderSmallGroup.addSelectRow(borderColor)
    borderSmallGroup.addBorderRow(borderAdd)
    borderSmallGroup.addBorderRow(borderRemove)
    borderSmallGroup.addSelectRow(borderRadius)
    generalOptions.rows.push(borderSmallGroup)  

    generalOptions.addSelectRow(generalShadow)

    let marginSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.margin'))
    marginSmallGroup.addGenerateSchemaRow(marginAll)
    marginSmallGroup.addGenerateSchemaRow(marginH)
    marginSmallGroup.addGenerateSchemaRow(marginV)
    marginSmallGroup.addGenerateSchemaRow(marginT)
    marginSmallGroup.addGenerateSchemaRow(marginR)
    marginSmallGroup.addGenerateSchemaRow(marginB)
    marginSmallGroup.addGenerateSchemaRow(marginL)
    generalOptions.rows.push(marginSmallGroup)  

    let paddingSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.padding'))
    paddingSmallGroup.addGenerateSchemaRow(paddingAll)
    paddingSmallGroup.addGenerateSchemaRow(paddingH)
    paddingSmallGroup.addGenerateSchemaRow(paddingV)
    paddingSmallGroup.addGenerateSchemaRow(paddingT)
    paddingSmallGroup.addGenerateSchemaRow(paddingR)
    paddingSmallGroup.addGenerateSchemaRow(paddingB)
    paddingSmallGroup.addGenerateSchemaRow(paddingL)
    generalOptions.rows.push(paddingSmallGroup)  


    let textSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.text'))
    textSmallGroup.addSelectRow(textColor)
    textSmallGroup.addSwitchRow(textJustify)
    textSmallGroup.addGenerateSchemaRow(textAlign)
    textSmallGroup.addSelectRow(textVAlign)
    textSmallGroup.addSelectRow(pseudoHeading)
    textSmallGroup.addSelectRow(displaySize)
    textSmallGroup.addSelectRow(textWrapping)
    textSmallGroup.addSwitchRow(textTruncate)
    textSmallGroup.addSwitchRow(textWordBreak)
    textSmallGroup.addSelectRow(textTransform)
    textSmallGroup.addSelectRow(textWeight)
    textSmallGroup.addSwitchRow(textResetColor)
    textSmallGroup.addSwitchRow(textDecoration)
    textSmallGroup.addSwitchRow(textLead)
    generalOptions.rows.push(textSmallGroup)  


   this.optionGroups.push(generalOptions)

   let utilitiesOptions = new OptionGroup(i18n.t('optionbox.bootstrap-utilities'))
   utilitiesOptions.addSwitchRow(utilClearfix)
   utilitiesOptions.addGenerateSchemaRow(utilDisplay)
   let embedSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.embed'))
   embedSmallGroup.addSwitchRow(embedResponsive)
   embedSmallGroup.addSelectRow(embedAspectRatio)
   utilitiesOptions.rows.push(embedSmallGroup)
   utilitiesOptions.addSwitchRow(embedResponsiveItem)

   let flexSmallGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.flex'))

   flexSmallGroup.addGenerateSchemaRow(flexDisplay)
   flexSmallGroup.addGenerateSchemaRow(flexDirection)
   flexSmallGroup.addGenerateSchemaRow(flexJustifyContent)
   flexSmallGroup.addGenerateSchemaRow(flexAlignItems)
   flexSmallGroup.addGenerateSchemaRow(flexAlignSelf)
   flexSmallGroup.addSwitchRow(flexFill)
   flexSmallGroup.addGenerateSchemaRow(flexGrow)
   flexSmallGroup.addGenerateSchemaRow(flexShrink)
   flexSmallGroup.addSelectRow(flexMarginAuto)
   flexSmallGroup.addGenerateSchemaRow(flexWrap)
   flexSmallGroup.addGenerateSchemaRow(flexOrder)
   flexSmallGroup.addGenerateSchemaRow(flexAlignContent)
   utilitiesOptions.rows.push(flexSmallGroup)

   utilitiesOptions.addGenerateSchemaRow(utilFloat)
   utilitiesOptions.addSwitchRow(utilTextHide)
   utilitiesOptions.addSelectRow(utilOverflow)
   utilitiesOptions.addSelectRow(utilPosition)
   utilitiesOptions.addSelectRow(utilSr)

   let sizingGroup = new OptionRowSmallGroup()
                     .setLabel(i18n.t('optionbox.sizing'))

   sizingGroup.addSelectRow(sizingWidth)
   sizingGroup.addSelectRow(sizingHeight)
   utilitiesOptions.rows.push(sizingGroup)

   utilitiesOptions.addSwitchRow(utilStretchedLink)
   utilitiesOptions.addSelectRow(utilVisibility)

   this.optionGroups.push(utilitiesOptions)
  }

  resolveOptions(node, breakPoint){
    this.optionGroups.forEach(optionGroup=>{
      optionGroup.setBreakPoint(breakPoint).resolveValue(node, breakPoint)
    })
    return this.optionGroups
  }

}