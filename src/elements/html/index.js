import {HTMLDiv} from "./htmldiv"
import {HTMLP} from "./htmlp"
import {HTMLSmall} from "./htmlsmall"
import {HTMLSpan} from "./htmlspan"
import {HTMLH} from "./htmlh"

import {HTMLMark} from "./htmlmark"
import {HTMLDel} from "./htmldel"
import {HTMLS} from "./htmls"
import {HTMLIns} from "./htmlins"
import {HTMLU} from "./htmlu"
import {HTMLStrong} from "./htmlstrong"
import {HTMLEm} from "./htmlem"
import {HTMLAbbr} from "./htmlabbr"
import {HTMLBlockquote} from "./htmlblockquote"
import {HTMLCite} from "./htmlcite"
import {HTMLFooter} from "./htmlfooter"
import {HTMLUl} from "./htmlul"
import {HTMLLi} from "./htmlli"
import {HTMLDl} from "./htmldl"
import {HTMLDt} from "./htmldt"
import {HTMLDd} from "./htmldd"

import {HTMLCode} from "./htmlcode"
import {HTMLPre} from "./htmlpre"
import {HTMLVar} from "./htmlvar"
import {HTMLKbd} from "./htmlkbd"
import {HTMLSamp} from "./htmlsamp"

import {HTMLImg} from "./htmlimg"
import {HTMLPicture} from "./htmlpicture"
import {HTMLSource} from "./htmlsource"

import {HTMLTable} from "./htmltable"
import {HTMLThead} from "./htmlthead"
import {HTMLTbody} from "./htmltbody"
import {HTMLTr} from "./htmltr"
import {HTMLTh} from "./htmlth"
import {HTMLTd} from "./htmltd"
import {HTMLCaption} from "./htmlcaption"


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

}