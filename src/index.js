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
  rxEditorFM.assemble('html.div')

  return rxEditorFM
}

window.rxEditorInline = new RXEditorInline
