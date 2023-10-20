import { ID } from "@rxdrag/shared"
import { MetaContent } from "@rxdrag/uml-editor"
import { IApp } from "./app"

export interface IMeta {
  id: ID
  name?: string
  content?: MetaContent
  publishedContent?: MetaContent
  publishedAt?: Date
  updatedAt?: Date
  createdAt?: Date
  app?: IApp,
}

export interface IMetaInput {
  id?: ID
  name?: string
  content?: MetaContent
  publishedContent?: MetaContent
  publishedAt?: Date
}