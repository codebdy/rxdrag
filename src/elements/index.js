import bootstrap from "./bootstrap"
import html from "./html"

export default function loadElements(editor){
  editor.elements = {}
  editor.elements.bootstrap = bootstrap
  editor.elements.html = html
}