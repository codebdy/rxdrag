import { fieldyActivityMaterialLocales } from "@rxdrag/fieldy-minions-materials"
import { activityMaterialLocales } from "@rxdrag/minions-react-materials"
import { httpQueryMaterialLocales } from "httpquery/minion-materials/locales";
import _ from "lodash";

export const  minionsLocales = _.merge(activityMaterialLocales, fieldyActivityMaterialLocales, httpQueryMaterialLocales)
