import { ColProps } from "antd";
import { createContext } from "react";
import { DisplayProps } from "./types";

export type FormLayoutParams = {
  //表示是否显示 label 后面的冒号, default true
  colon?: boolean,
  disabled?: boolean,
  labelAlign?: 'left' | 'right',
  labelWrap?: boolean,
  labelCol?: ColProps,
  wrapperCol?: ColProps,
  layout?: 'horizontal' | 'vertical' | 'inline',
}

export const FormLayoutContext = createContext<FormLayoutParams | undefined>(undefined)

export const DisplayContext = createContext<DisplayProps | undefined>(undefined)