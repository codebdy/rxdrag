import bootstrap from "./bootstrap"
import html from "./html"
import icon from "./icon"

export default function loadElements(editor){
  editor.elements = {}
  editor.elements.bootstrap = bootstrap
  editor.elements.html = html
  editor.elements.icon = icon
}