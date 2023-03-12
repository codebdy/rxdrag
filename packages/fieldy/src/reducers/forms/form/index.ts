
import { FormState, IAction } from "runner/fieldy/interfaces";
import { fieldsReduer } from "./fields";
import { fieldSchemasReduer } from "./fieldSchemas";
import { initializedReduer } from "./initialized";
import { initialValueReduer } from "./initialValue";
import { loadingReduer } from "./loading";
import { modifiedReduer } from "./modified";
import { mountedReduer } from "./mounted";
import { patternReduer } from "./pattern";
import { unmountedReduer } from "./unmounted";
import { validatingReduer } from "./validating";
import { valueReduer } from "./value";

export function formReduce(state: FormState, action: IAction<any>): FormState | undefined {
  return {
    mounted: mountedReduer(state.mounted, action),
    unmounted: unmountedReduer(state.unmounted, action),
    initialized: initializedReduer(state.initialized, action),
    pattern: patternReduer(state.pattern, action),
    loading: loadingReduer(state.loading, action),
    validating: validatingReduer(state.validating, action),
    modified: modifiedReduer(state.modified, action),
    fields: fieldsReduer(state.fields, action),
    fieldSchemas: fieldSchemasReduer(state.fieldSchemas, action),
    initialValue: initialValueReduer(state.initialValue, action),
    value: valueReduer(state.value, action),
  }
}

