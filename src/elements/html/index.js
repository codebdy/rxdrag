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
import {HTMLDt} from "./htmlDt"
import {HTMLDd} from "./htmlDd"


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
}