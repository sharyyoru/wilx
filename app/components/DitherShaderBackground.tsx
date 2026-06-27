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
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_gridSize;

  mat4 bayer = mat4(
    0.0, 8.0, 2.0, 10.0,
    12.0, 4.0, 14.0, 6.0,
    3.0, 11.0, 1.0, 9.0,
    15.0, 7.0, 13.0, 5.0
  );

  float bayerValue(vec2 coord) {
    ivec2 ij = ivec2(mod(floor(coord / u_gridSize), 4.0));
    return bayer[ij.x][ij.y] / 16.0;
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
    gray = clamp((gray - 0.45) * 1.35 + 0.45, 0.0, 1.0);

    vec2 mouseUV = u_mouse / u_resolution;
    float dist = distance(v_texCoord, mouseUV);
    float mouseGlow = smoothstep(0.5, 0.0, dist) * 0.3;
    float ripple = sin(dist * 20.0 - u_time * 2.0) * 0.05 * smoothstep(0.6, 0.0, dist);

    float threshold = bayerValue(gl_FragCoord.xy) - mouseGlow + ripple;
    float dithered = step(threshold, gray);

    float vignette = 1.0 - smoothstep(0.5, 1.5, length(v_texCoord - 0.5) * 1.0) * 0.4;
    float final = dithered * vignette;

    gl_FragColor = vec4(vec3(final), 1.0);
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
  imageSrc = "/dubai-skyline-sm.jpg",
  className = "",
}: {
  imageSrc?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const imageResolutionRef = useRef({ x: 1, y: 1 });
  const startTimeRef = useRef(0);
  const failedRef = useRef(false);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
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
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
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

    uniformsRef.current = {
      u_image: gl.getUniformLocation(program, "u_image"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_imageResolution: gl.getUniformLocation(program, "u_imageResolution"),
      u_mouse: gl.getUniformLocation(program, "u_mouse"),
      u_time: gl.getUniformLocation(program, "u_time"),
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

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: window.innerHeight - e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      targetMouseRef.current = {
        x: touch.clientX,
        y: window.innerHeight - touch.clientY,
      };
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const render = () => {
      if (failedRef.current || !readyRef.current) return;

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.08;

      const time = prefersReducedMotion
        ? 0
        : (Date.now() - startTimeRef.current) / 1000;

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
      gl.uniform2f(
        uniformsRef.current.u_mouse,
        mouseRef.current.x,
        mouseRef.current.y
      );
      gl.uniform1f(uniformsRef.current.u_time, time);
      gl.uniform1f(uniformsRef.current.u_gridSize, 4.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
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
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(130%) brightness(30%)",
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
    </>
  );
}
