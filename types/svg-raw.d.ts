// webcoreui ships raw-source .tsx files that import SVGs with Vite's `?raw`
// suffix; this ambient shape lets tsc resolve those imports.
declare module "*.svg?raw" {
  const svg: string;
  export default svg;
}
