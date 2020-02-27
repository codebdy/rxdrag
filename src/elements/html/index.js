import {HTMLDiv} from "./html-div"
import {HTMLP} from "./html-p"
import {HTMLSmall} from "./html-small"
import {HTMLSpan} from "./html-span"
import {HTMLH} from "./html-h"

import {HTMLMark} from "./html-mark"
import {HTMLDel} from "./html-del"
import {HTMLS} from "./html-s"
import {HTMLIns} from "./html-ins"
import {HTMLU} from "./html-u"
import {HTMLStrong} from "./html-strong"
import {HTMLEm} from "./html-em"
import {HTMLAbbr} from "./html-abbr"
import {HTMLBlockquote} from "./html-blockquote"
import {HTMLCite} from "./html-cite"
import {HTMLFooter} from "./html-footer"
import {HTMLUl} from "./html-ul"
import {HTMLLi} from "./html-li"
import {HTMLDl} from "./html-dl"
import {HTMLDt} from "./html-dt"
import {HTMLDd} from "./html-dd"

import {HTMLCode} from "./html-code"
import {HTMLPre} from "./html-pre"
import {HTMLVar} from "./html-var"
import {HTMLKbd} from "./html-kbd"
import {HTMLSamp} from "./html-samp"

import {HTMLImg} from "./html-img"
import {HTMLPicture} from "./html-picture"
import {HTMLSource} from "./html-source"

import {HTMLTable} from "./html-table"
import {HTMLThead} from "./html-thead"
import {HTMLTbody} from "./html-tbody"
import {HTMLTr} from "./html-tr"
import {HTMLTh} from "./html-th"
import {HTMLTd} from "./html-td"
import {HTMLCaption} from "./html-caption"

import {HTMLFigure} from "./html-figure"
import {HTMLFigcaption} from "./html-figcaption"

import {HTMLA} from "./html-a"
import {HTMLButton} from "./html-button"
import {HTMLOl} from "./html-ol"
import {HTMLNav} from "./html-nav"
import {HTMLHeader} from "./html-header"

import {HTMLSection} from "./html-section"

import {HTMLFickleTag} from "./fickle-tag"


export default {
  a: new HTMLA,
  abbr: new HTMLAbbr,
  blockquote: new HTMLBlockquote,
  button: new HTMLButton,
  caption: new HTMLCaption,
  cite: new HTMLCite,
  code: new HTMLCode,
  dd: new HTMLDd,
  del: new HTMLDel,
  div: new HTMLDiv,
  dl: new HTMLDl,
  dt: new HTMLDt,
  em: new HTMLEm,
  figcaption: new HTMLFigcaption,
  figure: new HTMLFigure,
  footer: new HTMLFooter,
  h: new HTMLH,
  header: new HTMLHeader,
  ins: new HTMLIns,
  img: new HTMLImg,
  kbd: new HTMLKbd,
  li: new HTMLLi,
  mark:new HTMLMark,
  nav: new HTMLNav,
  ol: new HTMLOl,
  p: new HTMLP,
  picture: new HTMLPicture,
  pre: new HTMLPre,
  s: new HTMLS,
  samp: new HTMLSamp,
  section:new HTMLSection,
  small: new HTMLSmall,
  source: new HTMLSource,
  span: new HTMLSpan,
  strong: new HTMLStrong,
  table: new HTMLTable,
  tbody: new HTMLTbody,
  td: new HTMLTd,
  th: new HTMLTh,
  thead: new HTMLThead,
  tr: new HTMLTr,
  u: new HTMLU,
  ul: new HTMLUl,
  var: new HTMLVar,

  fackleTag :new HTMLFickleTag
}