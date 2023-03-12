(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();function g(c){let e=!1,o;function t(){c(),e&&(o=requestAnimationFrame(t))}return{start(){e||(e=!0,t())},stop(){e=!1,cancelAnimationFrame(o)}}}var m=`precision mediump float;

varying vec3 fragColor;

void main()
{
    gl_FragColor = vec4(fragColor, 1.0);
}`,A=`precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;

varying vec3 fragColor;

void main()
{
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}`;const u=320;function E(c,e,o,t){const r=window.devicePixelRatio;c.width=o*r,c.height=t*r,c.style.width=`${o}px`,c.style.height=`${t}px`,e.viewport(0,0,o*r,t*r)}function h(c){const e=c.getContext("webgl");if(!e)throw new Error("WebGL not supported");E(c,e,u,u);const o=e.createShader(e.FRAGMENT_SHADER),t=e.createShader(e.VERTEX_SHADER);if(!o||!t)throw new Error("Could not create shaders");if(e.shaderSource(o,m),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw new Error("Fragment shader compile error: "+e.getShaderInfoLog(o));if(e.shaderSource(t,A),e.compileShader(t),!e.getShaderParameter(t,e.COMPILE_STATUS))throw new Error("Vertex shader compile error: "+e.getShaderInfoLog(t));const r=e.createProgram();if(!r)throw new Error("Could not create program");if(e.attachShader(r,o),e.attachShader(r,t),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))throw new Error("Could not link program"+e.getProgramInfoLog(r));if(e.validateProgram(r),!e.getProgramParameter(r,e.VALIDATE_STATUS))throw new Error("Could not validate program"+e.getProgramInfoLog(r));const a=[0,.5,1,1,0,-.5,-.5,.7,0,1,.5,-.5,0,1,1],i=new Float32Array(a),l=e.createBuffer();if(!l)throw new Error("Could not create buffer");e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW);const f=e.getAttribLocation(r,"vertPosition");e.vertexAttribPointer(f,2,e.FLOAT,!1,5*Float32Array.BYTES_PER_ELEMENT,0*Float32Array.BYTES_PER_ELEMENT);const d=e.getAttribLocation(r,"vertColor");e.vertexAttribPointer(d,3,e.FLOAT,!1,5*Float32Array.BYTES_PER_ELEMENT,2*Float32Array.BYTES_PER_ELEMENT),e.enableVertexAttribArray(f),e.enableVertexAttribArray(d),e.useProgram(r),g(()=>{const s=Date.now();for(let n=0;n<3;n++)i[n*5+0]=Math.sin(s/1e3+n*2)*.5,i[n*5+1]=Math.cos(s/1e3+n*5)*.6,i[n*5+2]=Math.sin(s/1e3+n)*.5+.5,i[n*5+3]=Math.cos(s/1e3+n*2)*.5+.5,i[n*5+4]=Math.sin(s/1e3+n*5)*.5+.5;e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW),e.drawArrays(e.TRIANGLES,0,3)}).start()}document.querySelector("#app").innerHTML=`
  <canvas id="canvas"></canvas>
`;h(document.querySelector("#canvas"));
