import {RXEditor, ToolboxItem} from "../core/rxeditor"
import {RXEditorCommandProxy} from "../core/rxeditor-command-proxy"
import bootstrap from "../elements/bootstrap"
import html from "../elements/html"

export default function initEditor(){
  window.rxEditor = new RXEditor
  window.RXEditorCommandProxy = RXEditorCommandProxy
  rxEditor.bootstrap = bootstrap
  rxEditor.html = html
}