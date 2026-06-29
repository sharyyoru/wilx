"use client";

import { useEffect, useRef, useState } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform float u_gridSize;

  // WebGL 1.0 compatible ordered dither — uses a 4x4 Bayer matrix encoded
  // as four vec4 rows so indexing is always by constant or loop variable.
  float bayer4(vec2 coord) {
    vec2 c = floor(mod(coord / u_gridSize, 4.0));
    int cx = int(c.x);
    int cy = int(c.y);

    vec4 row0 = vec4( 0.0,  8.0,  2.0, 10.0);
    vec4 row1 = vec4(12.0,  4.0, 14.0,  6.0);
    vec4 row2 = vec4( 3.0, 11.0,  1.0,  9.0);
    vec4 row3 = vec4(15.0,  7.0, 13.0,  5.0);

    vec4 row;
    if (cx == 0) row = row0;
    else if (cx == 1) row = row1;
    else if (cx == 2) row = row2;
    else row = row3;

    float val;
    if (cy == 0) val = row.x;
    else if (cy == 1) val = row.y;
    else if (cy == 2) val = row.z;
    else val = row.w;

    return val / 16.0;
  }

  void main() {
    float canvasRatio = u_resolution.x / u_resolution.y;
    float imageRatio = u_imageResolution.x / u_imageResolution.y;

    vec2 ratio = vec2(1.0);
    if (canvasRatio > imageRatio) {
      ratio.y = (u_resolution.y / u_resolution.x) * imageRatio;
    } else {
      ratio.x = (u_resolution.x / u_resolution.y) / imageRatio;
    }

    vec2 uv = vec2(
      v_texCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
      v_texCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 color = texture2D(u_image, uv);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    // Compress into a dark range so dither pixels are dim, not full white
    float darkened = gray * 0.72;

    float threshold = bayer4(gl_FragCoord.xy);
    float dithered = step(threshold, darkened);

    gl_FragColor = vec4(vec3(dithered), 1.0);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function DitherShaderBackground({
  imageSrc = "/cyberpunk-city-sm.jpg",
  className = "",
}: {
  imageSrc?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const imageResolutionRef = useRef({ x: 1, y: 1 });
  const failedRef = useRef(false);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    if (!gl) {
      failedRef.current = true;
      return;
    }
    glRef.current = gl;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!vertexShader || !fragmentShader) {
      failedRef.current = true;
      return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      failedRef.current = true;
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    const texCoordLoc = gl.getAttribLocation(program, "a_texCoord");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(texCoordLoc);
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const image = new Image();
    if (imageSrc.startsWith("http")) {
      image.crossOrigin = "anonymous";
    }
    image.onload = () => {
      imageResolutionRef.current = { x: image.width, y: image.height };
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      readyRef.current = true;
      setReady(true);
    };
    image.onerror = () => {
      console.error("Failed to load dither image:", imageSrc);
      failedRef.current = true;
    };
    image.src = imageSrc;

    if (image.complete) {
      image.onload?.(new Event("load"));
    }

    uniformsRef.current = {
      u_image: gl.getUniformLocation(program, "u_image"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_imageResolution: gl.getUniformLocation(program, "u_imageResolution"),
      u_gridSize: gl.getUniformLocation(program, "u_gridSize"),
    };
    gl.uniform1i(uniformsRef.current.u_image, 0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      if (failedRef.current) return;
      if (!readyRef.current) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      gl.useProgram(programRef.current);
      gl.uniform2f(
        uniformsRef.current.u_resolution,
        canvas.width,
        canvas.height
      );
      gl.uniform2f(
        uniformsRef.current.u_imageResolution,
        imageResolutionRef.current.x,
        imageResolutionRef.current.y
      );
      gl.uniform1f(uniformsRef.current.u_gridSize, 6.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [imageSrc]);

  return (
    <>
      <div
        className={`fixed inset-0 z-0 ${className}`}
        aria-hidden="true"
        style={{
          backgroundImage: "url('/cyberpunk-city-sm.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(130%) brightness(20%)",
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-0 ${className}`}
        aria-hidden="true"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      />
      {/* Legibility overlay: dark gradient on the left where text lives */}
      <div
        className={`fixed inset-0 z-0 ${className}`}
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.0) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
