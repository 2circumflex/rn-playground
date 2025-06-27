import ExpoModulesCore

public class ExpoRadialChartModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoRadialChart")

    View(ExpoRadialChartView.self) {
      Prop("data") { (view: ExpoRadialChartView, prop: [Series]) in
        view.setChartData(data: prop)
      }
    }
  }
}
