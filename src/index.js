import {RXEditor} from "./core/rxeditor"
import {RXEditorFM} from "./shell/rxeditor-fm"
import {RXEditorInline} from "./shell/rxeditor-inline"

window.createRXEditorFM = ()=>{
  window.rxEditor = new RXEditor

  let rxEditorFM = new RXEditorFM
  rxEditorFM.assemble('bootstrap.container')
  rxEditorFM.assemble('bootstrap.row')
  rxEditorFM.assemble('bootstrap.column')
  rxEditorFM.assemble('bootstrap.w100')
  
  rxEditorFM.assemble('bootstrap.heading')
  rxEditorFM.assemble('bootstrap.paragraph')
  rxEditorFM.assemble('bootstrap.table')
  rxEditorFM.assemble('bootstrap.figure')

  rxEditorFM.assemble('bootstrap.alert')

  rxEditorFM.assemble('html.a')
  rxEditorFM.assemble('html.abbr')
  rxEditorFM.assemble('html.blockquote')
  rxEditorFM.assemble('html.button')
  rxEditorFM.assemble('html.caption')
  rxEditorFM.assemble('html.cite')
  rxEditorFM.assemble('html.code')
  rxEditorFM.assemble('html.del')
  rxEditorFM.assemble('html.div')
  rxEditorFM.assemble('html.dl')
  rxEditorFM.assemble('html.dd')
  rxEditorFM.assemble('html.dt')
  rxEditorFM.assemble('html.em')
  rxEditorFM.assemble('html.figcaption')
  rxEditorFM.assemble('html.figure')
  rxEditorFM.assemble('html.footer')
  rxEditorFM.assemble('html.h')
  rxEditorFM.assemble('html.img')
  rxEditorFM.assemble('html.ins')
  rxEditorFM.assemble('html.kbd')
  rxEditorFM.assemble('html.mark')
  rxEditorFM.assemble('html.ol')
  rxEditorFM.assemble('html.p')
  rxEditorFM.assemble('html.picture')
  rxEditorFM.assemble('html.pre')
  rxEditorFM.assemble('html.samp')
  rxEditorFM.assemble('html.small')
  rxEditorFM.assemble('html.source')
  rxEditorFM.assemble('html.span')
  rxEditorFM.assemble('html.strong')
  rxEditorFM.assemble('html.s')
  rxEditorFM.assemble('html.u')
  rxEditorFM.assemble('html.ul')
  rxEditorFM.assemble('html.li')
  rxEditorFM.assemble('html.var')

  rxEditorFM.assemble('html.table')
  rxEditorFM.assemble('html.thead')
  rxEditorFM.assemble('html.tbody')
  rxEditorFM.assemble('html.tr')
  rxEditorFM.assemble('html.th')
  rxEditorFM.assemble('html.td')

  return rxEditorFM
}

window.rxEditorInline = new RXEditorInline
