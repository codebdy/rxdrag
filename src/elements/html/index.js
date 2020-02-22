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


export default {
  abbr: new HTMLAbbr,
  blockquote: new HTMLBlockquote,
  cite: new HTMLCite,
  del: new HTMLDel,
  div: new HTMLDiv,
  dl: new HTMLDl,
  dt: new HTMLDt,
  dd: new HTMLDd,
  em: new HTMLEm,
  footer: new HTMLFooter,
  h: new HTMLH,
  ins: new HTMLIns,
  li: new HTMLLi,
  mark:new HTMLMark,
  p: new HTMLP,
  small: new HTMLSmall,
  span: new HTMLSpan,
  strong: new HTMLStrong,
  s: new HTMLS,
  u: new HTMLU,
  ul: new HTMLUl,

  code: new HTMLCode,
  pre: new HTMLPre,
  var: new HTMLVar,
  kbd: new HTMLKbd,
  samp: new HTMLSamp,

  img: new HTMLImg,
  picture: new HTMLPicture,
  source: new HTMLSource,

  table: new HTMLTable,
  thead: new HTMLThead,
  tbody: new HTMLTbody,
  tr: new HTMLTr,
  th: new HTMLTh,
  td: new HTMLTd,
  caption: new HTMLCaption,

  figure: new HTMLFigure,
  figcaption: new HTMLFigcaption,

  a: new HTMLA,
  button: new HTMLButton,
  ol: new HTMLOl,
  nav: new HTMLNav
}