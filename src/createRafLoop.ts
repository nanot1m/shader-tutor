export function createRafLoop(fn: () => void) {
	let running = false
	let frame: number
	function loop() {
		fn()
		if (running) {
			frame = requestAnimationFrame(loop)
		}
	}
	return {
		start() {
			if (running) return
			running = true
			loop()
		},
		stop() {
			running = false
			cancelAnimationFrame(frame)
		},
	}
}
