import type { LibraryDetails } from "./types";

export default {
  docsUrl: "https://rive.app/docs",
  repoUrl: "https://github.com/rive-app/rive-wasm",
  preview: {
    src: "https://rive.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3D%2B%26title%3DIntroduction%26description%3DRive%2Bis%2Bwhere%2Bdesigners%252C%2Banimators%252C%2Band%2Bdevelopers%2Bbuild%2Binteractive%2Bexperiences.%2BDesign%252C%2Banimate%252C%2Band%2Bcode%2Bin%2Bone%2Bplace.%2BWhat%2Byou%2Bbuild%2Bin%2Bthe%2Beditor%2Bis%2Bwhat%2Bs%26theme%3D1a37e01e6f4d1e0c93d0da82&w=1200&q=100",
    alt: "Rive documentation social preview",
  },
  pricing: {
    model: "freemium",
    summary: "The runtimes are open source and the editor has a free plan with a Rive splash screen and a file limit; paid plans remove both.",
    license: "MIT (runtimes)",
    source: "https://rive.app/pricing",
  },
} satisfies LibraryDetails;
