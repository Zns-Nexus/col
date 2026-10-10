import * as React from "react";
import { DropdownMenu, Slider } from "radix-ui";
import { ArrowDown, Check, MicIcon, PauseIcon, PlayIcon, Settings, X } from "lucide-react";
import type { StoryRender } from "./type";

/**
 * Preview stories for ElevenLabs UI. The library is a shadcn-style registry
 * (no npm package), so each documented component is implemented here from the
 * official docs at ui.elevenlabs.io, on top of Radix UI + Tailwind with Col's
 * theme tokens. Audio-reactive pieces (the WebGL Orb, live microphone capture)
 * render a deterministic still of their documented visual state — the preview
 * canvas captures static frames and never runs continuous animation.
 */

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/** Deterministic pseudo-random source so seeded visuals stay identical across renders. */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

function drawRoundedBar(
  context: CanvasRenderingContext2D,
  x: number,
  centerY: number,
  width: number,
  height: number,
  radius: number,
): void {
  const half = Math.max(height / 2, 0.5);
  const r = Math.min(radius, half);
  context.beginPath();
  context.moveTo(x, centerY - half);
  context.lineTo(x + width, centerY - half);
  context.quadraticCurveTo(x + width + r, centerY - half, x + width + r, centerY - half + r);
  context.lineTo(x + width + r, centerY + half - r);
  context.quadraticCurveTo(x + width + r, centerY + half, x + width, centerY + half);
  context.lineTo(x, centerY + half);
  context.quadraticCurveTo(x - r, centerY + half, x - r, centerY + half - r);
  context.lineTo(x - r, centerY - half + r);
  context.quadraticCurveTo(x - r, centerY - half, x, centerY - half);
  context.closePath();
  context.fill();
}

/** Paints one waveform frame: symmetric bars with optional edge fade. */
function drawWaveformFrame(
  canvas: HTMLCanvasElement,
  values: readonly number[],
  options: {
    barWidth: number;
    barHeight: number;
    barGap: number;
    barRadius: number;
    barColor: string;
    fadeEdges: boolean;
    fadeWidth: number;
  },
): void {
  const context = canvas.getContext("2d");
  if (!context) return;
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.max(Math.floor(width * ratio), 1);
  canvas.height = Math.max(Math.floor(height * ratio), 1);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = options.barColor;

  const centerY = height / 2;
  const slot = options.barWidth + options.barGap;
  const bars = Math.min(values.length, Math.max(Math.floor(width / slot), 1));
  for (let index = 0; index < bars; index += 1) {
    const value = Math.max(Math.min(values[index] ?? 0, 1), 0);
    const barHeight = Math.max(value * (height - options.barHeight) + options.barHeight, options.barHeight);
    if (options.fadeEdges) {
      const x = index * slot;
      const edge = Math.min(x, width - (x + options.barWidth));
      const fade = options.fadeWidth > 0 ? Math.max(Math.min(edge / options.fadeWidth, 1), 0) : 1;
      context.globalAlpha = 0.15 + 0.85 * fade;
    }
    drawRoundedBar(context, index * slot, centerY, options.barWidth, barHeight, options.barRadius);
    context.globalAlpha = 1;
  }
}

/** Resolves the bar color the docs describe: `barColor` or the theme's foreground. */
function resolveBarColor(barColor: string | undefined): string {
  if (barColor) return barColor;
  if (typeof window === "undefined") return "#ffffff";
  return getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#ffffff";
}

// ---------------------------------------------------------------------------
// Small in-module button base (the registry's Button the docs build on)
// ---------------------------------------------------------------------------

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const buttonVariants: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "text-foreground hover:bg-muted",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "size-10",
};

function Button({ variant = "default", size = "default", className, type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...rest}
    />
  );
}

// ---------------------------------------------------------------------------
// Orb — documented props from https://ui.elevenlabs.io/docs/components/orb
// ---------------------------------------------------------------------------

type AgentState = null | "thinking" | "listening" | "talking";

type OrbProps = {
  colors?: [string, string];
  colorsRef?: React.RefObject<[string, string]>;
  resizeDebounce?: number;
  seed?: number;
  agentState?: AgentState;
  volumeMode?: "auto" | "manual";
  manualInput?: number;
  manualOutput?: number;
  inputVolumeRef?: React.RefObject<number>;
  outputVolumeRef?: React.RefObject<number>;
  getInputVolume?: () => number;
  getOutputVolume?: () => number;
  className?: string;
};

function orbVolume(
  mode: "auto" | "manual",
  manual: number | undefined,
  ref: React.RefObject<number> | undefined,
  read: (() => number) | undefined,
): number {
  const raw = mode === "manual" ? manual : (read?.() ?? ref?.current ?? 0);
  return Math.max(Math.min(raw ?? 0, 1), 0);
}

/**
 * The documented orb is a Three.js mesh with per-frame shader animation; the
 * preview renders one deterministic canvas frame of the same state: the two
 * stop gradient, the audio-volume swell, and the agent-state ring.
 */
function Orb({
  colors = ["#CADCFC", "#A0B9D1"],
  colorsRef,
  resizeDebounce = 100,
  seed = 1,
  agentState = null,
  volumeMode = "auto",
  manualInput,
  manualOutput,
  inputVolumeRef,
  outputVolumeRef,
  getInputVolume,
  getOutputVolume,
  className,
}: OrbProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [activeColors, setActiveColors] = React.useState<[string, string]>(colors);

  React.useEffect(() => {
    if (colorsRef?.current) setActiveColors(colorsRef.current);
  }, [colorsRef]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const context = canvas.getContext("2d");
      if (!context) return;
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const inputVolume = orbVolume(volumeMode, manualInput, inputVolumeRef, getInputVolume);
      const outputVolume = orbVolume(volumeMode, manualOutput, outputVolumeRef, getOutputVolume);
      const volume = Math.max(inputVolume, outputVolume);
      const radius = Math.min(width, height) / 2 - 2 - volume * 3;
      const cx = width / 2;
      const cy = height / 2;

      const gradient = context.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.4,
        radius * 0.1,
        cx,
        cy,
        radius,
      );
      gradient.addColorStop(0, activeColors[0]);
      gradient.addColorStop(1, activeColors[1]);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fill();

      const random = seededRandom(seed);
      context.globalAlpha = 0.18;
      context.strokeStyle = activeColors[0];
      for (let band = 0; band < 4; band += 1) {
        const base = radius * (0.28 + band * 0.16);
        context.lineWidth = Math.max(radius * 0.05, 1.5);
        context.beginPath();
        for (let step = 0; step <= 48; step += 1) {
          const angle = (step / 48) * Math.PI * 2;
          const swell = (random() - 0.5) * radius * 0.06 + volume * radius * 0.06;
          const r = base + swell * Math.sin(angle * (band + 2));
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.stroke();
      }
      context.globalAlpha = 1;

      if (agentState !== null) {
        context.strokeStyle = activeColors[0];
        context.lineWidth = Math.max(radius * 0.045, 1.5);
        if (agentState === "thinking") context.setLineDash([radius * 0.18, radius * 0.14]);
        context.beginPath();
        context.arc(cx, cy, radius + Math.max(radius * 0.12, 4), 0, Math.PI * 2);
        context.stroke();
        context.setLineDash([]);
      }
    };

    draw();
    let timer: number | undefined;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(draw, resizeDebounce);
    });
    observer.observe(canvas);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeColors, agentState, getInputVolume, getOutputVolume, inputVolumeRef, manualInput, manualOutput, outputVolumeRef, resizeDebounce, seed, volumeMode]);

  return <canvas ref={canvasRef} className={classNames("block h-full w-full", className)} aria-hidden="true" />;
}

// ---------------------------------------------------------------------------
// Waveform family — documented props from https://ui.elevenlabs.io/docs/components/waveform
// ---------------------------------------------------------------------------

type WaveformProps = {
  data: number[];
  barWidth?: number;
  barHeight?: number;
  barGap?: number;
  barRadius?: number;
  barColor?: string;
  fadeEdges?: boolean;
  fadeWidth?: number;
  height?: string | number;
  onBarClick?: (index: number, value: number) => void;
};

function Waveform({
  data,
  barWidth = 4,
  barHeight = 4,
  barGap = 2,
  barRadius = 2,
  barColor,
  fadeEdges = true,
  fadeWidth = 24,
  height = 128,
  onBarClick,
}: WaveformProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawWaveformFrame(canvas, data, {
      barWidth,
      barHeight,
      barGap,
      barRadius,
      barColor: resolveBarColor(barColor),
      fadeEdges,
      fadeWidth,
    });
    const observer = new ResizeObserver(() =>
      drawWaveformFrame(canvas, data, {
        barWidth,
        barHeight,
        barGap,
        barRadius,
        barColor: resolveBarColor(barColor),
        fadeEdges,
        fadeWidth,
      }),
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [barColor, barGap, barHeight, barRadius, barWidth, data, fadeEdges, fadeWidth]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onBarClick) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const slot = barWidth + barGap;
    const index = Math.max(Math.floor((event.clientX - rect.left) / slot), 0);
    if (index < data.length) onBarClick(index, data[index]);
  };

  return <canvas ref={canvasRef} onClick={handleClick} className="block w-full" style={{ height }} />;
}

type LiveWaveformProps = React.ComponentPropsWithoutRef<"div"> & {
  active?: boolean;
  processing?: boolean;
  barWidth?: number;
  barHeight?: number;
  barGap?: number;
  barRadius?: number;
  barColor?: string;
  fadeEdges?: boolean;
  fadeWidth?: number;
  height?: string | number;
  sensitivity?: number;
  smoothingTimeConstant?: number;
  fftSize?: number;
  historySize?: number;
  updateRate?: number;
  mode?: "scrolling" | "static";
  onError?: (error: Error) => void;
  onStreamReady?: (stream: MediaStream) => void;
  onStreamEnd?: () => void;
};

/**
 * The documented live visualizer draws three states (idle, processing wave,
 * active microphone spectrum). The preview renders one seeded frame per state;
 * the real component animates these frames with requestAnimationFrame.
 */
function LiveWaveform({
  active = false,
  processing = false,
  barWidth = 3,
  barHeight = 4,
  barGap = 1,
  barRadius = 1.5,
  barColor,
  fadeEdges = true,
  fadeWidth = 24,
  height = 64,
  sensitivity = 1,
  smoothingTimeConstant: _smoothingTimeConstant = 0.8,
  fftSize: _fftSize = 256,
  historySize = 60,
  updateRate: _updateRate = 30,
  mode = "static",
  onError: _onError,
  onStreamReady: _onStreamReady,
  onStreamEnd: _onStreamEnd,
  className,
  ...rest
}: LiveWaveformProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const random = seededRandom(historySize + (active ? 7 : processing ? 3 : 1));

    const values: number[] = [];
    const count = Math.max(Math.ceil(canvas.clientWidth / (barWidth + barGap)), 8);
    for (let index = 0; index < count; index += 1) {
      const position = index / Math.max(count - 1, 1);
      if (active) {
        const spectrum = Math.sin(position * Math.PI) * (0.55 + random() * 0.45);
        values.push(Math.max(Math.min(spectrum * sensitivity, 1), 0.04));
      } else if (processing) {
        const wave = (Math.sin(position * Math.PI * 3) + 1) / 2;
        values.push(0.12 + wave * 0.5);
      } else {
        values.push(mode === "scrolling" ? 0.08 + random() * 0.06 : 0.1);
      }
    }

    drawWaveformFrame(canvas, values, {
      barWidth,
      barHeight,
      barGap,
      barRadius,
      barColor: resolveBarColor(barColor),
      fadeEdges,
      fadeWidth,
    });
  }, [active, barColor, barGap, barHeight, barRadius, barWidth, fadeEdges, fadeWidth, historySize, mode, processing, sensitivity]);

  return (
    <div className={classNames("w-full", className)} {...rest}>
      <canvas ref={canvasRef} className="block w-full" style={{ height }} aria-hidden="true" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Audio Player — documented API from https://ui.elevenlabs.io/docs/components/audio-player
// ---------------------------------------------------------------------------

interface AudioPlayerItem<TData = unknown> {
  id: string | number;
  src: string;
  data?: TData;
}

interface AudioPlayerState<TData> {
  ref: React.RefObject<HTMLAudioElement | null>;
  activeItem: AudioPlayerItem<TData> | null;
  duration: number;
  error: MediaError | null;
  isPlaying: boolean;
  isBuffering: boolean;
  playbackRate: number;
  isItemActive: (id: string | number) => boolean;
  setActiveItem: (item: AudioPlayerItem<TData> | null) => void;
  play: (item?: AudioPlayerItem<TData>) => void;
  pause: () => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
}

/** The documented surface plus the timeline clock `useAudioPlayerTime` reads. */
type AudioPlayerContextValue<TData> = AudioPlayerState<TData> & { time: number };

const AudioPlayerContext = React.createContext<AudioPlayerContextValue<unknown> | null>(null);

/** The item's free-form `data` bag may declare a demo duration in seconds. */
function declaredDuration(item: AudioPlayerItem<unknown> | null): number {
  const data: unknown = item?.data;
  if (typeof data === "object" && data !== null && "durationSeconds" in data) {
    const value = (data as { durationSeconds?: unknown }).durationSeconds;
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return 0;
}

/**
 * Owns playback state for every audio part below. The preview has no bundled
 * media, so the timeline runs from the duration the item declares and the
 * `<audio>` element stays source-less; every documented hook and component
 * behaves as documented on top of it.
 */
function AudioPlayerProvider<TData = unknown>({ children }: { children: React.ReactNode }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [activeItem, setActiveItemState] = React.useState<AudioPlayerItem<TData> | null>(null);
  const [time, setTime] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playbackRate, setPlaybackRateState] = React.useState(1);

  const duration = declaredDuration(activeItem as AudioPlayerItem<unknown> | null);

  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setTime((previous) => {
        const next = previous + 0.25 * playbackRate;
        if (next >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return next;
      });
    }, 250);
    return () => window.clearInterval(timer);
  }, [duration, isPlaying, playbackRate]);

  const value = React.useMemo<AudioPlayerContextValue<TData>>(
    () => ({
      ref: audioRef,
      activeItem,
      duration,
      error: null,
      isPlaying,
      isBuffering: false,
      playbackRate,
      time,
      isItemActive: (id) => activeItem?.id === id,
      setActiveItem: (item) => {
        setActiveItemState(item);
        setTime(0);
      },
      play: (item) => {
        if (item) {
          setActiveItemState(item);
          setTime(0);
        }
        setIsPlaying(true);
      },
      pause: () => setIsPlaying(false),
      seek: (next) => setTime(Math.max(Math.min(next, duration > 0 ? duration : next), 0)),
      setPlaybackRate: setPlaybackRateState,
    }),
    [activeItem, duration, isPlaying, playbackRate, time],
  );

  return (
    <AudioPlayerContext.Provider value={value as AudioPlayerContextValue<unknown>}>
      <audio ref={audioRef} />
      {children}
    </AudioPlayerContext.Provider>
  );
}

function useAudioPlayer<TData = unknown>(): AudioPlayerState<TData> {
  const context = React.useContext(AudioPlayerContext);
  if (!context) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return context as AudioPlayerContextValue<TData>;
}

/** Documented to follow playback time; reads the provider's timeline clock. */
function useAudioPlayerTime(): number {
  const context = React.useContext(AudioPlayerContext);
  if (!context) throw new Error("useAudioPlayerTime must be used within AudioPlayerProvider");
  return context.time;
}

function AudioPlayerButton({ item, variant = "outline", size = "default", ...rest }: { item?: AudioPlayerItem } & ButtonProps) {
  const player = useAudioPlayer();
  const isActive = item ? player.isItemActive(item.id) : player.activeItem !== null;
  const isPlaying = isActive && player.isPlaying;
  return (
    <Button
      variant={variant}
      size={size}
      aria-label={isPlaying ? "Pause" : "Play"}
      onClick={() => (isPlaying ? player.pause() : player.play(item))}
      {...rest}
    >
      {player.isBuffering ? (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : isPlaying ? (
        <PauseIcon className="size-4" />
      ) : (
        <PlayIcon className="size-4" />
      )}
    </Button>
  );
}

function AudioPlayerProgress({ className, ...rest }: Omit<React.ComponentPropsWithoutRef<typeof Slider.Root>, "min" | "max" | "value">) {
  const player = useAudioPlayer();
  const time = useAudioPlayerTime();
  const percent = player.duration > 0 ? (time / player.duration) * 100 : 0;
  return (
    <Slider.Root
      value={[percent]}
      min={0}
      max={100}
      onValueChange={(next) => player.seek(((next[0] ?? 0) / 100) * player.duration)}
      className={classNames("relative flex h-5 w-full touch-none select-none items-center", className)}
      {...rest}
    >
      <Slider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
        <Slider.Range className="absolute h-full bg-primary" />
      </Slider.Track>
      <Slider.Thumb className="block size-4 rounded-full border border-primary bg-background" />
    </Slider.Root>
  );
}

function AudioPlayerTime({ className, ...rest }: React.ComponentPropsWithoutRef<"span">) {
  const time = useAudioPlayerTime();
  return (
    <span className={className} {...rest}>
      {formatTime(time)}
    </span>
  );
}

function AudioPlayerDuration({ className, ...rest }: React.ComponentPropsWithoutRef<"span">) {
  const { duration } = useAudioPlayer();
  return (
    <span className={className} {...rest}>
      {duration > 0 ? formatTime(duration) : "--:--"}
    </span>
  );
}

function speedLabel(rate: number): string {
  return rate === 1 ? "Normal" : `${rate}x`;
}

function AudioPlayerSpeed({
  speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  variant = "ghost",
  size = "icon",
  ...rest
}: { speeds?: readonly number[] } & ButtonProps) {
  const player = useAudioPlayer();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant={variant} size={size} aria-label="Playback speed" {...rest}>
          <Settings className="size-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[120px] rounded-md border border-border bg-popover p-1 text-popover-foreground">
          {speeds.map((speed) => (
            <DropdownMenu.Item
              key={speed}
              className="rounded-sm px-2 py-1.5 text-sm"
              onSelect={() => player.setPlaybackRate(speed)}
            >
              {speedLabel(speed)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function AudioPlayerSpeedButtonGroup({
  speeds = [0.5, 1, 1.5, 2],
  className,
  ...rest
}: { speeds?: readonly number[] } & React.ComponentPropsWithoutRef<"div">) {
  const player = useAudioPlayer();
  return (
    <div className={classNames("flex gap-1", className)} {...rest}>
      {speeds.map((speed) => (
        <Button
          key={speed}
          size="sm"
          variant={player.playbackRate === speed ? "secondary" : "ghost"}
          className="px-2 text-xs"
          onClick={() => player.setPlaybackRate(speed)}
        >
          {speedLabel(speed)}
        </Button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Conversation — documented API from https://ui.elevenlabs.io/docs/components/conversation
// ---------------------------------------------------------------------------

type ConversationProps = React.ComponentPropsWithoutRef<"div"> & {
  initial?: "smooth";
  resize?: "smooth";
};

function Conversation({ className, initial: _initial = "smooth", resize: _resize = "smooth", ...rest }: ConversationProps) {
  return <div className={classNames("relative flex-1 overflow-y-auto", className)} {...rest} />;
}

function ConversationContent({ className, ...rest }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={classNames("flex flex-col gap-4", className)} {...rest} />;
}

type ConversationEmptyStateProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

function ConversationEmptyState({
  title = "No messages yet",
  description,
  icon,
  className,
}: ConversationEmptyStateProps) {
  return (
    <div className={classNames("flex h-full flex-col items-center justify-center gap-3 text-center", className)}>
      {icon}
      <p className="text-sm font-medium">{title}</p>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function ConversationScrollButton({ className, ...rest }: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type="button"
      aria-label="Scroll to latest message"
      className={classNames(
        "absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full border border-border bg-popover text-popover-foreground",
        className,
      )}
      {...rest}
    >
      <ArrowDown className="size-4" />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Voice Button — documented API from https://ui.elevenlabs.io/docs/components/voice-button
// ---------------------------------------------------------------------------

type VoiceButtonState = "idle" | "recording" | "processing" | "success" | "error";

type VoiceButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  state?: VoiceButtonState;
  onPress?: () => void;
  label?: React.ReactNode;
  trailing?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  waveformClassName?: string;
  feedbackDuration?: number;
};

function VoiceButton({
  state = "idle",
  onPress,
  label,
  trailing,
  icon,
  variant = "outline",
  size = "default",
  className,
  waveformClassName,
  feedbackDuration: _feedbackDuration = 1500,
  onClick,
  ...rest
}: VoiceButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={classNames("relative overflow-hidden", className)}
      onClick={(event) => {
        onPress?.();
        onClick?.(event);
      }}
      {...rest}
    >
      {label ? <span>{label}</span> : null}
      {state === "recording" ? (
        <span className={classNames("flex h-full flex-1 items-center gap-0.5 px-1", waveformClassName)}>
          {Array.from({ length: 16 }, (_, index) => (
            <span
              key={index}
              className="w-0.5 rounded-full bg-current"
              style={{ height: `${20 + Math.abs(Math.sin(index * 1.7)) * 55}%` }}
            />
          ))}
        </span>
      ) : null}
      {state === "processing" ? <span className="size-4 rounded-full border-2 border-current border-t-transparent" /> : null}
      {state === "success" ? <Check className="size-4" /> : null}
      {state === "error" ? <X className="size-4" /> : null}
      {state === "idle" && icon ? icon : state === "idle" && size === "icon" ? <MicIcon className="size-4" /> : null}
      {trailing ? <span className="text-xs opacity-70">{trailing}</span> : null}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

const OrbStory: StoryRender = ({ sample }) => (
  <div className="flex w-full max-w-xl flex-col items-center gap-6">
    <div className="grid grid-cols-3 gap-6">
      {(
        [
          ["#CADCFC", "#A0B9D1", null],
          ["#F6E7D8", "#E0CFC2", "listening"],
          ["#E5E7EB", "#9CA3AF", "talking"],
        ] as Array<[string, string, AgentState]>
      ).map(([from, to, state], index) => (
        <div key={from} className="bg-muted size-32 rounded-full p-1 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
          <div className="bg-background size-full overflow-hidden rounded-full shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]">
            <Orb colors={[from, to]} seed={(index + 1) * 1000} agentState={state} />
          </div>
        </div>
      ))}
    </div>
    <div className="text-center">
      <p className="text-lg font-semibold">{sample.headline ?? "Meet Nova, the voice agent that never sleeps"}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {sample.support ?? "Idle, listening, and talking states — rendered from one seeded frame."}
      </p>
    </div>
  </div>
);

interface TrackData {
  title: string;
  artist: string;
  durationSeconds: number;
}

type Track = AudioPlayerItem<TrackData>;

const podcastTracks: Track[] = [
  { id: "ep-48", src: "/audio/episode-48.mp3", data: { title: "Ep. 48 — Shipping voice agents", artist: "Signal & Noise", durationSeconds: 227 } },
  { id: "ep-47", src: "/audio/episode-47.mp3", data: { title: "Ep. 47 — Latency is a feature", artist: "Signal & Noise", durationSeconds: 312 } },
  { id: "ep-46", src: "/audio/episode-46.mp3", data: { title: "Ep. 46 — Designing for interruption", artist: "Signal & Noise", durationSeconds: 186 } },
];

function AudioPlayerPanel({ sample }: { sample: Readonly<Record<string, string>> }) {
  const player = useAudioPlayer<TrackData>();
  React.useEffect(() => {
    // Seed the featured episode and a mid-track pause so the static preview
    // shows the player the way it looks in use, via the documented hooks only.
    player.setActiveItem(podcastTracks[0]);
    player.seek(84);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const active = player.activeItem ?? podcastTracks[0];
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
      <div className="flex items-center gap-4 p-6">
        <AudioPlayerButton item={active} variant="outline" size="icon" className="shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{sample.trackTitle ?? active.data?.title}</p>
          <p className="truncate text-sm text-muted-foreground">{sample.trackArtist ?? active.data?.artist}</p>
        </div>
        <AudioPlayerSpeed variant="ghost" size="icon" />
      </div>
      <div className="flex items-center gap-3 px-6">
        <AudioPlayerTime className="text-xs tabular-nums text-muted-foreground" />
        <AudioPlayerProgress className="flex-1" />
        <AudioPlayerDuration className="text-xs tabular-nums text-muted-foreground" />
      </div>
      <div className="mt-4 grid gap-1 border-t border-border p-3">
        {podcastTracks.map((track, index) => (
          <button
            key={track.id}
            type="button"
            className={classNames(
              "flex items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm",
              player.isItemActive(track.id) ? "bg-secondary" : "hover:bg-muted",
            )}
            onClick={() => player.setActiveItem(track)}
          >
            <span className="w-5 shrink-0 text-center text-xs tabular-nums text-muted-foreground">{index + 1}</span>
            <span className="truncate">{track.data?.title}</span>
            <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">
              {formatTime(track.data?.durationSeconds ?? 0)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const AudioPlayerStory: StoryRender = ({ sample }) => (
  <AudioPlayerProvider>
    <AudioPlayerPanel sample={sample} />
  </AudioPlayerProvider>
);

const WaveformData = Array.from({ length: 72 }, (_, index) => {
  const envelope = Math.sin((index / 71) * Math.PI) * 0.65 + 0.25;
  return Math.max(Math.min(envelope + Math.sin(index * 1.31) * 0.12, 1), 0.06);
});

const WaveformStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 text-card-foreground">
    <div className="mb-3 flex items-baseline justify-between">
      <p className="text-sm font-semibold">{sample.title ?? "Field notes — voice memo"}</p>
      <p className="text-xs tabular-nums text-muted-foreground">{sample.duration ?? "1:12 recorded"}</p>
    </div>
    <Waveform data={WaveformData} height={96} barWidth={4} barGap={2} barColor="var(--muted-foreground)" />
    <p className="mt-3 text-xs text-muted-foreground">
      {sample.caption ?? "Tap a bar to jump to that moment in the recording."}
    </p>
  </div>
);

const LiveWaveformStory: StoryRender = ({ sample }) => (
  <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 text-card-foreground">
    <p className="text-base font-semibold">{sample.title ?? "Transcribing your note"}</p>
    <p className="mt-1 text-sm text-muted-foreground">
      {sample.caption ?? "Processing the recording — the waveform shows the incoming audio."}
    </p>
    <div className="mt-5">
      <LiveWaveform processing mode="static" height={80} barWidth={3} barGap={2} barColor="var(--muted-foreground)" />
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      <Button size="sm" variant="outline">
        Cancel
      </Button>
      <Button size="sm" variant="secondary">
        Keep listening
      </Button>
    </div>
  </div>
);

interface ChatMessage {
  id: string;
  from: "user" | "assistant";
  text: string;
}

const ConversationStory: StoryRender = ({ sample }) => {
  const messages: ChatMessage[] = [
    { id: "1", from: "user", text: sample.question1 ?? "Hey, I need help with my order." },
    {
      id: "2",
      from: "assistant",
      text: sample.answer1 ?? "Happy to help. Could you share your order number?",
    },
    { id: "3", from: "user", text: sample.question2 ?? "It's ORDER-12345." },
    {
      id: "4",
      from: "assistant",
      text:
        sample.answer2 ??
        "Thanks! Order ORDER-12345 was placed on March 15th and ships within 1–2 business days. Want to change anything before it leaves?",
    },
  ];
  return (
    <div className="relative h-[360px] w-full max-w-md rounded-xl border border-border bg-card text-card-foreground">
      <div className="flex h-full flex-col">
        <Conversation className="p-4">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id} className={classNames("flex", message.from === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={classNames(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    message.from === "user" ? "bg-secondary text-secondary-foreground" : "border border-border text-foreground",
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </ConversationContent>
        </Conversation>
        <ConversationScrollButton />
      </div>
    </div>
  );
};

const VoiceButtonStory: StoryRender = ({ sample }) => (
  <div className="flex min-h-[160px] w-full max-w-md flex-col items-center justify-center gap-4">
    <VoiceButton
      state="recording"
      label={sample.label ?? "Push to talk"}
      trailing={sample.trailing ?? "⌥Space"}
      className="min-w-[220px]"
    />
    <p className="text-sm text-muted-foreground">
      {sample.caption ?? "Release to send — the agent replies in about a second."}
    </p>
  </div>
);

export const storyRenders: Record<string, StoryRender> = {
  "elevenlabs-ui/Orb": OrbStory,
  "elevenlabs-ui/Audio Player": AudioPlayerStory,
  "elevenlabs-ui/Waveform": WaveformStory,
  "elevenlabs-ui/Live Waveform": LiveWaveformStory,
  "elevenlabs-ui/Conversation": ConversationStory,
  "elevenlabs-ui/Voice Button": VoiceButtonStory,
};
