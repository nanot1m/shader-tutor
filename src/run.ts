import { createRafLoop } from "./createRafLoop"
import fragment from "./glsl/fragmentShader.glsl"
import vertex from "./glsl/vertexShader.glsl"

const CANVAS_SIZE = 320

function scaleAndResizeCanvas(
	canvas: HTMLCanvasElement,
	ctx: WebGLRenderingContext,
	width: number,
	height: number,
) {
	const dpr = window.devicePixelRatio
	canvas.width = width * dpr
	canvas.height = height * dpr
	canvas.style.width = `${width}px`
	canvas.style.height = `${height}px`
	ctx.viewport(0, 0, width * dpr, height * dpr)
}

export function run(canvas: HTMLCanvasElement) {
	const gl = canvas.getContext("webgl")

	if (!gl) {
		throw new Error("WebGL not supported")
	}
	scaleAndResizeCanvas(canvas, gl, CANVAS_SIZE, CANVAS_SIZE)

	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
	const vertexShader = gl.createShader(gl.VERTEX_SHADER)

	if (!fragmentShader || !vertexShader) {
		throw new Error("Could not create shaders")
	}

	gl.shaderSource(fragmentShader, fragment)
	gl.compileShader(fragmentShader)
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		throw new Error(
			"Fragment shader compile error: " + gl.getShaderInfoLog(fragmentShader),
		)
	}

	gl.shaderSource(vertexShader, vertex)
	gl.compileShader(vertexShader)
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		throw new Error(
			"Vertex shader compile error: " + gl.getShaderInfoLog(vertexShader),
		)
	}

	const program = gl.createProgram()
	if (!program) {
		throw new Error("Could not create program")
	}

	gl.attachShader(program, fragmentShader)
	gl.attachShader(program, vertexShader)
	gl.linkProgram(program)
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		throw new Error("Could not link program" + gl.getProgramInfoLog(program))
	}

	gl.validateProgram(program)
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		throw new Error(
			"Could not validate program" + gl.getProgramInfoLog(program),
		)
	}

	// prettier-ignore
	const triangleVertices = [
	  // x,    y,    r,   g,   b
		 0.0,  0.5,  1.0, 1.0, 0.0,
		-0.5, -0.5,  0.7, 0.0, 1.0,
		 0.5, -0.5,  0.0, 1.0, 1.0,
	]

	const bufferData = new Float32Array(triangleVertices)

	const triangleVertexBufferObject = gl.createBuffer()
	if (!triangleVertexBufferObject) {
		throw new Error("Could not create buffer")
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject)
	gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW)

	const positionAttribLocation = gl.getAttribLocation(program, "vertPosition")
	gl.vertexAttribPointer(
		positionAttribLocation,
		2,
		gl.FLOAT,
		false,
		5 * Float32Array.BYTES_PER_ELEMENT,
		0 * Float32Array.BYTES_PER_ELEMENT,
	)
	const colorAttribLocation = gl.getAttribLocation(program, "vertColor")
	gl.vertexAttribPointer(
		colorAttribLocation,
		3,
		gl.FLOAT,
		false,
		5 * Float32Array.BYTES_PER_ELEMENT,
		2 * Float32Array.BYTES_PER_ELEMENT,
	)

	gl.enableVertexAttribArray(positionAttribLocation)
	gl.enableVertexAttribArray(colorAttribLocation)

	gl.useProgram(program)

	let time
	const loop = createRafLoop(() => {
		time = performance.now()
		for (let i = 0; i < 3; i++) {
			bufferData[i * 5 + 0] = Math.sin(time / 1000 + i * 2) * 0.5
			bufferData[i * 5 + 1] = Math.cos(time / 1000 + i * 5) * 0.6

			bufferData[i * 5 + 2] = Math.sin(time / 1000 + i) * 0.5 + 0.5
			bufferData[i * 5 + 3] = Math.cos(time / 1000 + i * 2) * 0.5 + 0.5
			bufferData[i * 5 + 4] = Math.sin(time / 1000 + i * 5) * 0.5 + 0.5
		}
		gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW)
		gl.drawArrays(gl.TRIANGLES, 0, 3)
	})

	loop.start()
}
