import { IFlow, IScript } from "../interfaces/flow";
import flows from "./flows.json"
import moleScipts from "./molescripts.json"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allFlows: IFlow[] = flows as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allScripts: IScript[] = moleScipts as any
