/*
 * Light Rays, from React Bits: https://reactbits.dev/backgrounds/light-rays
 * Copyright (c) 2026 David Haz. MIT + Commons Clause License Condition v1.0:
 * https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md
 *
 * The shader and props are React Bits' own. Changes for use as a page
 * background: the ogl scene setup is replaced with plain WebGL, the canvas
 * renders at half resolution and at most 30 fps, it pauses while off-screen
 * or in a background tab, and draws a single still frame under reduced
 * motion. `raysAngle` is new: it tilts the beam away from the origin's
 * default direction. `paused` is new too: it holds the current frame and stops
 * rendering, for when the rays are dimmed behind other content.
 */
"use client";

import { useEffect, useRef } from "react";

export type RaysOrigin = "top-center" | "top-left" | "top-right" | "right" | "left" | "bottom-center" | "bottom-right" | "bottom-left";

type LightRaysSettings = {
  raysOrigin: RaysOrigin;
  /** Degrees to rotate the beam from the origin's default direction; positive turns clockwise. */
  raysAngle: number;
  raysColor: string;
  raysSpeed: number;
  lightSpread: number;
  rayLength: number;
  pulsating: boolean;
  fadeDistance: number;
  saturation: number;
  followMouse: boolean;
  mouseInfluence: number;
  noiseAmount: number;
  distortion: number;
  lightMode: boolean;
  /** Holds the last frame and stops the render loop. */
  paused: boolean;
};

export type LightRaysProps = Partial<LightRaysSettings> & { className?: string };

const DEFAULTS: LightRaysSettings = {
  raysOrigin: "top-center",
  raysAngle: 0,
  raysColor: "#ffffff",
  raysSpeed: 1,
  lightSpread: 1,
  rayLength: 2,
  pulsating: false,
  fadeDistance: 1,
  saturation: 1,
  followMouse: true,
  mouseInfluence: 0.1,
  noiseAmount: 0,
  distortion: 0,
  lightMode: false,
  paused: false,
};

/** Share of CSS pixels actually rendered; the rays are soft, so upscaling is invisible. */
const RENDER_SCALE = 0.5;
const FRAME_INTERVAL = 1000 / 30;
/** Time used for the single frame drawn under reduced motion. */
const STILL_TIME = 2;

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;
uniform float lightMode;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;

  if (lightMode > 0.5) {
    vec3 mapped = vec3(1.0) - exp(-max(fragColor.rgb, vec3(0.0)) * 1.35);
    float energy = clamp(max(mapped.r, max(mapped.g, mapped.b)), 0.0, 1.0);
    vec3 hue = mapped / max(energy, 0.0001);
    vec3 ink = mix(hue * 0.25, hue * 0.72, energy);
    fragColor = vec4(mix(vec3(1.0), ink, energy), 1.0);
  }
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`;

const UNIFORMS = [
  "iTime", "iResolution", "rayPos", "rayDir", "raysColor", "raysSpeed", "lightSpread", "rayLength", "pulsating",
  "fadeDistance", "saturation", "mousePos", "mouseInfluence", "noiseAmount", "distortion", "lightMode",
] as const;

type Vec2 = [number, number];

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

function anchorAndDir(origin: RaysOrigin, w: number, h: number): { anchor: Vec2; dir: Vec2 } {
  const outside = 0.2;
  switch (origin) {
    case "top-left": return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right": return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left": return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right": return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left": return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center": return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right": return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default: return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
}

/** Rotates a direction clockwise on screen (y points down) by `degrees`. */
function rotate([x, y]: Vec2, degrees: number): Vec2 {
  const r = (degrees * Math.PI) / 180;
  return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create a WebGL shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "Shader failed to compile.");
  return shader;
}

/** Animated light rays that fill their positioned parent. Renders nothing if WebGL is unavailable. */
export function LightRays({ className, ...props }: LightRaysProps) {
  const container = useRef<HTMLDivElement>(null);
  const settings = useRef<LightRaysSettings>({ ...DEFAULTS, ...props });
  /** The render loop's restart hook, so `paused` can stop and resume it without rebuilding the context. */
  const restart = useRef<(() => void) | null>(null);
  const redraw = useRef<(() => void) | null>(null);

  // The render loop reads the latest props from here, so prop changes never rebuild the WebGL context.
  useEffect(() => {
    const nextSettings = { ...DEFAULTS, ...props };
    const lightModeChanged = settings.current.lightMode !== nextSettings.lightMode;
    settings.current = nextSettings;
    if (lightModeChanged) redraw.current?.();
  });

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "display:block;width:100%;height:100%";
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
    if (!gl) return;

    const createResources = () => {
      try {
        const program = gl.createProgram();
        if (!program) throw new Error("Could not create a WebGL program.");
        gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
        gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "Shader failed to link.");
        gl.useProgram(program);
        // One triangle that covers the whole viewport.
        const buffer = gl.createBuffer();
        if (!buffer) throw new Error("Could not create a WebGL buffer.");
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        return Object.fromEntries(UNIFORMS.map((name) => [name, gl.getUniformLocation(program, name)])) as Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;
      } catch (error) {
        console.warn("Light rays disabled:", error);
        return null;
      }
    };
    let uniform = createResources();
    if (!uniform) return;
    element.appendChild(canvas);

    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: 0.5, y: 0.5, clientX: 0, clientY: 0, moved: false };
    let visible = false;
    let frame = 0;
    let last = 0;

    const draw = (time: number) => {
      if (!uniform || gl.isContextLost()) return;
      const s = settings.current;
      const { width: w, height: h } = canvas;
      const { anchor, dir } = anchorAndDir(s.raysOrigin, w, h);
      gl.viewport(0, 0, w, h);
      gl.uniform1f(uniform.iTime, time);
      gl.uniform2f(uniform.iResolution, w, h);
      gl.uniform2f(uniform.rayPos, ...anchor);
      gl.uniform2f(uniform.rayDir, ...rotate(dir, s.raysAngle));
      gl.uniform3f(uniform.raysColor, ...hexToRgb(s.raysColor));
      gl.uniform1f(uniform.raysSpeed, s.raysSpeed);
      gl.uniform1f(uniform.lightSpread, s.lightSpread);
      gl.uniform1f(uniform.rayLength, s.rayLength);
      gl.uniform1f(uniform.pulsating, s.pulsating ? 1 : 0);
      gl.uniform1f(uniform.fadeDistance, s.fadeDistance);
      gl.uniform1f(uniform.saturation, s.saturation);
      gl.uniform2f(uniform.mousePos, mouse.x, mouse.y);
      gl.uniform1f(uniform.mouseInfluence, s.mouseInfluence);
      gl.uniform1f(uniform.noiseAmount, s.noiseAmount);
      gl.uniform1f(uniform.distortion, s.distortion);
      gl.uniform1f(uniform.lightMode, s.lightMode ? 1 : 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - last < FRAME_INTERVAL) return;
      last = now;
      if (mouse.moved) {
        const rect = element.getBoundingClientRect();
        const targetX = (mouse.clientX - rect.left) / rect.width;
        const targetY = (mouse.clientY - rect.top) / rect.height;
        // React Bits eases 8% per frame at 60 fps; this is the same pull per 30 fps frame.
        mouse.x += (targetX - mouse.x) * 0.15;
        mouse.y += (targetY - mouse.y) * 0.15;
      }
      draw(now / 1000);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const start = () => {
      stop();
      if (!visible || document.hidden || gl.isContextLost() || !uniform) return;
      if (stillness.matches || settings.current.paused) draw(stillness.matches ? STILL_TIME : last / 1000);
      else frame = requestAnimationFrame(tick);
    };
    redraw.current = () => {
      if ((!stillness.matches && !settings.current.paused) || !visible || document.hidden || gl.isContextLost()) return;
      draw(stillness.matches ? STILL_TIME : last / 1000);
    };

    const contextLost = (event: Event) => {
      event.preventDefault();
      stop();
      uniform = null;
    };
    const contextRestored = () => {
      uniform = createResources();
      start();
    };

    const resize = () => {
      canvas.width = Math.max(1, Math.round(element.clientWidth * RENDER_SCALE));
      canvas.height = Math.max(1, Math.round(element.clientHeight * RENDER_SCALE));
      if (visible && !frame) start();
    };
    const pointer = (event: PointerEvent) => {
      if (!settings.current.followMouse) return;
      mouse.clientX = event.clientX;
      mouse.clientY = event.clientY;
      mouse.moved = true;
    };

    const sizeObserver = new ResizeObserver(resize);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      start();
    });
    resize();
    sizeObserver.observe(element);
    viewObserver.observe(element);
    document.addEventListener("visibilitychange", start);
    stillness.addEventListener("change", start);
    window.addEventListener("pointermove", pointer, { passive: true });
    canvas.addEventListener("webglcontextlost", contextLost);
    canvas.addEventListener("webglcontextrestored", contextRestored);
    restart.current = start;

    return () => {
      restart.current = null;
      redraw.current = null;
      stop();
      sizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", start);
      stillness.removeEventListener("change", start);
      window.removeEventListener("pointermove", pointer);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  useEffect(() => {
    restart.current?.();
  }, [props.paused]);

  return <div ref={container} className={className} aria-hidden />;
}
