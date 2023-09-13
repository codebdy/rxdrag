import { fieldyActivityMaterialLocales } from "@rxdrag/fieldy-minions-materials"
import { activityMaterialLocales } from "@rxdrag/minions-react-materials"
import _ from "lodash";
import { httpQueryMaterialLocales } from "../httpquery";

export const  minionsLocales = _.merge(activityMaterialLocales, fieldyActivityMaterialLocales, httpQueryMaterialLocales)
