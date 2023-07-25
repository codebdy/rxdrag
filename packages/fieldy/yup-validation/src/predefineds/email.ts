import { YupType, YupString } from "../interfaces";

export const email: YupString = {
  type: YupType.string,

  email: {
    value: true,

  },
}