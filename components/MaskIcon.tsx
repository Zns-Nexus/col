import type { CSSProperties } from "react";
import type { Category } from "@/data/libraries";

export type IconComponent = (props: { className?: string }) => React.JSX.Element;

/** Renders a monochrome PNG from /public/icons as a mask, so it takes the current text color. */
export function maskIcon(name: string): IconComponent {
  const style = { "--icon-src": `url("/icons/${name}.png")` } as CSSProperties;
  function MaskedIcon({ className = "" }: { className?: string }) {
    return <span aria-hidden="true" className={`mask-icon ${className}`} style={style} />;
  }
  MaskedIcon.displayName = `MaskIcon(${name})`;
  return MaskedIcon;
}

export const Icons = {
  home: maskIcon("home"),
  libraries: maskIcon("folder"),
  docs: maskIcon("book-open"),
  contributors: maskIcon("profile-2user"),
  sponsors: maskIcon("lovely"),
  allLibraries: maskIcon("category"),
  componentLibrary: maskIcon("main-component"),
  animation: maskIcon("colorfilter"),
  templates: maskIcon("grid-edit"),
  icons: maskIcon("smileys"),
  charts: maskIcon("chart"),
  threeD: maskIcon("3d-rotate"),
  css: maskIcon("color-swatch"),
  inspiration: maskIcon("lamp-on"),
  list: maskIcon("row-vertical"),
} satisfies Record<string, IconComponent>;

export const categoryIcons: Record<Category, IconComponent> = {
  "Component Library": Icons.componentLibrary,
  "Animation & Motion": Icons.animation,
  "Templates & Blocks": Icons.templates,
  Icons: Icons.icons,
  "Charts & Data Viz": Icons.charts,
  "3D & WebGL": Icons.threeD,
  "CSS Framework": Icons.css,
  "Design Inspiration": Icons.inspiration,
};
