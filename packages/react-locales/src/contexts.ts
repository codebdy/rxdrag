import { createContext } from "react"
import {ILocalesManager} from "@rxdrag/locales"

export const LocalesContext = createContext<ILocalesManager | undefined>(undefined)