import type { Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { reduce, State } from './reducers'
import { IDesignerEngine } from './interfaces'
import { Monitor } from './classes/Monitor'
import { DesignerEngine } from './classes/DesignerEngine'
import { DesignerShell } from './shell/DesignerShell'
import { IPluginFactory } from './interfaces/plugin'
import { rootBehavior } from './behaviors/rootBehavior'

export function createEngine(
	plugins: IPluginFactory[],
	options: {
		languange?: string,
		debugMode: boolean,
	} = {
			debugMode: false
		},
): IDesignerEngine {
	const store = makeStoreInstance(options.debugMode)
	const monitor = new Monitor(store)
	const shell = new DesignerShell()
	const engine = new DesignerEngine(store, shell, monitor, plugins)
	engine.getBehaviorManager().registerBehaviors(rootBehavior)
	return engine
}

function makeStoreInstance(debugMode: boolean): Store<State> {
	// TODO: if we ever make a react-native version of this,
	// we'll need to consider how to pull off dev-tooling
	const reduxDevTools =
		typeof window !== 'undefined' &&
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).__REDUX_DEVTOOLS_EXTENSION__
	return configureStore(
		{
			reducer: reduce,
			middleware: (getDefaultMiddleware) => getDefaultMiddleware({
				immutableCheck: false,
				serializableCheck: false,
			}),
			devTools: debugMode &&
				reduxDevTools &&
				reduxDevTools({
					name: 'dnd-core',
					instanceId: 'dnd-core',
				}),
		}
	)
}
