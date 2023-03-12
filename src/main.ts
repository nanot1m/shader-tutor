import "./style.css"
import { run } from "./run"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas id="canvas"></canvas>
`

run(document.querySelector<HTMLCanvasElement>("#canvas")!)
