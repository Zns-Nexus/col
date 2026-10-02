# Production brand assets

The original Col mark is reconstructed as two rounded brackets with a central opening. The SVG is the source of truth; assets contain no generated textures or raster speckles.

- `col-mark.svg`: white vector, used by the site's shared sidebar/mobile header and footer. Existing light-theme styling inverts it to black.
- `col-mark-black.svg`: black vector for light backgrounds.
- `col-mark-white.png`, `col-mark-black.png`: 1024 × 1024 transparent exports.
- `app/icon.svg`: white mark on black for scalable browser tabs.
- `app/favicon.ico`: 16, 32, and 48 px entries for browser compatibility.
- `app/apple-icon.png`: 180 × 180 opaque home-screen icon with generous inset.

Run `node scripts/generate-brand-assets.mjs` to rebuild exports from the white SVG. Next.js discovers the three app icons automatically. The live Col lettering retains the site's rounded font and accessible link labels.
