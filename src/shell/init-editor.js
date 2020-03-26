import {RXEditor} from "../core/rxeditor"
import {RXEditorCommandProxy} from "../core/rxeditor-command-proxy"
//import loadElements from "../elements/load-elements"

export default function initEditor(pageId){
  window.rxEditor = new RXEditor(pageId)
  window.RXEditorCommandProxy = RXEditorCommandProxy

}