import { IDesignerEngine, IDriver, IDriverFactory } from "../interfaces";

export class ShellPart{
  private drivers: IDriver[] = []
  constructor(
    engine: IDesignerEngine,
    //根节点Id
    private driverFactories: IDriverFactory[]
  ) {
    for (const driverFactory of this.driverFactories) {
      this.drivers.push(driverFactory(engine.getShell(), document))
    }
  }

  destroy(): void {
    for (const driver of this.drivers) {
      driver.teardown()
    }
    this.drivers = []
  }
}